import mongoose from 'mongoose';

const expertiseAreaSchema = new mongoose.Schema({
  headTitle: String,
  title: String,
  description: String,
});

export default mongoose.model('expertiseAreaModel', expertiseAreaSchema, 'expertiseArea');
