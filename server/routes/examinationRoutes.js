// examinationRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const Examination = require('../models/examination'); // Adjust path as necessary
const Pet = require('../models/pet'); // Adjust path as necessary

const upload = multer({ dest: 'uploads/' });

router.post('/api/examinations', upload.array('files'), async (req, res) => {
  try {
    const { petId, examinationDetails } = req.body;
    const files = req.files.map(file => file.path);

    const examination = new Examination({
      pet: petId,
      details: examinationDetails,
      files: files,
    });

    await examination.save();
    await Pet.findByIdAndUpdate(petId, { $push: { examinations: examination._id } });

    res.status(201).json({ message: 'Examination added successfully', examination });
  } catch (error) {
    console.error('Error adding examination:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
