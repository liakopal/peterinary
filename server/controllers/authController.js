// authController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    console.log('Received registration data:', req.body);
    let { username, email, password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send('Username already exists');
    }
    user = new User({ username, email, password, role: req.body.role }); // Use role from the request
    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully' }); 
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Error in registration');
  }
};

exports.registerDoctor = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingDoctor = await User.findOne({ username, role: 'doctor' });
    if (existingDoctor) {
      return res.status(400).send('Doctor username already exists');
    }
    user = new User({ username, email, password, role: req.body.role }); // Use role from the request    await doctor.save();
    res.status(201).json({ success: true, message: 'Doctor registered successfully' }); 
  } catch (error) {
    console.error('Doctor Registration error:', error);
    res.status(500).send('Error in doctor registration');
  }
};

exports.login = async (req, res) => {
  console.log('Login request:', req.body); // Log the request
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      // Sign the JWT
      const token = jwt.sign(
        { userId: user._id, role: user.role, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('token', token, { httpOnly: true }); // Sending the token as an HTTP-only cookie
      res.json({ success: true, message: 'Login successful', token, userId: user._id, role: user.role, token, username: user.username });
    } else {
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// exports.logout = async (req, res) => {
//   res.clearCookie('token');
//   res.json({ success: true, message: 'Logged out successfully' });
// };
