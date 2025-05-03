// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); //add

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //add

// Connect to MongoDB
require('dotenv').config(); //add
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Note schema
const Note = mongoose.model('Note', new mongoose.Schema({
  content: String
}));

// Get all notes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Add a note
app.post('/notes', async (req, res) => {
  const newNote = new Note({ content: req.body.note });
  await newNote.save();
  res.status(201).json({ message: 'Note saved' });
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

app.listen(3000, () => console.log('🚀 API running at http://localhost:3000'));
