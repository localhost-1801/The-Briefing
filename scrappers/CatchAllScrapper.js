//from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
const cheerio = require('cheerio');
const axios = require('axios');

//const url = 'http://www.bbc.com/news/world-us-canada-43402077';
//const url = 'https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7'; //DOESNT WORK
//const url = 'https://www.cnn.com/2018/03/14/us/students-who-did-not-walkout-trnd/index.html';
//const url = 'http://www.chicagotribune.com/news/local/breaking/ct-met-school-walkouts-gun-reform-20180313-story.html';
//const url = 'http://www.foxnews.com/world/2018/03/14/23-russian-diplomats-to-be-expelled-from-britain-amid-probe-into-ex-spys-poisoning.html';
//const url = 'https://www.nytimes.com/2018/03/14/world/europe/uk-russia-spy-punitive-measures.html';
//const url = 'https://www.wsj.com/articles/sec-charges-theranos-and-founder-elizabeth-holmes-with-fraud-1521045648';
//const url = 'https://www.theguardian.com/us-news/2018/mar/14/walkout-students-gun-violence-parkland-florida'
//const url = 'https://www.theonlinecitizen.com/2018/03/14/uber-grab-driver-we-are-now-squeezed-left-right-and-centre-by-govt/';
const url = 'https://www.theatlantic.com/education/archive/2018/03/what-will-the-nationwide-walkouts-accomplish/555638/';
//const url = 'https://www.npr.org/sections/thetwo-way/2018/03/14/593433911/across-the-country-students-walk-out-to-protest-gun-violence';
//const url = 'www.google.com';

console.log(url.substring(url.lastIndexOf('www.')+4, (url.lastIndexOf('.com'))))
let urlArr = [];

axios.get(url)
  .then(result => {
    let $ = cheerio.load(result.data)
    let infoObj = {};
    if ($('meta[property="og:title"]')) {
      infoObj.headline = $('meta[property="og:title"]').attr('content').replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
    } else if ($('itemprop="name')) {
      infoObj.headline = $('itemprop="name').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();;
    } else if ($('title')) {
      infoObj.headline = $('title').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();;
    } else {
      infoObj.headline = url;
    }

    if ($('meta[property="og:description"]')) {
      infoObj.text = $('meta[property="og:description"]').attr('content').replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
    } else if ($('[itemprop="description"]')) {
      infoObj.text = $('[itemprop="description"]').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();;
    } else if ($('meta[name="description"]')) {
      infoObj.text = $('[itemprop="description"]').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();;
    } else {
      throw new Error ('no description/text');
    }
    console.log(infoObj)
  }).catch(error => console.log(error))
