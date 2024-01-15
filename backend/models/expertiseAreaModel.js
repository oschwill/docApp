import mongoose from 'mongoose';

const expertiseAreaSchema = new mongoose.Schema({
  title: String,
  description: String,
});

export default mongoose.model('expertiseAreaModel', expertiseAreaSchema, 'expertiseArea');
