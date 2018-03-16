// //from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
// const cheerio = require('cheerio');
// const axios = require('axios');

// const url = 'https://www.wsj.com/articles/sec-charges-theranos-and-founder-elizabeth-holmes-with-fraud-1521045648';
// let urlArr = [];

// axios.get(url)
//     .then(result => {
//         let $ = cheerio.load(result.data)
//         let infoObj = {};
//         infoObj.headline = $('h1[class=wsj-article-headline]').text().trim();
//         infoObj.text = $('.wsj-snippet-body').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
//         infoObj.textLength = $('.wsj-snippet-body').text().length
//         console.log(infoObj);

//     })