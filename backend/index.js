import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import userRoutes from "./routes/userRoutes.js";
import cookieParser from 'cookie-parser';

dotenv.config({});

const app=express();
const PORT=process.env.PORT||3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:5173',
    credentials:true
};
app.use(cors(corsOption));


app.use("/api/v1/user",userRoutes);

const startServer = async () => {
    try {
      await connectDB(); // Ensure DB connection before starting the server
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
      process.exit(1); // Exit process with failure if DB connection fails
    }
  };

  startServer();