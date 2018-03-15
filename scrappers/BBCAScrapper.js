//from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
const cheerio = require('cheerio');
const axios = require('axios');

const url = 'http://www.bbc.com/news/world-us-canada-43402077';
let urlArr = [];

axios.get(url)
    .then(result => {
        let $ = cheerio.load(result.data)
        let infoObj = {};
        infoObj.headline = $('h1[class=story-body__h1]').text().trim();
        infoObj.text = $('.story-body__inner').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
        infoObj.textLength = $('.story-body__inner').text().length
        console.log(infoObj);

    })