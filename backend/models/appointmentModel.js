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
  meeting: {
    type: Date,
    required: true,
  },
  problem: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('appointmentModel', appointmentSchema, 'appointments');
