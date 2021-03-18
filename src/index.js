import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { initDB } from './database';

// Express function
export const app = express();

// Middlewares
app.use(cors());
dotenv.config();
app.use(express.json());

// Connect to database
initDB();
