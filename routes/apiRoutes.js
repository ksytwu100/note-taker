const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');

// Path to the db.json file
const dbPath = path.join(__dirname, '../db/db.json');

// Route to read and send back the data from db.json
router.get('/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        console.log(JSON.parse(data));
        res.json(JSON.parse(data));
    });
});

// Route to save new notes to db.json
router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uniqid();
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }

        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save data' });
            }
            res.json(newNote);
        });
    });
});
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }

        const notes = JSON.parse(data);
        const newNotes = notes.filter((note) => note.id !== id);

        fs.writeFile(dbPath, JSON.stringify(newNotes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save data' });
            }
            res.json({ ok: true });
        });
    });
});
module.exports = router;
