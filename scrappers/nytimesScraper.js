var cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');
var cheerioAdv = require('cheerio-advanced-selectors');
cheerio = cheerioAdv.wrap(cheerio)

async function scrapeNYTimes(url, infoObj){
  infoObj.source = 'nytimes'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('#headline').text().trim();
  infoObj.textLength = await $('.story-body-text').text().length
  infoObj.imageUrl = $('.story-body img:first').attr('src')
  if(infoObj.imageUrl === undefined){
    infoObj.imageUrl = 'https://g1.nyt.com/assets/homepage/20180316-154941/images/foundation/logos/nyt-logo-379x64.png'
  }
  infoObj.text = await $('.story-body-text').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
  return infoObj;
}

module.exports = scrapeNYTimes;
