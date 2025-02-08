import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  mood: { type: String, required: true },
  notes: { type: String, default: '' }
});

export default mongoose.model('Entry', entrySchema);
