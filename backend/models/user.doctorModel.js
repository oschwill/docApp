import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ['Dr. med.', 'Dr.med.dent.', 'Dr. rer. nat.', 'Prof.'],
      default: '',
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
    profileImage: Object,
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
        type: Object,
        required: true,
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
            const existingDoctor = await mongoose.models.doctorModel.findOne({
              'office.email': value,
            });
            return !existingDoctor;
          },
          message: 'Die E-Mail-Adresse ist bereits registriert.',
        },
      },
      numberOfPatients: {
        type: Number,
        default: null,
      },
    },
    expertise: [
      {
        area: {
          type: mongoose.Schema.ObjectId,
          ref: 'expertiseAreaModel',
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'divers'],
      required: true,
    },
    description: {
      type: String,
      default: null,
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

doctorSchema.virtual('fullName').get(function () {
  return `${this.title} ${this.firstName} ${this.lastName}`;
});

export default mongoose.model('doctorModel', doctorSchema, 'doctorProfile');
