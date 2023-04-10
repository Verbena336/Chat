import React, { useEffect } from 'react';
import styles from './Messages.module.scss';
import { TData } from '../Chat/types';

type Props = {
  messages: TData[];
  myName: string;
};

const Messages: React.FC<Props> = ({ messages, myName }) => {
  const messageRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);
  return (
    <div className={styles.message__wrapper}>
      {messages.map(({ data: { user, message } }, i) => {
        const isMe = user.name === myName;
        const style = isMe ? styles.right : styles.left;
        const isTora = user.name === 'Tora';
        const toraStyle = isTora ? styles.tora : styles.message;
        return (
          <div
            ref={messageRef}
            key={i}
            className={isTora ? toraStyle : `${style} ${styles.message}`}
          >
            {isTora ? (
              message
            ) : (
              <>
                <span className={styles.username}>{user.name}</span>
                <div className={`${styles.message__content} ${style}`}>
                  {message}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
