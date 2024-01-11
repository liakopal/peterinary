// Pet.js in server/models
const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  petType: String,
  name: String,
  breed: String,
  gender: String,
  birthdate: String,
  notes: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  examinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Examination',
  }],
});

module.exports = mongoose.model('Pet', PetSchema);
