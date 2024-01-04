const express = require('express');
const router = express.Router();

// Temporary data for demonstration
let petsData = [
  { id: 1, name: 'Fluffy', type: 'Cat' },
  { id: 2, name: 'Rover', type: 'Dog' }
];

// GET endpoint for fetching pet data
router.get('/api/pets', (req, res) => {
  res.json(petsData);
});

module.exports = router;
