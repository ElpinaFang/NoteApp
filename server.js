const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// 🔥 Connect to MongoDB
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ DB error:", err));

// 🧱 Define a Note model
const Note = mongoose.model('Note', {
    title: String,
    content: String,
    tags: [String]
  }); 

// 🛠 Middleware
app.use(cors()); // Allow cross-origin (optional if frontend is on same server)
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static frontend files

// ✍️ API Routes

// Save a new note
app.post('/notes', async (req, res) => {
    try {
      const { title, content, tags } = req.body;
      const newNote = new Note({ title, content, tags });
      await newNote.save();
      res.status(201).send('✅ Note saved');
    } catch (error) {
      console.error('❌ Error saving note:', error);
      res.status(500).send('❌ Failed to save note');
    }
  });

// Fetch all notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes); // send full note objects
    } catch (error) {
        console.error('❌ Error fetching notes:', error);
        res.status(500).send('❌ Failed to fetch notes');
    }
});

// 🗑️ Delete a note by ID
app.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.sendStatus(204); // No content
    } catch (error) {
        console.error('❌ Error deleting note:', error);
        res.status(500).send('❌ Failed to delete note');
    }
});

// 🚀 Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
