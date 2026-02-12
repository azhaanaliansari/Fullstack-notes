const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const noteModel = require('../models/notes.model');  

app.use(express.json());
app.use(cors({
    origin: 'https://fullstack-notes-imyu.onrender.com', // Your frontend URL
    credentials: true
}));
app.use(express.static(path.join(__dirname, '..', '/public')));

/*POST API to create a new note*/
app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;
    const note = await noteModel.create({ title, description });
    res.status(201).json({message: "Note created successfully", note });
});

/*GET API to fetch all notes*/
app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({message: "Notes fetched successfully", notes });
});

/*DELETE API to delete a note by ID*/
app.delete('/api/notes/:id', async (req, res) => { 
    const { id } = req.params;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({message: "Note deleted successfully" });
});

/*PATCH API to update a note by ID*/
app.patch('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const note = await noteModel.findByIdAndUpdate(id, { description }, { new: true });
    res.status(200).json({message: "Note updated successfully", note });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});



module.exports = app;