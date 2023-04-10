import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './router.js';
import cors from 'cors';

import { addUser, findUser } from './users.js';
import { messages } from './messages.js';

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

    const { user } = addUser({ name, room });

    const toraMessage = messages[Math.floor(Math.random() * messages.length)];
    socket.emit('hello', {
      data: {
        user: { name: 'Tora' },
        message: `Hello, ${user.name}! ${toraMessage}`,
      },
    });

    socket.broadcast.to(user.room).emit('message', {
      data: {
        user: { name: 'Tora' },
        message: `${user.name} had joined!`,
      },
    });

    socket.on('send', ({ message, params }) => {
      const user = findUser(params);
      console.log(message, params, user);
      socketIo
        .to(params.room)
        .emit('message', { data: { user: user, message } });
    });
  });

  socketIo.on('disconnect', () => console.log('Disconnect'));
});

server.listen(PORT, () => {
  console.log('server is running...');
});
