// //from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
// const cheerio = require('cheerio');
// const axios = require('axios');

// const url = 'http://www.chicagotribune.com/news/local/breaking/ct-met-school-walkouts-gun-reform-20180313-story.html';
// let urlArr = [];

// axios.get(url)
//     .then(result => {
//         let $ = cheerio.load(result.data)
//         let infoObj = {};
//         infoObj.headline = $('h1[itemprop=headline]').text().trim();
//         infoObj.text = $('.trb_ar_bd').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
//         infoObj.textLength = $('.trb_ar_bd').text().length
//         console.log(infoObj);

//     })