var cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');
var cheerioAdv = require('cheerio-advanced-selectors');
cheerio = cheerioAdv.wrap(cheerio)

async function scrapeChicagoTribune(url, infoObj){
  infoObj.source = 'chicagotribune'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('h1[class=trb_ar_hl_t]').text().trim();
  infoObj.textLength = await $('.trb_ar_bd').text().length
  infoObj.imageUrl = 'http://s3.amazonaws.com/abn-prod/wp-content/uploads/sites/4/2017/12/ChicagoTribune.jpg'
  infoObj.text = await $('.trb_ar_bd').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
  return infoObj;
}

module.exports = scrapeChicagoTribune;
