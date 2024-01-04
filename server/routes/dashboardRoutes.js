// dashboardRoutes.js
const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet'); // Assuming Pet model is in the models directory
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // Logic to retrieve user data or other necessary information
    res.render('pages/dashboard'); // Render a dashboard view
});

// Route to handle Add Pet form submission
router.post('/dashboard/add-pet', ensureAuthenticated, async (req, res) => {
    try {
        const { type, name, breed, gender, image } = req.body;
        const ownerId = req.session.userId; // Get owner ID from session
        const newPet = new Pet({ ownerId, type, name, breed, gender, image });

        await newPet.save();
        res.status(201).redirect('/dashboard'); // Redirect to dashboard with success message
    } catch (error) {
        console.error('Add Pet Error:', error);
        res.status(500).send('Error in adding pet');
    }
});

module.exports = router;
