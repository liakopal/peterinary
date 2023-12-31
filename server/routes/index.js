const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const services = [
        { id: 1, title: 'Clinic Services', description: 'Access a comprehensive history of your pet\'s examinations, vaccinations, and treatments.', image: 'image2.png' },
        { id: 2, title: 'Support', description: 'Access a comprehensive history of your pet\'s examinations, vaccinations, and treatments. Stay informed about their health journey at your fingertips', image: 'image4.png' },
        { id: 3, title: 'Pet Registration', description: 'Quickly register your beloved pets in our system. Keep their information up-to-date, schedule appointments, and manage their health records effortlessly', image: 'image1.png' },
        { id: 4, title: 'Veterinarians', description: 'Our specialized veterinarians have dedicated access to all pet profiles, ensuring a personalized and informed approach to your pet\'s healthcare.', image: 'image3.png' },
    ];
    
    res.render('pages/home', { services });
});


module.exports = router;

