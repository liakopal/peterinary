// routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const Message = require('../models/message'); // Adjust the path based on your structure

// Post a new message
router.post('/api/messages', (req, res) => {
  const newMessage = new Message(req.body);

  newMessage.save()
    .then(message => res.status(201).json(message))
    .catch(error => res.status(400).json({ error: error.message }));
});

// Get all messages
router.get('/api/messages', (req, res) => {
  Message.find()
    .sort({ createdAt: -1 }) // Sort by most recent
    .then(messages => res.json(messages))
    .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;
