import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import dotenv from "dotenv";
import userRouter from "./Routes/userRoute.js";

dotenv.config();



mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

const app = express();


app.use(cors());
app.use(express.json());

app.use('/api', userRouter)


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});