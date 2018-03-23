var cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');
var cheerioAdv = require('cheerio-advanced-selectors');
cheerio = cheerioAdv.wrap(cheerio)

async function scrapeBBC(url, infoObj){
  infoObj.source = 'bbc'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('h1[class=story-body__h1]').text().trim();
  $('.story-body__inner p').each(function () {
    infoObj.text += $(this).text()
  })
  infoObj.imageUrl = $('.story-body__inner img:first').attr('src')
  infoObj.text = infoObj.text.replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim()
  infoObj.textLength = infoObj.text.length
  return infoObj;
}

module.exports = scrapeBBC;
