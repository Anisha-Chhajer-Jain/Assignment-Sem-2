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

// 5. PUT /api/notes/:id - Replace a note completely
const replaceNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, category, isPinned },
      { new: true, overwrite: true, runValidators: true }
    );
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: note
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 6. PATCH /api/notes/:id - Update specific fields only
const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 7. DELETE /api/notes/:id - Delete a single note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 8. DELETE /api/notes/bulk - Delete multiple notes
const deleteBulkNotes = async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await Note.deleteMany({ _id: { $in: ids } });
    res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 9. GET /api/notes/category/:category - Get notes by category
const getNotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const notes = await Note.find({ category });
    if (notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No notes found for category: ${category}`
      });
    }
    res.status(200).json({
      success: true,
      message: `Notes fetched for category: ${category}`,
      data: notes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 10. GET /api/notes/status/:isPinned - Get notes by pinned status
const getNotesByPinnedStatus = async (req, res) => {
  try {
    const { isPinned } = req.params;
    const isPinnedBool = isPinned === 'true';
    const notes = await Note.find({ isPinned: isPinnedBool });
    res.status(200).json({
      success: true,
      message: `Notes fetched with pinned status: ${isPinnedBool}`,
      data: notes,
      total: notes.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 11. GET /api/notes/:id/summary - Get note summary
const getNoteSummary = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    const summary = {
      id: note._id,
      title: note.title,
      category: note.category,
      isPinned: note.isPinned,
      contentLength: note.content.length,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    };
    res.status(200).json({
      success: true,
      message: "Note summary fetched successfully",
      data: summary
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 12. GET /api/notes/filter - Filter notes by category and isPinned
const filterNotes = async (req, res) => {
  try {
    const { category, isPinned } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }
    if (isPinned !== undefined) {
      query.isPinned = isPinned === 'true';
    }

    const notes = await Note.find(query);
    res.status(200).json({
      success: true,
      message: "Notes filtered successfully",
      data: notes,
      total: notes.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 13. GET /api/notes/filter/pinned - Get all pinned notes
const getPinnedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isPinned: true });
    res.status(200).json({
      success: true,
      message: "Pinned notes fetched successfully",
      data: notes,
      total: notes.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 14. GET /api/notes/filter/category - Filter by category name (query parameter)
const filterByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category query parameter is required"
      });
    }
    const notes = await Note.find({ category });
    res.status(200).json({
      success: true,
      message: `Notes filtered by category: ${category}`,
      data: notes,
      total: notes.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 15. GET /api/notes/filter/date-range - Filter by date range
const filterByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Both startDate and endDate query parameters are required"
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({
        success: false,
        message: "startDate must be before endDate"
      });
    }

    const notes = await Note.find({
      createdAt: {
        $gte: start,
        $lte: end
      }
    });

    res.status(200).json({
      success: true,
      message: "Notes filtered by date range successfully",
      data: notes,
      total: notes.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 16. GET /api/notes/paginate - Paginate all notes
const paginateNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const notes = await Note.find().skip(skip).limit(limit);
    const total = await Note.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      message: "Notes paginated successfully",
      data: notes,
      pagination: {
        current_page: page,
        limit,
        total,
        total_pages: totalPages,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 17. GET /api/notes/paginate/category/:category - Paginate notes by category
const paginateNotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const notes = await Note.find({ category }).skip(skip).limit(limit);
    const total = await Note.countDocuments({ category });
    const totalPages = Math.ceil(total / limit);

    if (notes.length === 0 && page === 1) {
      return res.status(404).json({
        success: false,
        message: `No notes found for category: ${category}`
      });
    }

    res.status(200).json({
      success: true,
      message: `Notes paginated for category: ${category}`,
      data: notes,
      pagination: {
        current_page: page,
        limit,
        total,
        total_pages: totalPages,
        has_next: page < totalPages,
        has_prev: page > 1,
        category
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 18. GET /api/notes/sort - Sort all notes
const sortNotes = async (req, res) => {
  try {
    const { field = 'createdAt', order = 'desc' } = req.query;
    const sortOrder = order === 'asc' ? 1 : -1;

    const validFields = ['title', 'createdAt', 'updatedAt', 'category', 'isPinned'];
    if (!validFields.includes(field)) {
      return res.status(400).json({
        success: false,
        message: `Invalid sort field. Valid fields are: ${validFields.join(', ')}`
      });
    }

    const notes = await Note.find().sort({ [field]: sortOrder });
    res.status(200).json({
      success: true,
      message: `Notes sorted by ${field} in ${order} order`,
      data: notes,
      sort: { field, order }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 19. GET /api/notes/sort/pinned - Sort pinned notes
const sortPinnedNotes = async (req, res) => {
  try {
    const { field = 'createdAt', order = 'desc' } = req.query;
    const sortOrder = order === 'asc' ? 1 : -1;

    const validFields = ['title', 'createdAt', 'updatedAt', 'category'];
    if (!validFields.includes(field)) {
      return res.status(400).json({
        success: false,
        message: `Invalid sort field. Valid fields are: ${validFields.join(', ')}`
      });
    }

    const notes = await Note.find({ isPinned: true }).sort({ [field]: sortOrder });
    res.status(200).json({
      success: true,
      message: `Pinned notes sorted by ${field} in ${order} order`,
      data: notes,
      sort: { field, order }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createNote,
  createBulkNotes,
  getNotes,
  getNoteById,
  replaceNote,
  updateNote,
  deleteNote,
  deleteBulkNotes,
  getNotesByCategory,
  getNotesByPinnedStatus,
  getNoteSummary,
  filterNotes,
  getPinnedNotes,
  filterByCategory,
  filterByDateRange,
  paginateNotes,
  paginateNotesByCategory,
  sortNotes,
  sortPinnedNotes
};
