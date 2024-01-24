// server/routes/api/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to get list of users
router.get('/', async (req, res) => {
  try {
    // Fetching only 'user' role users and excluding the password from the result
    const users = await User.find({ role: 'user' }).select('username email _id');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

module.exports = router;
