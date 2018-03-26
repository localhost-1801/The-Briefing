var cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');
var cheerioAdv = require('cheerio-advanced-selectors');
cheerio = cheerioAdv.wrap(cheerio)

async function scrapeWashingtonPost(url, infoObj){
  infoObj.source = 'washingtonpost'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('#topper-headline-wrapper h1').text().trim()
  $('#article-body p').each(function (){
    infoObj.text += $(this).text()
  })
  infoObj.imageUrl = $('.article-body img:first').attr('src')
  if(!infoObj.imageUrl){
    infoObj.imageUrl = 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2016/01/960w/blogs_citydesk_files_2015_10_washington_post_logo_vertical_1024x754.jpg'
  }
  infoObj.text = infoObj.text.replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim()
  infoObj.textLength = infoObj.text.length
  return infoObj;
}

module.exports = scrapeWashingtonPost;
