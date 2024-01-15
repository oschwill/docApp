import '/dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';

const app = express();
app.use(cors());

// DB CONNECTION
await connectDB();

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`running on ${PORT}`));
