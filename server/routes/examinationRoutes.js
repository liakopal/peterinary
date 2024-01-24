// routes/examinationRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const Examination = require('../models/examination');
const Pet = require('../models/pet'); 
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/examinations', authenticateToken, upload.array('files'), async (req, res) => {
  console.log("Request received to add examination.");

  try {
    const { petId, examinationDetails } = req.body;
    const files = req.files.map(file => file.path);

    console.log('Uploading examination files:', req.files);
    console.log(`Creating examination for pet: ${petId}, with details: ${examinationDetails}`);

    // Create a new examination document with the addedBy field
    const newExamination = new Examination({ 
      pet: petId, 
      details: examinationDetails, 
      files, 
      addedBy: req.user.userId // Set the user who added the examination
    });

    console.log('Files:', req.files);

    await newExamination.save();

    // Update the corresponding pet to include this examination
    await Pet.findByIdAndUpdate(petId, { $push: { examinations: newExamination._id } });

    console.log("Examination saved successfully.");
    res.status(201).json({ message: 'Examination added successfully' });
  } catch (error) {
    console.error('Error adding examination:', error);
    res.status(500).json({ message: 'Error adding examination' });
  }
});

// Route to get all examinations
router.get('/examinations', authenticateToken, async (req, res) => {
  try {
    // Fetch all examinations and populate necessary fields
    const examinations = await Examination.find()
      .populate('pet', 'name type breed')
      .populate('addedBy', 'username');
    res.json(examinations);
  } catch (error) {
    console.error('Error fetching examinations:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
