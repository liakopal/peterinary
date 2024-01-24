//routes/viewRoutes.js
const express = require('express');
const router = express.Router();

// Serve EJS-based pages
// Route for the about page
// router.get('/about', (req, res) => {
//     const aboutContent = [
//         // Populate this array with objects containing title and text for each about section
//     ];

//     res.render('pages/about', { aboutContent });
// });

router.get('/home', (req, res) => {
    console.log('Rendering home page');
    const services = [
        { id: 1, title: 'Clinic Services', description: 'Access a comprehensive history of your pet\'s examinations, vaccinations, and treatments.', image: 'image2.png' },
        { id: 2, title: 'Support', description: 'Access a comprehensive history of your pet\'s examinations, vaccinations, and treatments. Stay informed about their health journey at your fingertips', image: 'image4.png' },
        { id: 3, title: 'Pet Registration', description: 'Quickly register your beloved pets in our system. Keep their information up-to-date, schedule appointments, and manage their health records effortlessly', image: 'image1.png' },
        { id: 4, title: 'Veterinarians', description: 'Our specialized veterinarians have dedicated access to all pet profiles, ensuring a personalized and informed approach to your pet\'s healthcare.', image: 'image3.png' },
    ];
    
    res.render('pages/home', { services });
});

router.get('/', (req, res) => {
    res.redirect('/home');
});

// Route for the about page
router.get('/about', (req, res) => {
    const aboutContent = [
    ];

    res.render('pages/about', { aboutContent });
});

// Route for Services page
router.get('/services', (req, res) => {
    res.render('pages/under-construction');
});

// Route for News page
router.get('/news', (req, res) => {
    res.render('pages/under-construction');
});

// Route for Contact page
router.get('/contact', (req, res) => {
    res.render('pages/under-construction');
});











module.exports = router;
