/**
 * Author: Anisha Chhajer
 * Note Controller - Assignment 3
 */

const mongoose = require('mongoose');
const Note = require('../models/note.model.js');

// Helper
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);


//// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null
      });
    }

    const newNote = await Note.create({ title, content, category, isPinned });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: newNote
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};

//// Create multiple notes
const multipleNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Notes array is required and cannot be empty",
        data: null
      });
    }

    const createdNotes = await Note.insertMany(notes);

    res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};


//// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};


//// Get note by ID
const getNotesById = async (req, res) => {
  try {
    const noteId = req.params.id;

    if (!isValidId(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null
      });
    }

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};

//// PUT — Replace note completely
const UpdateById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content, category, isPinned } = req.body;

    if (!isValidId(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content, category, isPinned },
      { new: true, overwrite: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: updatedNote
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};

//// PATCH — Update specific fields
const UpdateFieldId = async (req, res) => {
  try {
    const noteId = req.params.id;

    if (!isValidId(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null
      });
    }

    const note = await Note.findByIdAndUpdate(
      noteId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};

//// Delete note by ID
const deleteById = async (req, res) => {
  try {
    const noteId = req.params.id;

    if (!isValidId(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null
      });
    }

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: null
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};

//// Delete multiple notes
const deleteMulti = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "IDs array is required and cannot be empty",
        data: null
      });
    }

    const result = await Note.deleteMany({
      _id: { $in: ids }
    });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: null
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};

const searchTitle = async (req, res) => {
  try {
    const { keyword } = req.query;

    const notes = await Note.find({
      title: { $regex: keyword, $options: "i" },
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchContent = async (req, res) => {
  try {
    const { keyword } = req.query;

    const notes = await Note.find({
      content: { $regex: keyword, $options: "i" },
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const searchAll = async (req, res) => {
  try {
    const { keyword } = req.query;

    const notes = await Note.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterSort = async (req, res) => {
  try {
    const { category, sortBy = "createdAt", order = "desc" } = req.query;

    const filter = {};

    if (category) filter.category = category;

    const notes = await Note.find(filter).sort({
      [sortBy]: order === "asc" ? 1 : -1,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterPaginate = async (req, res) => {
  try {
    const { category, page = 1, limit = 5 } = req.query;

    const filter = {};

    if (category) filter.category = category;

    const notes = await Note.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sortPaginate = async (req, res) => {
  try {
    const {
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 5,
    } = req.query;

    const notes = await Note.find()
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const searchFilter = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    const filter = {};

    if (category) filter.category = category;

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ];
    }

    const notes = await Note.find(filter);

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchSortPaginate = async (req, res) => {
  try {
    const {
      keyword,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 5,
    } = req.query;

    const filter = {};

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ];
    }

    const notes = await Note.find(filter)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterSortPaginate = async (req, res) => {
  try {
    const {
      category,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 5,
    } = req.query;

    const filter = {};

    if (category) filter.category = category;

    const notes = await Note.find(filter)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const queryNotes = async (req, res) => {
  try {
    const {
      keyword,
      category,
      priority,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (category) filter.category = category;

    if (priority) filter.priority = priority;

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ];
    }

    const notes = await Note.find(filter)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Note.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      notes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote: createNote,
  multipleNotes: multipleNotes,
  getAllNotes: getAllNotes,
  getNotesById: getNotesById,
  UpdateById: UpdateById,
  UpdateFieldId: UpdateFieldId,
  deleteById: deleteById,
  deleteMulti: deleteMulti,
  searchTitle: searchTitle,
  searchContent: searchContent,
  searchAll: searchAll,
  filterSort: filterSort,
  filterPaginate: filterPaginate,
  sortPaginate:sortPaginate,
  searchFilter: searchFilter,
  searchSortPaginate: searchSortPaginate,
  filterSortPaginate: filterSortPaginate,
  queryNotes: queryNotes
};
