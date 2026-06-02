const express = require('express');
const noteRoutes = require('./routes/note.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/notes', noteRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
