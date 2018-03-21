//from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
const cheerio = require('cheerio');
const axios = require('axios');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const secrets = require('../secrets')
const Promise = require('bluebird')
const db = require('../server/db/firestore')


// const data = {
//     title: 'hello'
// }
//  db.collection('articles').doc('Thing').set(data).then(()=> {
//      console.log('created')
//  })

// const url = 'http://www.bbc.com/news/world-us-canada-43402077';
// const url = 'https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7';
//const url = 'https://www.cnn.com/2018/03/14/us/students-who-did-not-walkout-trnd/index.html';
//const url = 'http://www.chicagotribune.com/news/local/breaking/ct-met-school-walkouts-gun-reform-20180313-story.html';
//const url = 'http://www.foxnews.com/world/2018/03/14/23-russian-diplomats-to-be-expelled-from-britain-amid-probe-into-ex-spys-poisoning.html';
// const url = 'https://www.nytimes.com/2018/03/14/world/europe/uk-russia-spy-punitive-measures.html';
const url = 'https://www.wsj.com/articles/sec-charges-theranos-and-founder-elizabeth-holmes-with-fraud-1521045648';
// const url = 'https://politics.theonion.com/rex-tillerson-shoots-mike-pompeo-quick-email-explaining-1823738923'

async function masterArticleScrapper(url, parentUrl) {
    // console.log('------!_!_!_!__!_!_!_!!_!_!_!_!_-----', url);
    let resultString = '';
    let domain = url.slice(url.indexOf('.') + 1)
    domain = domain.slice(0, domain.indexOf('.'))
    let infoObj = {};
    infoObj.url = url;
    const resultUrl = infoObj.url
    const resultObject = {}
    try {
        if (domain === 'bbc') {
            infoObj.source = 'bbc'
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            infoObj.headline = await $('h1[class=story-body__h1]').text().trim();
            infoObj.textLength = await $('.story-body__inner').text().length
            infoObj.text = await $('.story-body__inner').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            resultString = infoObj.text;
        } else if (domain === 'foxnews') {
            infoObj.source = 'fox'
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            infoObj.headline = await $('.headline').text().trim();
            infoObj.textLength = await $('.article-body').text().length
            infoObj.text = await $('.article-body').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            resultString = infoObj.text;
        } else if (domain === 'wsj') {
            infoObj.source = 'wsj'
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            infoObj.headline = await $('h1[class=wsj-article-headline]').text().trim();
            infoObj.textLength = await $('.wsj-snippet-body').text().length
            infoObj.text = await $('.wsj-snippet-body').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            resultString = infoObj.text;
        } else if (domain === 'cnn') {
            infoObj.source = 'cnn'
            // if(){
            //
            // }
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            infoObj.headline = await $('h1[class=pg-headline]').text().trim();
            $('p').each(function () {
              infoObj.text += $(this).text()
            })
            $('.zn-body__paragraph').each(function (){
              infoObj.text += $(this).text()
            })
            $('.zn-body__readl-all .zn-body__paragraph').each(function (){
              infoObj.text += $(this).text()
            })
            // infoObj.textLength = await $('.l-container').text().length
            // infoObj.text = await $('.l-container').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            infoObj.text = infoObj.text.replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim()
            infoObj.textLength = infoObj.text.length
            resultString = infoObj.text;
        } else if (domain === 'chicagotribune') {
            infoObj.source = 'chicagotribune'
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            infoObj.headline = await $('h1[class=pg-headline]').text().trim();
            infoObj.textLength = await $('.trb_ar_bd').text().length
            infoObj.text = await $('.trb_ar_bd').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            resultString = infoObj.text;
        } else if (domain === 'nytimes') {
            infoObj.source = 'nytimes'
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            infoObj.headline = await $('#headline').text().trim();
            infoObj.textLength = await $('.story-body-text').text().length
            infoObj.text = await $('.story-body-text').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            resultString = infoObj.text;
        } else {
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            if ($('meta[property="og:title"]')) {
                infoObj.headline = $('meta[property="og:title"]').attr('content').replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            } else if ($('itemprop="name"')) {
                infoObj.headline = $('itemprop="name"').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();;
            } else if ($('title')) {
                infoObj.headline = $('title').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();;
            } else {
                infoObj.headline = url;
            }

            if ($('meta[property="og:description"]')) {
                infoObj.text = $('meta[property="og:description"]').attr('content').replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            } else if ($('[itemprop="description"]')) {
                infoObj.text = $('[itemprop="description"]').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();;
            } else if ($('meta[name="description"]')) {
                infoObj.text = $('meta[name="description"]').attr('content').replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            } else {
                throw new Error('no description/text');
            }
            resultString = infoObj.text;
        }
        if(parentUrl){
            infoObj.parent = parentUrl
        }
        // console.log(infoObj.text.slice(0,100))
        infoObj.text = infoObj.text.slice(0,1000)
        // console.log(infoObj.text.length);
        return infoObj
    }

    catch (err) {
        console.log('ERROR', err)
    }
}

masterArticleScrapper('https://www.cnn.com/2018/03/21/us/austin-explosions/index.html')
.then(result => console.log(result))

// masterArticleScrapper(url)
module.exports = masterArticleScrapper
