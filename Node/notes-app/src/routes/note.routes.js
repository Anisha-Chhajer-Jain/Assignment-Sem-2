const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');

// Bulk routes must be securely placed BEFORE generic parameterized routes (like /:id)
router.post('/bulk', noteController.createBulkNotes);
router.delete('/bulk', noteController.deleteBulkNotes);

router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNoteById);
router.put('/:id', noteController.replaceNote);
router.patch('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
