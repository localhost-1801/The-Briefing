//from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
const cheerio = require('cheerio');
const axios = require('axios');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const secrets = require('../secrets')

const url = 'http://www.bbc.com/news/world-us-canada-43402077';
//const url = 'https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7';
//const url = 'https://www.cnn.com/2018/03/14/us/students-who-did-not-walkout-trnd/index.html';
//const url = 'http://www.chicagotribune.com/news/local/breaking/ct-met-school-walkouts-gun-reform-20180313-story.html';
//const url = 'http://www.foxnews.com/world/2018/03/14/23-russian-diplomats-to-be-expelled-from-britain-amid-probe-into-ex-spys-poisoning.html';
//const url = 'https://www.nytimes.com/2018/03/14/world/europe/uk-russia-spy-punitive-measures.html';
//const url = 'https://www.wsj.com/articles/sec-charges-theranos-and-founder-elizabeth-holmes-with-fraud-1521045648';
//const url = 'https://politics.theonion.com/rex-tillerson-shoots-mike-pompeo-quick-email-explaining-1823738923'


async function masterArticleScrapper(url) {
    let resultString = '';
    const domain = url.substring(url.lastIndexOf('www.') + 4, url.lastIndexOf('.com'));
    let infoObj = {};
    infoObj.url = url;
    const resultUrl = infoObj.url
    try {
        if (domain === 'bbc') {
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            infoObj.headline = await $('h1[class=story-body__h1]').text().trim();
            infoObj.textLength = await $('.story-body__inner').text().length
            infoObj.text = await $('.story-body__inner').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            resultString = infoObj.text;
        } else if (domain === 'foxnews') {
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            infoObj.headline = await $('.headline').text().trim();
            infoObj.textLength = await $('.article-body').text().length
            infoObj.text = await $('.article-body').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            resultString = infoObj.text;
        } else if (domain === 'wsj') {
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            infoObj.headline = await $('h1[class=wsj-article-headline]').text().trim();
            infoObj.textLength = await $('.wsj-snippet-body').text().length
            infoObj.text = await $('.wsj-snippet-body').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            resultString = infoObj.text;
        } else if (domain === 'cnn') {
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            infoObj.headline = await $('h1[class=pg-headline]').text().trim();
            infoObj.textLength = await $('.l-container').text().length
            infoObj.text = await $('.l-container').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            resultString = infoObj.text;
        } else if (domain === 'chicagotribune') {
            const article = await axios.get(url)
            const $ = await cheerio.load(article.data)
            infoObj.headline = await $('h1[class=pg-headline]').text().trim();
            infoObj.textLength = await $('.trb_ar_bd').text().length
            infoObj.text = await $('.trb_ar_bd').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
            resultString = infoObj.text;
        } else if (domain === 'nytimes') {
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
    }

    catch (err) {
        console.log('ERROR', err)
    }

    finally {
        var toneAnalyzer = new ToneAnalyzerV3(process.env.TONE);
        toneAnalyzer.tone(

            {
                tone_input: resultString,
                content_type: 'text/plain',
                sentences: false
            },
            function (err, tone) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(JSON.stringify(tone, null, 2));
                }
            }
        );

        //----------------------------------------------------------------
        var nlu = new NaturalLanguageUnderstandingV1(process.env.NLU)
        nlu.analyze(
            {
                url: resultUrl, // Buffer or String
                features: {
                    "metadata": {
                    },
                    "keywords": {
                        "sentiment": true,
                        "emotion": true,
                        limit: 10
                    },
                    "emotion": {
                        document: true
                    },
                    "sentiment": {
                        document: true
                    }
                }
            },
            function (err, response) {
                if (err) {
                    console.log('error:', err);
                } else {
                    console.log(JSON.stringify(response, null, 2));
                }
            }
        );

    }
}
masterArticleScrapper(url)
module.exports = masterArticleScrapper