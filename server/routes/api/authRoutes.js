// server/routes/api/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');


router.post('/register', authController.registerUser);
router.post('/login', authController.login);

router.post('/logout', (req, res) => {
    res.clearCookie('token'); // Clears the HTTP-only cookie
    console.log('User logged out');
    res.json({ success: true, message: 'Logout successful' });
  })


module.exports = router;
