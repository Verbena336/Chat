import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './Home.module.scss';
import { Button, Paper, TextField } from '@mui/material';

import { Inputs } from './types';

function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onSubmit' });

  const onSubmit = (data: Inputs) => console.log(data);

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
