import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './router.js';
// import cors from 'cors';

const PORT = 5000;

const app = express();
app.use(router);
// app.use(cors({ origin: '*' }));

const server = createServer(app);

const socketIo = new Server(server, {
  // cors: {
  //   origin: '*',
  //   methods: ['GET', 'POST'],
  // },
});

server.listen(PORT, () => {
  console.log('server is running...');
});
