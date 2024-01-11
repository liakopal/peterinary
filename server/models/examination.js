// models/examination.js
const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
  },
  details: String,
  files: [String],
});

module.exports = mongoose.model('examination', examinationSchema);
