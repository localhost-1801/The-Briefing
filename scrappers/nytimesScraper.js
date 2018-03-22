const cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');

async function scrapeNYTimes(url, infoObj){
  infoObj.source = 'nytimes'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('#headline').text().trim();
  infoObj.textLength = await $('.story-body-text').text().length
  infoObj.text = await $('.story-body-text').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
  return infoObj;
}

module.exports = scrapeNYTimes;
