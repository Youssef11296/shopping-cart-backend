import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import {connectDb} from './configs/dbConfig.js';
import authRoute from './routes/authRoute.js';

config ();
connectDb ();

const server = express ();

server.use (express.json ());
server.use (cors ());
server.use ('/api/v1/auth', authRoute);

const PORT = process.env.PORT || 8000;
server.listen (PORT, () => console.log (PORT));
