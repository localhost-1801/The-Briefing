const cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');

async function scrapeChicagoTribune(url, infoObj){
  infoObj.source = 'chicagotribune'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('h1[class=pg-headline]').text().trim();
  infoObj.textLength = await $('.trb_ar_bd').text().length
  infoObj.text = await $('.trb_ar_bd').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
  return infoObj;
}

module.exports = scrapeChicagoTribune;
