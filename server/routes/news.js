const express = require('express');
const axios = require('axios'); // Make sure axios is installed via npm
const router = express.Router();

router.get('/', async (req, res) => {
    // Your API key should not be hardcoded but loaded from an environment variable
    const apiKey = process.env.NEWS_API_KEY; // Make sure to have NEWS_API_KEY in your .env file

    try {
        // Make the axios GET request to the NewsAPI
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'dogs', // This is your search query for dog-related news
                apiKey: apiKey // Use the API key from your .env file
            }
        });

        // If the response is OK, render the 'news' EJS view and pass the articles
        res.render('news', { articles: response.data.articles });
    } catch (error) {
        // If there's an error, log it and send an error response
        console.error(error);
        res.status(500).send('Error fetching news');
    }
});

module.exports = router;
