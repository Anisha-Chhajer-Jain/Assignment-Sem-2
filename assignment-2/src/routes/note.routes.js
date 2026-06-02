const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');

// Bulk routes must be first
router.post('/bulk', noteController.createBulkNotes);
router.delete('/bulk', noteController.deleteBulkNotes);

// Filter routes
router.get('/filter/date-range', noteController.filterByDateRange);
router.get('/filter/pinned', noteController.getPinnedNotes);
router.get('/filter/category', noteController.filterByCategory);
router.get('/filter', noteController.filterNotes);

// Paginate routes
router.get('/paginate/category/:category', noteController.paginateNotesByCategory);
router.get('/paginate', noteController.paginateNotes);

// Sort routes
router.get('/sort/pinned', noteController.sortPinnedNotes);
router.get('/sort', noteController.sortNotes);

// Category and Status routes
router.get('/category/:category', noteController.getNotesByCategory);
router.get('/status/:isPinned', noteController.getNotesByPinnedStatus);

// Generic routes must be last
router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);

// ID-based routes (most specific ID route)
router.get('/:id/summary', noteController.getNoteSummary);

// General ID routes (most generic)
router.get('/:id', noteController.getNoteById);
router.put('/:id', noteController.replaceNote);
router.patch('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
