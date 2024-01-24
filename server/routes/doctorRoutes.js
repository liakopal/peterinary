// server/routes/api/doctorRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to get list of doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('username _id');
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Error fetching doctors');
  }
});

module.exports = router;
