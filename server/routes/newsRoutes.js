const axios = require('axios');
const router = require('express').Router();

router.get('/news', async (req, res) => {
    try {
        const apiKey = process.env.NEWS_API_KEY;
        const apiUrl = `https://newsapi.org/v2/everything?q=pets OR dogs OR cats OR animals&language=en&apiKey=${apiKey}`;

        const response = await axios.get(apiUrl);
        const newsArticles = response.data.articles;

        res.render('pages/news', { articles: newsArticles });
    } catch (error) {
        console.error(error);
        res.render('pages/news', { articles: [], error: 'Error fetching news' });
    }
});



module.exports = router;
