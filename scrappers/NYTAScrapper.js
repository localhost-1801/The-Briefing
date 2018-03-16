//from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://www.nytimes.com/2018/03/14/world/europe/uk-russia-spy-punitive-measures.html';
let urlArr = [];


axios.get(url)
    .then(result => {
        let $ = cheerio.load(result.data)
        let infoObj = {};
        infoObj.headline = $('#headline').text().trim();
        infoObj.text = $('.story-body-text').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
        infoObj.textLength = $('.story-body-text').text().length
        console.log(infoObj);
        // $('#story').each(function () {
        //     let infoObj = {};
        //     infoObj.test =  $(this).text().trim();
        //     infoObj.headline = $(this).children('.headline').text().trim();
        //     //infoObj.url = $(this).children('a').attr('href')
        //     infoObj.article = $(this).children('.story-body story-body-1').text()
        //     //.include(/\w \d \s/g)
        //     urlArr.push(infoObj);
        // })
        // console.log(urlArr);
    })
    // .then(result => urlArr.forEach(obj => {
    //     axios.get(obj.url)
    //         .then(result => {
    //             let $$ = cheerio.load(result.data)
    //             console.log($$('.story-body .story-body-text').text().length)

    //         })
    //}))

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