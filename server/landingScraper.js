const cheerio = require('cheerio');
const axios = require('axios');
const request = require('request')
const masterArticleScraper = require('../scrapers/masterScraper.js')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_KEY);

function frontPageScraper() {

    newsapi.v2.topHeadlines({
        sources: 'bbc-news,the-new-york-times,cnn,fox-news,the-wall-street-journal',
        pageSize: 100
    }).then(response => {
        response.articles.forEach(article => {
           masterArticleScraper(article.url)
           .then(articles => console.log(article))
           .catch(err => console.error(err))
        })
    });
}

frontPageScraper();

