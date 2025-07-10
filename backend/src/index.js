import express from 'express';
import dotenv from 'dotenv';
import authorizationRoutes from './routes/authorization.routes.js';
import { connectDB } from './db/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app=express()
const PORT=process.env.PORT || 5000;

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authorizationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})