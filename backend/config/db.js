import mongoose from 'mongoose';
import { insertExpertiseAreas } from '../utils/populate.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);

    console.log(process.env.MONGO_DB);
    console.log('DB CONNECTED');

    // insert expertise
    await insertExpertiseAreas();
  } catch (error) {
    console.log(`DATABASE ERROR ${error}`);
    process.exit(1);
  }
};

export default connectDB;
