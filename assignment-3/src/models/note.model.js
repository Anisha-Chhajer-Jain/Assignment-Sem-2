/**
 * Author: Anisha Chhajer
 * Note Model - Assignment 3
 */

const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title:    { type: String, required: [true, "Title is required"] },
    content:  { type: String, required: [true, "Content is required"] },
    category: { type: String, enum: ["work", "personal", "study"], default: "personal" },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true })

  const Note = mongoose.model('note3',noteSchema);
  
  module.exports = Note;