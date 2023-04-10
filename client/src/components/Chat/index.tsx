import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useForm } from 'react-hook-form';
import EmojiPicker from 'emoji-picker-react';

import Messages from '../Messages';

import { TData, TJoinRoom, TUser } from './types';

import styles from './Chat.module.scss';
import { Button, Paper } from '@mui/material';

const socketIo = io('http://localhost:5000');

function Chat() {
  const { search } = useLocation();
  const [state, setState] = useState<TData[]>([]);
  const [params, setParams] = useState({ room: '', name: '' });
  const [isEmoji, setEmoji] = useState(false);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<TUser[]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ message: string }>({ mode: 'onSubmit' });

  const onSubmit = (data: { message: string }) => {
    setEmoji(false);
    socketIo.emit('send', { message, params });
    setMessage('');
  };

  const handleMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleLeave = () => {
    socketIo.emit('leaveRoom', params);
    navigate('/');
  };

  useEffect(() => {
    !search.length && navigate('/');
  }, [navigate, search.length]);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search)) as {
      room: string;
      name: string;
    };
    setParams(searchParams);
    socketIo.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socketIo.on('message', (data) => {
      setState((state) => [...state, data]);
    });
    socketIo.on('hello', (data) => {
      setState((state) => [...state, data]);
    });
  }, []);

  useEffect(() => {
    socketIo.on('joinRoom', (data) => {
      setUsers(data.users);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Paper
        style={{
          borderRadius: '10px',
        }}
        elevation={6}
      >
        <div className={styles.content}>
          <Paper
            style={{
              borderRadius: '10px 10px 0 0',
              padding: '10px',
            }}
            elevation={1}
          >
            <header className={styles.header}>
              <div className={styles.info}>
                <div>
                  <span className={styles.room}>room: </span>
                  <h1 className={styles.title}>{params.room}</h1>
                </div>
                <span className={styles.users}>{users.length} users here</span>
              </div>
              <Button
                size="small"
                style={{ padding: '8px 30px' }}
                variant="outlined"
                color="error"
                onClick={handleLeave}
              >
                Leave
              </Button>
            </header>
          </Paper>

          <div className={styles.messages}>
            <Messages messages={state} myName={params.name} />
          </div>

          <Paper
            style={{
              borderRadius: '0 0 10px 10px',
            }}
            elevation={1}
          >
            <footer className={styles.footer}>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.input__wrapper}>
                  <textarea
                    autoComplete="off"
                    className={styles.input}
                    {...register('message', {
                      required: true,
                      validate: (value) => value.trim().length > 0,
                    })}
                    placeholder="I want to say..."
                    value={message}
                    onChange={handleMessage}
                  ></textarea>
                  <div className={styles.emoji}>
                    <img
                      className={styles.img}
                      src="./icons/1F63B.svg"
                      alt="emoji"
                      onClick={() => setEmoji(!isEmoji)}
                    />
                    {isEmoji && (
                      <div className={styles.emojies}>
                        <EmojiPicker
                          height={400}
                          width={300}
                          onEmojiClick={({ emoji }) =>
                            setMessage(`${message}${emoji}`)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  size="small"
                  style={{ padding: '8px 30px' }}
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Send
                </Button>
              </form>
            </footer>
          </Paper>
        </div>
      </Paper>
    </div>
  );
}

export default Chat;
