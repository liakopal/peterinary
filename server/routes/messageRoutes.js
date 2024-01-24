// messageRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const Message = require('../models/message');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// router.post('/', authenticateToken, upload.single('attachment'), async (req, res) => {
//   try {
//     console.log("Received message data:", req.body);
//     console.log("Received file:", req.file);

//     const { message } = req.body;
//     const attachment = req.file ? req.file.path : null;

//     const newMessage = new Message({ 
//       user: req.user.id,
//       message,
//       attachment 
//     });

//     await newMessage.save();
//     console.log("Message saved:", newMessage);
//     res.status(201).json({ message: 'Message saved successfully' });
//   } catch (error) {
//     console.error('Error in POST /messages:', error);
//     res.status(500).json({ message: 'Error saving message' });
//   }
// });




router.post('/', authenticateToken, upload.single('attachment'), async (req, res) => {
  try {
    const { message, recipientId } = req.body; // recipientId should be the doctor's ID when a user sends a message
    const attachment = req.file ? req.file.path : null;

    let newMessage;
    if (req.user.role === 'doctor') {
      newMessage = new Message({ 
        doctor: req.user.userId,
        user: recipientId,
        message,
        attachment 
      });
    } else {
      // When a user is sending the message, ensure the doctor's ID is correctly assigned
      newMessage = new Message({ 
        user: req.user.userId,
        doctor: recipientId, // This should be the doctor's ID
        message,
        attachment 
      });
    }

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error in POST /messages:', error);
    res.status(500).json({ message: 'Error saving message' });
  }
});



router.get('/user', authenticateToken, async (req, res) => {
  try {
    const userMessages = await Message.find({ user: req.user.userId }).populate('doctor', 'username');
    res.json(userMessages);
  } catch (error) {
    console.error('Error fetching user messages:', error);
    res.status(500).json({ message: 'Error fetching user messages' });
  }
});


// router.get('/', authenticateToken, async (req, res) => {
//   if (req.user.role === 'doctor') {
//     try {
//       const allMessages = await Message.find({ doctor: req.user._id }).populate('user', 'username email');
//       // Update the readAt field for all messages when viewed by a doctor
//       allMessages.forEach(async message => {
//         if (!message.read) {
//           message.read = true;
//           message.readAt = new Date();
//           await message.save();
//         }
//       });
//       return res.json(allMessages);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       return res.status(500).json({ message: 'Error fetching messages' });
//     }
//   } else {
//     return res.status(403).json({ message: 'Access forbidden' });
//   }
// });



module.exports = router;


// // // routes/messageRoutes.js
// // const express = require('express');
// // const router = express.Router();
// // const authenticateToken = require('../middleware/authenticateToken');
// // const Message = require('../models/message')

// // // ... other middleware and route imports

// // router.post('/', async (req, res) => {
// //   try {
// //     //  logic to save the message
// //     const { name, email, message } = req.body;
// //     // Create a new message document using your Message model
// //     const newMessage = new Message({ name, email, message });
// //     await newMessage.save();
// //     res.status(201).json({ message: 'Message saved successfully' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error saving message' });
// //   }
// // });

// // // authenticateToken middleware to the route
// // router.get('/', authenticateToken, async (req, res) => {
// //   if (req.user.role === 'doctor') {
// //     try {
// //       const allMessages = await Message.find({});
// //       return res.json(allMessages);
// //     } catch (error) {
// //       console.error('Error fetching messages:', error);
// //       return res.status(500).json({ message: 'Error fetching messages' });
// //     }
// //   } else {
// //     return res.status(403).json({ message: 'Access forbidden' });
// //   }
// // });

// // module.exports = router;


//Logic for DISTRIBUTION Doctor Dashboard and User Dashboard

// router.post('/', authenticateToken, upload.single('attachment'), async (req, res) => {
//   try {
//     const { message, recipientId } = req.body; // recipientId should be passed from the client
//     const attachment = req.file ? req.file.path : null;

//     let newMessage;
//     if (req.user.role === 'doctor') {
//       // If a doctor is sending the message
//       newMessage = new Message({ 
//         doctor: req.user.id,
//         user: recipientId, // Assuming the recipient is a user
//         message,
//         attachment 
//       });
//     } else {
//       // If a user is sending the message
//       newMessage = new Message({ 
//         user: req.user.id,
//         doctor: recipientId, // Assuming the recipient is a doctor
//         message,
//         attachment 
//       });
//     }

//     await newMessage.save();
//     res.status(201).json({ message: 'Message saved successfully' });
//   } catch (error) {
//     console.error('Error in POST /messages:', error);
//     res.status(500).json({ message: 'Error saving message' });
//   }
// });
