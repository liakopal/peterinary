const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  attachment: String,
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  readAt: { type: Date }
});

// Adding the index
messageSchema.index({ user: 1, doctor: 1 });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;




// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const messageSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'User' },  // Reference to User
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   read: { type: Boolean, default: false },
//   readAt: { type: Date }
// });

// const Message = mongoose.model('Message', messageSchema);
// module.exports = Message;

