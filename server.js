const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// 🔥 Connect to MongoDB
mongoose.connect('mongodb+srv://elpinaoc:Laoshu%40111084@clusternote.korupbu.mongodb.net/notesapp?retryWrites=true&w=majority&appName=ClusterNote', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 🧱 Define a Note model
const Note = mongoose.model('Note', {
    content: String
});

// 🛠 Middleware
app.use(cors()); // Allow cross-origin (optional if frontend is on same server)
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static frontend files

// ✍️ API Routes

// Save a new note
app.post('/notes', async (req, res) => {
    try {
        const noteContent = req.body.note;
        const newNote = new Note({ content: noteContent });
        await newNote.save();
        res.status(201).send('✅ Note saved to database');
    } catch (error) {
        console.error('❌ Error saving note:', error);
        res.status(500).send('❌ Failed to save note');
    }
});

// Fetch all notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes.map(note => note.content)); // Send only the note content
    } catch (error) {
        console.error('❌ Error fetching notes:', error);
        res.status(500).send('❌ Failed to fetch notes');
    }
});

// 🚀 Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
