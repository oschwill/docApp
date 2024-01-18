import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
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
    address: {
      street: {
        type: String,
        required: true,
      },
      houseNr: {
        type: String,
        required: true,
      },
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
      validate: {
        validator: async function (value) {
          const existingPatient = await mongoose.models.patientModel.findOne({ email: value });
          const existingDoctor = await mongoose.models.doctorModel.findOne({
            'office.email': value,
          });
          return !existingPatient && !existingDoctor;
        },
        message: 'Die E-Mail-Adresse ist bereits registriert.',
      },
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'divers'],
      required: true,
    },
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

patientSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model('patientModel', patientSchema, 'patientProfile');
