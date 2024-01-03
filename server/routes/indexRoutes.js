const express = require('express');
const router = express.Router();

// Route for the home page
router.get('/', (req, res) => {
    const services = [
        { id: 1, title: 'Clinic Services', description: 'Access a comprehensive history of your pet\'s examinations, vaccinations, and treatments.', image: 'image2.png' },
        { id: 2, title: 'Support', description: 'Access a comprehensive history of your pet\'s examinations, vaccinations, and treatments. Stay informed about their health journey at your fingertips', image: 'image4.png' },
        { id: 3, title: 'Pet Registration', description: 'Quickly register your beloved pets in our system. Keep their information up-to-date, schedule appointments, and manage their health records effortlessly', image: 'image1.png' },
        { id: 4, title: 'Veterinarians', description: 'Our specialized veterinarians have dedicated access to all pet profiles, ensuring a personalized and informed approach to your pet\'s healthcare.', image: 'image3.png' },
    ];
    
    res.render('pages/home', { services });
});

// Route for the about page
router.get('/about', (req, res) => {
    const aboutContent = [
        // Populate this array with objects containing title and text for each about section
    ];

    res.render('pages/about', { aboutContent });
});

// Route for the registration page
router.get('/register', (req, res) => {
    res.render('pages/register'); // Make sure you have a register.ejs in your views/pages directory
});

// Route for the login page
router.get('/login', (req, res) => {
    res.render('pages/login'); // Make sure you have a login.ejs in your views/pages directory
});


module.exports = router;
