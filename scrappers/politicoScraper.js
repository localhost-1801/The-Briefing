const cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');

async function scrapePolitico(url, infoObj){
  infoObj.source = 'politico'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('#topper-headline-wrapper h1').text().trim()
  $('.story-text p').each(function (){
    infoObj.text += $(this).text()
  })
  infoObj.text = infoObj.text.replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim()
  infoObj.textLength = infoObj.text.length
  return infoObj;
}

module.exports = scrapePolitico;
