// Import necessary modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

// Initialize Express
const app = express();

const newsRoute = require('./routes/news');

// Import your database config
const dbConfig = require('./config/database');


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    sameSite: 'lax', // Can be 'strict', 'lax', or 'none'
  },
  resave: true,
  saveUninitialized: true
}));

// Set static folder
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// EJS
app.set('view engine', 'ejs');

// Set multiple directories for Express to look for views
const viewsDirectories = [
  path.join(__dirname, '..', 'client', 'views'),
  path.join(__dirname, '..', 'client', 'views', 'pages')
];
app.set('views', viewsDirectories);
;


app.get('/about', (req, res) => {
  const aboutContent = [
      // Populate this array with objects containing title and text for each about section
  ];
  
  res.render('about', { aboutContent: aboutContent });
});



// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/news', newsRoute);

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
