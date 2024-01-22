import express from 'express';
import { onlyForDoctors, verifyToken } from '../middleware/token.js';
import {
  addNewAppointMent,
  getNotApprovedAppointMentsByDoc,
  getReservedAppointMentByDate,
  permitAppointMent,
} from '../controller/appointmentController.js';
import { limiter } from './userRoute.js';

export const router = express.Router();

// Termin Anfrage
router.route('/new/:docID').post(limiter, verifyToken, addNewAppointMent);
// Alle neuen Termine für Doc listen
router.route('/list-apps').get(verifyToken, onlyForDoctors, getNotApprovedAppointMentsByDoc);
// Termin Bestätigung
router.route('/confirm').put(verifyToken, onlyForDoctors, permitAppointMent);
// bereits reservierte Termine holen by Date Object year / month / day / time
router.route('/get-reserved-apps/:docID').post(verifyToken, getReservedAppointMentByDate);
