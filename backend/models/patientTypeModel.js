import mongoose from 'mongoose';

const patientTypeSchema = new mongoose.Schema(
  {
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
    age: {
      type: Number,
      required: true,
    },
  },
  {
    collation: { locale: 'en_US', strength: 1 },
  }
);

export default mongoose.model('patientTypeModel', patientTypeSchema, 'patientType');
