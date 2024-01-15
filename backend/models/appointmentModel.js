import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'patientModel',
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'doctorModel',
  },
  status: {
    type: Boolean,
    default: false,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  problem: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('appointmentModel', appointmentSchema, 'appointments');
