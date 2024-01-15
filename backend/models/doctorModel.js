import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ['patient', 'doctor'],
      default: 'patient',
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    profileImage: String,
    office: {
      street: {
        type: String,
        required: true,
      },
      houseNr: {
        type: String,
        required: true,
      },
      workingTime: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      numberOfPatients: Number,
    },
    expertise: {
      area: {
        type: mongoose.Schema.ObjectId,
        ref: 'expertiseAreaModel',
      },
    },
    rating: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'divers'],
      required: true,
    },
    description: String,
    active: {
      type: Boolean,
      default: false,
    },
    emailVerifyCode: {
      type: String,
      maxLength: [6, 'Must be 6 digit long'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collation: { locale: 'en_US', strength: 1 },
  }
);

doctorSchema.virtual('fullName').get(function () {
  return `${this.title} ${this.firstName} ${this.lastName}`;
});

export default mongoose.model('doctorModel', doctorSchema, 'doctorProfile');
