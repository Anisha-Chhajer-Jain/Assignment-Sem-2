const Note = require('../models/note.model');

// 1. POST /api/notes - Create a note
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;
    const note = new Note({ title, content, category, isPinned });
    await note.save();
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. POST /api/notes/bulk - Create multiple notes
const createBulkNotes = async (req, res) => {
  try {
    const { notes } = req.body;
    const createdNotes = await Note.insertMany(notes);
    res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 3. GET /api/notes - Get all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// 4. GET /api/notes/:id - Get note by ID
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = {
  createNote,
  createBulkNotes,
  replaceNote,
  getNotes,
};
