// server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const indexRoutes = require('./routes/indexRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');
// DB Config
const db = require('./config/db');

const app = express();

// Connect to MongoDB
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
// server.js or wherever you configure your Express middleware
const corsOptions = {
  origin: 'http://localhost:3000', // Your React app's URL
  credentials: true, // To allow cookies to be sent
};
app.use(cors(corsOptions));

// Define isDevelopment based on your environment
const isDevelopment = process.env.NODE_ENV !== 'production';

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: !isDevelopment }
}));

// Static files
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

const viewsDirectories = [
  path.join(__dirname, '..', 'client', 'views'),
  path.join(__dirname, '..', 'client', 'views', 'pages')
];

// EJS setup
app.set('view engine', 'ejs');

app.set('views', viewsDirectories);


app.get('/auth/validate_session', (req, res) => {
  // Here, 'authenticateToken' is middleware that validates your JWT token
  authenticateToken(req, res, () => {
    if (req.user) {
      res.json({ success: true, user: req.user });
    } else {
      res.json({ success: false });
    }
  });
});


app.get('/doctorRegister', (req, res) => {
  res.render('doctorRegister');
});



// Assuming you have a session setup that stores the user's role
app.get('/user-role', (req, res) => {
  if (req.session && req.session.userId) {
    res.json({ role: req.session.role });
  } else {
    res.status(401).send('User not logged in');
  }
});

// Routes

app.use('/', indexRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

app.use(messageRoutes);

const petRoutes = require('./routes/petRoutes'); // Adjust the path as necessary
app.use(petRoutes);

const examinationRoutes = require('./routes/examinationRoutes');
app.use(examinationRoutes);

// Serve the static files from the React app BEFORE catch-all route
app.use(express.static(path.join(__dirname, '..', 'react-dashboard', 'build')));

// Catch-all route - Make sure it's after your API and auth routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'react-dashboard', 'build', 'index.html'));
});

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3010;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
