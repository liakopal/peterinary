const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated'); // This should be the correct path

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // Logic to retrieve user data or other necessary information
    res.render('pages/dashboard'); // Render a dashboard view
});

module.exports = router;
