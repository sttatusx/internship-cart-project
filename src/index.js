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

// Routes
import usersRoute from './routes/users';
import vendorsRoute from './routes/vendors';
import productsRoute from './routes/products';

app.use(`${process.env.BASE_URL}/users/`, usersRoute);
app.use(`${process.env.BASE_URL}/vendors/`, vendorsRoute);
app.use(`${process.env.BASE_URL}/products/`, productsRoute);
