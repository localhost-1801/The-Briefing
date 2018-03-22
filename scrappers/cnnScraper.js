const cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');

async function scrapeCNN(url, infoObj){
  infoObj.source = 'cnn'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('h1[class=pg-headline]').text().trim()
  $('.zn-body__paragraph').each(function (){
    infoObj.text += $(this).text()
  })
  infoObj.text = infoObj.text.replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim()
  infoObj.textLength = infoObj.text.length
  return infoObj;
}

module.exports = scrapeCNN;
