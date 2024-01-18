import mongoose from 'mongoose';

const doctorTypeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ['Dr. med.', 'Dr.med.dent.', 'Dr. rer. nat.', 'Prof.'],
      default: '',
    },
    profileImage: Object,
    address: {
      street: {
        type: String,
        required: true,
      },
      houseNr: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    workingTime: {
      type: Object,
      required: true,
    },
    numberOfPatients: {
      type: Number,
      default: null,
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
    description: {
      type: String,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collation: { locale: 'en_US', strength: 1 },
  }
);

export default mongoose.model('doctorTypeModel', doctorTypeSchema, 'doctorType');
