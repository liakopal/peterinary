const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    let { username, email,  password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send('Username already exists');
    }
    user = new User({ username, email, password });
    await user.save();
    res.status(201).redirect('/login'); // Redirect to login after successful registration
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Error in registration');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id; // Set the user session
      res.redirect('/dashboard'); // Redirect to dashboard after successful login
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Error logging in');
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/'); // Redirect to home page after logout
  });
};
