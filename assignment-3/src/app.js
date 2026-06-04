/**
 * Author: Anisha Chhajer
 * Assignment 3: State Management API
 */

const express = require('express');
const noteRouter = require('./routes/note.route.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/notes',noteRouter);

app.use((req,res)=>{
    res.status(404).json({message:"Route not found"});
})

module.exports = app;