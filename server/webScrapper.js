//from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://www.nytimes.com/';
let urlArr = [];


axios.get(url)
    .then(result => {
        let $ = cheerio.load(result.data)
        $('.story-heading').each(function () {
            let infoObj = {};
            infoObj.headline = $(this).text().trim();
            infoObj.url = $(this).children('a').attr('href')

            urlArr.push(infoObj);
            urlArr = urlArr.filter(object => typeof object.url !== 'undefined')
        })
        console.log(urlArr);
    })
    .then(result => urlArr.forEach(obj => {
        axios.get(obj.url)
            .then(result => {
                let $$ = cheerio.load(result.data)
                console.log($$('.story-body .story-body-text').text().length)

            })
    }))

// urlArr.forEach(obj => {
//     axios.get(obj.url)
//         .then(result => console.log( 'test', result))
// })

// rp(options)
//   .then(($) => {
//     console.log($('.story-heading').text());
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// console.log($('.story-heading').text())