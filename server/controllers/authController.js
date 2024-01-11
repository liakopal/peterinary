// authController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send('Username already exists');
    }
    user = new User({ username, email, password, role: 'user' }); // Set role as 'user'
    await user.save();
    res.status(201).redirect('/login'); // Redirect to login after successful registration
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
    const doctor = new User({ username, email, password, role: 'doctor' }); // Set role as 'doctor'
    await doctor.save();
    res.status(201).redirect('/login'); // Redirect to doctor login page
  } catch (error) {
    console.error('Doctor Registration error:', error);
    res.status(500).send('Error in doctor registration');
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id, role: user.role, username: user.username }, 'yourSecretKey');
      // Log the username and the role for debugging
      console.log(`Login successful for: ${user.username} with role: ${user.role}`);
      // Send the username along with the token and role
      res.json({ success: true, token, role: user.role, username: user.username });
    } else {
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.logoutUser = (req, res) => {
  console.log(`Session ending for user: ${req.session.username}`);
  req.session.destroy(() => {
    res.clearCookie('connect.sid'); // Clears the cookie
    res.json({ success: true, message: 'Logged out successfully' });
  });
};