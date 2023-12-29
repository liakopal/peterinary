// Import necessary modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

// Import your database config
const dbConfig = require('./config/database');

// Initialize Express
const app = express();

// Connect to MongoDB
mongoose.connect(dbConfig.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));


// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views'));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));      // For authentication-related routes
app.use('/dashboard', require('./routes/dashboard')); // For dashboard-related routes
app.use('/doctor', require('./routes/doctor'));   // For doctor-specific routes
// ... other routes based on your files


// Define the port
const PORT = process.env.PORT || 3010;

// Start the server
app.listen(PORT, console.log(`Server started on port ${PORT}`));
