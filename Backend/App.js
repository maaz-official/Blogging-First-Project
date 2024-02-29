import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./Database/dbconnection.js";
// App.js
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js';
import blogRouter from './routes/blogRouter.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express();
dotenv.config({ path: "./config/config.env" });

// Configure CORS middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // You can specify your origin here
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable credentials for CORS
  })
);

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded data with the query parameter ?
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
})
);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', blogRouter);

dbConnection();

// Error handling middleware
app.use(errorMiddleware);

// Routing

export default app;
