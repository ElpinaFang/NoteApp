const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const notes = [];

// Middlewares
app.use(cors()); 
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.post('/notes', (req, res) => {
    const note = req.body.note;
    notes.push(note);
    res.status(201).send('Note saved');
});

app.get('/notes', (req, res) => {
    res.json(notes);
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
