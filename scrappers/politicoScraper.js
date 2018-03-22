var cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');
var cheerioAdv = require('cheerio-advanced-selectors');
cheerio = cheerioAdv.wrap(cheerio)

async function scrapePolitico(url, infoObj){
  infoObj.source = 'politico'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('#topper-headline-wrapper h1').text().trim()
  $('.story-text p').each(function (){
    infoObj.text += $(this).text()
  })
  infoObj.imageUrl = $('.story-text img:first').attr('src');
  if (!infoObj.imageUrl){
    infoObj.imageUrl = 'https://static.politico.com/51/39/958e25a2475dafd4f496e5eecf1e/politics-policy-political-news.jpg'
  }
  infoObj.text = infoObj.text.replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim()
  infoObj.textLength = infoObj.text.length
  return infoObj;
}

module.exports = scrapePolitico;
