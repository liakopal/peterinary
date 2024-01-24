const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/news', async (req, res) => {
    try {
        // Fetching news about dogs
        const newsResponse = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'dogs',
                apiKey: process.env.NEWS_API_KEY
            }
        });

        // Fetching veterinary adverse event reports
        const veterinaryResponse = await axios.get(`https://api.fda.gov/animalandveterinary/event.json`, {
            params: {
                search: 'drug_name:"Ivermectin"',
                limit: 10
            }
        });

        // Rendering the news template with both news and veterinary data
        res.render('news', {
            articles: newsResponse.data.articles,
            veterinaryReports: veterinaryResponse.data.results
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching news and veterinary reports');
    }
});

module.exports = router;
