// index.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

// Import routes
const newsRoutes = require('./server/routes/newsRoutes');
const viewRoutes = require('./server/routes/viewRoutes');
const authRoutes = require('./server/routes/api/authRoutes');
const petRoutes = require('./server/routes/petRoutes');
const messageRoutes = require('./server/routes/messageRoutes');
const examinationRoutes = require('./server/routes/examinationRoutes');
const doctorRoutes = require('./server/routes/doctorRoutes');
const userRoutes = require('./server/routes/userRoutes');


const app = express();

// DB Config
const db = require('./server/config/db');

// Controllers
const authController = require('./server/controllers/authController');

// Middleware
const authenticateToken = require('./server/middleware/authenticateToken');

// Connect to MongoDB
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.MONGO_URI, // Use a .env variable for the secret
  saveUninitialized: true,
  resave: false
}));

// Initialize flash middleware
app.use(flash());

// Logging Middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Middleware to set the static folder for public assets
app.use(express.static(path.join(__dirname, 'client', 'public')));

// EJS setup
const viewsDirectories = [
  path.join(__dirname, '..', 'client', 'views'),
  path.join(__dirname, '..', 'client', 'views', 'pages')
];

app.set('views', path.join(__dirname, 'client', 'views'));

app.set('view engine', 'ejs');

// REACT logs 
app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('POST request body:', req.body);
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes); // API routes for REACT app
app.use('/', viewRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/pet', petRoutes);
app.use('/api', examinationRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/users', userRoutes);
app.use('/', newsRoutes);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'react-dashboard', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-dashboard', 'build', 'index.html'));
});


app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// const PORT = process.env.PORT || 3010;
// app.listen(PORT, console.log(`Server started on port ${PORT}`));


const PORT = process.env.PORT || 3010;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  try {
    const open = (await import('open')).default;
    open(`http://localhost:${PORT}`);
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
});