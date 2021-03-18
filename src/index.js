import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Express function
export const app = express();

// Middlewares
app.use(cors());
dotenv.config();
app.use(express.json());
