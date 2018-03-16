// //from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
// const cheerio = require('cheerio');
// const axios = require('axios');

// const url = 'http://www.foxnews.com/world/2018/03/14/23-russian-diplomats-to-be-expelled-from-britain-amid-probe-into-ex-spys-poisoning.html';
// let urlArr = [];

// axios.get(url)
//     .then(result => {
//         let $ = cheerio.load(result.data)
//         let infoObj = {};
//         infoObj.headline = $('.headline').text().trim();
//         infoObj.text = $('.article-body').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
//         infoObj.textLength = $('.article-body').text().length
//         console.log(infoObj);

//     })