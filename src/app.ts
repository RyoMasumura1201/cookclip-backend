import express from 'express';
import cors from 'cors';
import userController from './controllers/userController';
import bookmarkController from './controllers/bookmarkController';
import videoController from './controllers/videoController';

const app = express();
require('dotenv').config();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('hello express\n');
});

app.use('/users', userController);
app.use('/bookmarks', bookmarkController);
app.use('/videos', videoController);

export default app;
