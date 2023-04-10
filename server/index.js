import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './router.js';
import cors from 'cors';

import { addUser, findUser, getUsers, leaveUser } from './users.js';
import { newMessages, oldMessages } from './messages.js';

const PORT = 5000;

const app = express();
app.use(router);
app.use(cors({ origin: '*' }));

const server = createServer(app);

const socketIo = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

socketIo.on('connection', (socket) => {
  console.log('Connection');

  socket.on('join', ({ name, room }) => {
    socket.join(room);

    const { user, isNewUser } = addUser({ name, room });

    let toraMessage = isNewUser
      ? newMessages[Math.floor(Math.random() * newMessages.length)]
      : oldMessages[Math.floor(Math.random() * oldMessages.length)];

    socket.emit('hello', {
      data: {
        user: { name: 'Tora' },
        message: `Hello, ${user.name}! ${toraMessage}`,
      },
    });

    const allUsers = getUsers(room);

    socketIo.in(user.room).emit('joinRoom', {
      users: allUsers,
    });

    socket.to(user.room).emit('message', {
      data: {
        user: { name: 'Tora' },
        message: `${user.name} had joined!`,
      },
    });
  });

  socket.on('send', ({ message, params }) => {
    const user = findUser(params);
    socketIo.to(user.room).emit('message', { data: { user: user, message } });
  });

  socket.on('leaveRoom', (params) => {
    const newUsers = leaveUser(params);
    socketIo.to(params.room).emit('joinRoom', {
      users: newUsers,
    });
    socket.to(params.room).emit('message', {
      data: {
        user: { name: 'Tora' },
        message: `${params.name} had left😿`,
      },
    });
  });

  socketIo.on('disconnect', () => console.log('Disconnect'));
});

server.listen(PORT, () => {
  console.log('server is running...');
});
