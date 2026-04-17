const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");

router.post("/", noteController.createNote);
router.post("/bulk", noteController.createBulkNotes);
router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNoteById);
router.put("/:id", noteController.replaceNote);
router.patch("/:id", noteController.updateNote);
router.delete("/bulk", noteController.deleteBulkNotes);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
