import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './config/db.js';
import { router as userRouter } from './routes/userRoute.js';
import cookieParser from 'cookie-parser';

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(xss());
app.use(mongoSanitize());

// DB CONNECTION
await connectDB();

// Routes
app.use('/api/v1', userRouter);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`running on ${PORT}`));
