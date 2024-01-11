// authRoutes.js(Login Endpoint)
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/user'); // Import the User model
const bcrypt = require('bcrypt'); // Import bcrypt for password comparison



// router.post('/register', authController.registerUser);
// router.post('/login', authController.loginUser);
// router.get('/logout', authController.logoutUser);
// router.get('/doctorLogin', (req, res) => res.render('doctor-login'));
// router.get('/doctorRegister', (req, res) => res.render('doctor-register'))
// router.post('/doctorRegister', authController.registerDoctor);
// router.post('/doctorLogin', authController.loginDoctor);

router.post('/register', authController.registerUser);


//router.post('/login', authController.login);
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id, role: user.role }, 'yourSecretKey');
      res.json({ success: true, token, role: user.role }); // Send token and role in the response
    } else {
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});






// Handle doctor register GET and POST requests
router.get('/doctorRegister', (req, res) => res.render('doctorRegister'));
router.post('/doctorRegister', authController.registerDoctor);
// Add this in your routes (e.g., authRoutes.js)

  
module.exports = router;