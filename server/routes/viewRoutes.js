//routes/viewRoutes.js
const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/contactMessage');


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

router.post('/contact/submit-form', async (req, res) => {
    console.log("POST /contact called");
    try {
        const newMessage = new ContactMessage({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        await newMessage.save();
        req.flash('success', 'Thank you for your message! We will get back to you soon.');
        res.redirect('/contact');
    } catch (error) {
        console.error("Error in POST /contact:", error);
        req.flash('error', 'An error occurred while sending your message.');
        res.redirect('/contact');
    }
});




// Route for Contact page
router.get('/contact', (req, res) => {
    console.log("GET /contact called");
    res.render('pages/contact', {
        success_msg: req.flash('success'), 
        error_msg: req.flash('error')
    });
});










module.exports = router;
