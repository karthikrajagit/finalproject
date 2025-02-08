import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Entry from './models/Entry.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.get('/api/entries', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving entries' });
  }
});


app.post('/api/entries', async (req, res) => {
  try {
    const { date, mood, notes } = req.body;
    if (!date || !mood) {
      return res.status(400).json({ message: 'Date and mood are required' });
    }
    const newEntry = new Entry({ date, mood, notes });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error creating entry' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
