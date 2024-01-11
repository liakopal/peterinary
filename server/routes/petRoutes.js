// petRoutes.js
const express = require('express');
const router = express.Router();
const Pet = require('../models/pet'); // Adjust the path as necessary

// // POST endpoint to add a new pet
// router.post('/api/pets', async (req, res) => {
//   try {
//     console.log('Pet data received:', req.body); // Log incoming data
//     const newPet = new Pet(req.body);
//     await newPet.save();
//     res.status(201).json({ message: "Pet added successfully" });
//   } catch (error) {
//     console.error('Error saving pet:', error); // Log any errors
//     res.status(500).json({ error: error.message });
//   }
// });


// POST endpoint to add a new pet with owner's ID
router.post('/api/pets', async (req, res) => {
  try {
    console.log("Received pet data:", req.body); // Log received pet data
    const newPet = new Pet({ ...req.body, owner: req.session.userId });
    await newPet.save();
    res.status(201).json({ message: "Pet added successfully" });
  } catch (error) {
    console.error('Error saving pet:', error);
    res.status(500).json({ error: error.message });
  }
});


router.get('/api/pets', async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.status(200).send(pets);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
