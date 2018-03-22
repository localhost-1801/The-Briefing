const cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');

async function scrapeBBC(url, infoObj){
  infoObj.source = 'bbc'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('h1[class=story-body__h1]').text().trim();
  $('.story-body__inner p').each(function () {
    infoObj.text += $(this).text()
  })
  infoObj.text = infoObj.text.replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim()
  infoObj.textLength = infoObj.text.length
  return infoObj;
}

module.exports = scrapeBBC;
