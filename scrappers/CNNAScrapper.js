// //from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
// const cheerio = require('cheerio');
// const axios = require('axios');

// const url = 'https://www.cnn.com/2018/03/14/us/students-who-did-not-walkout-trnd/index.html';
// let urlArr = [];

// axios.get(url)
//     .then(result => {
//         let $ = cheerio.load(result.data)
//         let infoObj = {};
//         infoObj.headline = $('h1[class=pg-headline]').text().trim();
//         infoObj.text = $('.l-container').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
//         infoObj.textLength = $('.l-container').text().length
//         console.log(infoObj);

//     })