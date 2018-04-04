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
const scrapeChicagoTribune = require('./chicagoTribuneScraper')
const scrapeNYTimes = require('./nytimesScraper')
const scrapeWashingtonPost = require('./washingtonPostScraper')
const scrapePolitico = require('./politicoScraper')
const scrapeDefault = require('./defaultScraper')

async function masterArticleScraper(url, parentUrl) {
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
       if(infoObj.text.length < 50){
            infoObj.flag = true
       }
       infoObj.text = infoObj.text.slice(0,1000)
       return infoObj
}

module.exports = masterArticleScraper
