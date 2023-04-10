import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './Home.module.scss';
import { Button, Paper, TextField } from '@mui/material';

import { Inputs } from './types';

function Home() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onSubmit' });

  const onSubmit = (data: Inputs) => {
    const { name, room } = data;
    navigate(`/chat?room=${room}&name=${name}`);
  };

  return (
    <div className={styles.wrapper}>
      <Paper
        style={{
          borderRadius: '10px',
        }}
        elevation={3}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            style={{ width: '17vw', minWidth: '250px' }}
            label="name"
            autoComplete="off"
            variant="outlined"
            error={!!errors.name}
            {...register('name', {
              required: true,
              pattern: /^[a-zA-Zа-яА-ЯёЁ0-9_-]+$/i,
              maxLength: 15,
            })}
          />
          <TextField
            style={{ width: '17vw', minWidth: '250px', marginBottom: '10px' }}
            label="room"
            autoComplete="off"
            variant="outlined"
            error={!!errors.room}
            {...register('room', {
              required: true,
              pattern: /^[a-zA-Z0-9]+$/i,
              maxLength: 15,
            })}
          />

          <Button
            size="large"
            style={{ padding: '8px 80px' }}
            variant="contained"
            type="submit"
          >
            Enter
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Home;
