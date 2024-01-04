// Pet.js (MongoDB Model)
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true },
  name: { type: String, required: true },
  breed: { type: String, required: true },
  gender: { type: String, required: true },
  image: { type: String } // This will store the image path, image is not required
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
