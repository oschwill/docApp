import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import connectDB from './config/db.js';
import { router as userRouter } from './routes/userRoute.js';
import { router as appointMentRouter } from './routes/appointmentRoute.js';
import { router as docInfoRouter } from './routes/docInformationRoute.js';
import cookieParser from 'cookie-parser';
import { AppError } from './utils/appError.js';

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(xss());
app.use(mongoSanitize());

// DB CONNECTION
await connectDB();

// Routes
app.use('/api/v1', userRouter);
app.use('/api/v1/appointment', appointMentRouter);
app.use('/api/v1/doc-info', docInfoRouter);

// UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} nicht vorhanden`, 404));
});

const PORT = process.env.PORT || 9001;
const server = app.listen(PORT, () => console.log(`running on ${PORT}`));

// Fange Globale Errors ab und fahren den Server runter!
process.on('uncaughtException', (err) => {
  console.log('UNHANDLED REJECTION !! Fahre Server herunter in 3, 2, 1 ...BOOOM!');
  console.log(err.name, err.message);
  // Server ausschalten
  server.close(() => {
    // Mit close hat der server noch zeit alle prozesse die am Laufen sind abzuarbeiten!
    process.exit(1);
  });
});
