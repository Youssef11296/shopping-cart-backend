import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import {connectDb} from './configs/dbConfig.js';

config ();
connectDb ();

const server = express ();

server.use (express.json ());
server.use (cors ());

const PORT = process.env.PORT || 8000;
server.listen (PORT);
