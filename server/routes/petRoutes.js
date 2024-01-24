// petRoutes.js
const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');
const User = require('../models/user');
const authenticateToken = require('../middleware/authenticateToken');

router.use(authenticateToken);

// POST endpoint to add a new pet with owner's ID from JWT
router.post('/', authenticateToken, async (req, res) => {
  console.log("Received pet data on backend:", req.body);
  // Use req.user.userId which is set by authenticateToken middleware
  const newPetData = { ...req.body, owner: req.user.userId };

  try {
    console.log("Received pet data:", newPetData);
    const newPet = new Pet(newPetData);
    await newPet.save();
    res.status(201).json({ message: "Pet added successfully", petId: newPet._id });
  } catch (error) {
    console.error('Error saving pet:', error.stack); // Log the error stack for more details
    res.status(500).json({ error: error.message });
  }
});

router.get('/pets', authenticateToken, async (req, res) => {
  // Check if the user role is 'doctor'
  if (req.user.role === 'doctor') {
    try {
      // This line populates the owner field in each pet document with the username from the User model.
      const allPets = await Pet.find({}).populate('owner', 'username');
      console.log("Fetched Pets with Owners:", JSON.stringify(allPets, null, 2));
      return res.json(allPets);
    } catch (error) {
      console.error('Error fetching pets:', error);
      return res.status(500).json({ message: 'Error fetching pets' });
    }
  } else {
    return res.status(403).json({ message: 'Access forbidden' });
  }
});



router.get('/:petId', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pet' });
  }
});

// Update a specific pet by ID
router.put('/:petId', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, { new: true });
    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pet' });
  }
});

// Fetch all pets for a specific user
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const userPets = await Pet.find({ owner: req.params.userId });
    res.json(userPets);
  } catch (error) {
    console.error('Error fetching pets for user:', error);
    res.status(500).json({ message: 'Error fetching pets for user' });
  }
});



module.exports = router;


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
// router.post('/', async (req, res) => {
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'No user session found' });
//   }

//   try {
//     console.log("Received pet data:", req.body);
//     const newPet = new Pet({ ...req.body, owner: req.session.userId });
//     await newPet.save();
//     res.status(201).json({ message: "Pet added successfully" });
//   } catch (error) {
//     console.error('Error saving pet:', error.stack); // Log the error stack for more details
//     res.status(500).json({ error: error.message });
//   }
// });