// models/Examination.js
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // This will save files to an 'uploads' folder
const mongoose = require('mongoose');

const ExaminationSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
},
  details: String,
  files: [String], // Store file paths or URLs
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Examination', ExaminationSchema);
