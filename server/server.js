require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// DB Config
const db = require('./config/db');

const app = express();
 


// Connect to MongoDB
mongoose.connect(db.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.set('view engine', 'ejs');
const viewsDirectories = [
  path.join(__dirname, '..', 'client', 'views'),
  path.join(__dirname, '..', 'client', 'views', 'pages')
];
app.set('views', viewsDirectories);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === "production" }
}));





app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use(dashboardRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
