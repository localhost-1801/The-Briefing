//from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
const cheerio = require('cheerio');
const axios = require('axios');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const secrets = require('../secrets')
const Promise = require('bluebird')
const db = require('../server/db/firestore')
const scrapeBBC = require('./bbcScraper')
const scrapeFox = require('./foxScraper')
const scrapeWSJ = require('./wsjScraper')
const scrapeCNN = require('./cnnScraper')
const scrapeChicagoTribune = require('./chicagotribuneScraper')
const scrapeNYTimes = require('./nytimesScraper')
const scrapeWashingtonPost = require('./washingtonPostScraper')
const scrapePolitico = require('./politicoScraper')
const scrapeDefault = require('./defaultScraper')


// const data = {
//     title: 'hello'
// }
//  db.collection('articles').doc('Thing').set(data).then(()=> {
//      console.log('created')
//  })

// const url = 'http://www.bbc.com/news/world-us-canada-43402077';
// const url = 'https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7';
//const url = 'https://www.cnn.com/2018/03/14/us/students-who-did-not-walkout-trnd/index.html';
//const url = 'http://www.chicagotribune.com/news/local/breaking/ct-met-school-walkouts-gun-reform-20180313-story.html';
//const url = 'http://www.foxnews.com/world/2018/03/14/23-russian-diplomats-to-be-expelled-from-britain-amid-probe-into-ex-spys-poisoning.html';
// const url = 'https://www.nytimes.com/2018/03/14/world/europe/uk-russia-spy-punitive-measures.html';
// const url = 'https://www.wsj.com/articles/sec-charges-theranos-and-founder-elizabeth-holmes-with-fraud-1521045648';
// const url = 'https://politics.theonion.com/rex-tillerson-shoots-mike-pompeo-quick-email-explaining-1823738923'

async function masterArticleScrapper(url, parentUrl) {
    // console.log('------!_!_!_!__!_!_!_!!_!_!_!_!_-----', url);
    //going to have to set resultStr equal to infoObj.text
    let resultString = '';
    let domain = url.slice(url.indexOf('.') + 1)
    domain = domain.slice(0, domain.indexOf('.'))
    let infoObj = {text: '', flag: false};
    infoObj.url = url;
    const resultUrl = infoObj.url
    const resultObject = {}
    
try {
    switch (domain){
      case 'bbc':
        infoObj = await scrapeBBC(infoObj.url, infoObj)
        break;
      case 'foxnews':
        infoObj = await scrapeFox(infoObj.url, infoObj)
        break;
      case 'wsj':
        infoObj = await scrapeWSJ(infoObj.url, infoObj)
        break;
      //cnn still not fully supported
      case 'cnn':
        infoObj = await scrapeCNN(infoObj.url, infoObj)
        break;
      case 'chicagotribune':
        infoObj = await scrapeChicagoTribune(infoObj.url, infoObj)
        break;
      case 'nytimes':
        infoObj = await scrapeNYTimes(infoObj.url, infoObj)
        break;
      case 'washingtonpost':
        infoObj = await scrapeWashingtonPost(infoObj.url, infoObj)
        break;
      case 'politico' :
        infoObj = await scrapePolitico(infoObj.url, infoObj)
        break;
      default:
        infoObj = await scrapeDefault(infoObj.url, infoObj)
        break;
    }
  }
  catch (err) {
      console.log('ERROR', err)
  }
    if (parentUrl){
           infoObj.parent = parentUrl
       }
       // console.log(infoObj.text.slice(0,100))
       if(infoObj.text.length < 50){
            infoObj.flag = true
       }
       infoObj.text = infoObj.text.slice(0,1000)
       // console.log(infoObj.text.length);
       return infoObj
}

module.exports = masterArticleScrapper
