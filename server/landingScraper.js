//from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
const cheerio = require('cheerio');
const axios = require('axios');
const request = require('request')
const masterArticleScraper = require('../scrapers/masterScraper.js')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_KEY);

function frontPageScraper() {
    //JUST FOR THE SAKE OF DATA MANAGEMENT, I decided to just add NYT to newsAPI instead of using its own API, strictly for new york times,
    // request.get({
    //     url: "https://api.nytimes.com/svc/topstories/v2/home.json",
    //     qs: {
    //         'api-key': "73edcfd2d82641dd9b7828788280eab2"
    //     },
    // }, function (err, response, body) {
    //     body = JSON.parse(body);
    //     body.results.forEach(article => console.log(article.url))
    // })

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




//const url = 'https://www.nytimes.com/';
// const url = 'https://www.cnn.com/';
// const url = 'http://www.chicagotribune.com/'
// const url = 'http://www.foxnews.com/'
// const url = 'http://www.bbc.com/'
// const url = 'https://www.wsj.com/'

// let urlArr = [];
// function frontPageScraper(url, urlArr = []) {
// const domain = url.substring(url.lastIndexOf('www.') + 4, url.lastIndexOf('.com'));

// axios.get(url)
//     .then(result => {
//         let $ = cheerio.load(result.data)
//         $('.story-heading').each(function () {
//             let infoObj = {};
//             infoObj.headline = $(this).text().trim();
//             infoObj.url = $(this).children('a').attr('href')

//             urlArr.push(infoObj);
//             urlArr = urlArr.filter(object => typeof object.url !== 'undefined')
//         })
//         console.log(urlArr);
//     })
//     .then(result => urlArr.forEach(obj => {
//         axios.get(obj.url)
//             .then(result => {
//                 let $$ = cheerio.load(result.data)
//                 //console.log($$('.story-body .story-body-text').text().length)

//             })
//     }))
// }
//frontPageScraper(url, urlArr);
