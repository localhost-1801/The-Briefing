const cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');

async function scrapeDefault(url, infoObj){
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  if ($('meta[property="og:title"]')) {
      infoObj.headline = $('meta[property="og:title"]').attr('content').replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
  } else if ($('itemprop="name"')) {
      infoObj.headline = $('itemprop="name"').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
  } else if ($('title')) {
      infoObj.headline = $('title').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
  } else {
      infoObj.headline = url;
  }

  if ($('meta[property="og:description"]')) {
      infoObj.text = $('meta[property="og:description"]').attr('content').replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
  } else if ($('[itemprop="description"]')) {
      infoObj.text = $('[itemprop="description"]').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
  } else if ($('meta[name="description"]')) {
      infoObj.text = $('meta[name="description"]').attr('content').replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
  } else {
      throw new Error('no description/text');
  }
  return infoObj
}

module.exports = scrapeDefault;
