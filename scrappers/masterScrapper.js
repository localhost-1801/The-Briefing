//from https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
const cheerio = require('cheerio');
const axios = require('axios');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const secrets = require('../secrets')
const Promise = require('bluebird')
const db = require('../server/db/firestore')



var toneAnalyzer = new ToneAnalyzerV3({
    username: process.env.TONE_USERNAME,
    password: process.env.TONE_PW,
    version: '2016-05-19',
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
});
var nlu = new NaturalLanguageUnderstandingV1({
    username: process.env.NLU_USERNAME,
    password: process.env.NLU_PW,
    version: '2017-02-27',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});
toneAnalyzer.tone = Promise.promisify(toneAnalyzer.tone)

// const Firestore = require('@google-cloud/firestore');

// const firestore = new Firestore({
//     projectId: process.env.FIRESTORE_PROJECT_ID,
//     keyFilename: '../googleKey.json'
// });
// const articlesRef = firestore.collection('articles');
// const document = firestore.doc('/articles')
// document.set({
//     title: 'hello',
//     body: 'world'
// }).then(() => { console.log('successful')})
// articlesRef.get().then(docs => {
//     console.log(docs)
// })


const data = {
    title: 'hello'
}
//  db.collection('articles').doc('Thing').set(data).then(()=> {
//      console.log('created')
//  })

// const url = 'http://www.bbc.com/news/world-us-canada-43402077';
// const url = 'https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7';
//const url = 'https://www.cnn.com/2018/03/14/us/students-who-did-not-walkout-trnd/index.html';
//const url = 'http://www.chicagotribune.com/news/local/breaking/ct-met-school-walkouts-gun-reform-20180313-story.html';
//const url = 'http://www.foxnews.com/world/2018/03/14/23-russian-diplomats-to-be-expelled-from-britain-amid-probe-into-ex-spys-poisoning.html';
// const url = 'https://www.nytimes.com/2018/03/14/world/europe/uk-russia-spy-punitive-measures.html';
// const url = 'https://www.wsj.com/articles/sec-charges-theranos-and-founder-elizabeth-holmes-with-fraud-1521045648';
const url = 'https://politics.theonion.com/rex-tillerson-shoots-mike-pompeo-quick-email-explaining-1823738923'

async function masterArticleScrapper(url) {
    let resultString = '';
    const domain = url.substring(url.lastIndexOf('www.') + 4, url.lastIndexOf('.com'));
    let infoObj = {};
    infoObj.url = url;
    const resultUrl = infoObj.url
    const resultObject = {}
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
        // var toneAnalyzer = new ToneAnalyzerV3(process.env.TONE);
        // var toneAnalyzer = new ToneAnalyzerV3({
        //     username: process.env.TONE_USERNAME,
        //     password: process.env.TONE_PW,
        //     version: '2016-05-19',
        //     url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
        // });
        var nlu = new NaturalLanguageUnderstandingV1({
            username: process.env.NLU_USERNAME,
            password: process.env.NLU_PW,
            version: '2017-02-27',
            url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
        });
        let obj = {}
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
//                     resultObject.tone = tone
                    // JSON.stringify(tone, null, 2);
//                     // console.log('TONE', resultObject.tone )
//                 }
//             }
//         );

        //----------------------------------------------------------------

                    // console.log(JSON.stringify(tone, null, 2));
                    console.log('tone done')
                    db.collection('articles').doc(infoObj.headline).update({ tone: tone }).then((err) => {
                        console.log('created tone')

                    }).catch(err => {
                        console.log('can we label it', infoObj.headline)
                        obj.tone = tone
                        db.collection('articles').doc(infoObj.headline).set({ tone })
                    })
                }
            }
        )
        //---------------------------------------------------------------   
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

//                     resultObject.nlu = response
                    // JSON.stringify(response, null, 2);
                    // console.log('NLU', resultObject.nlu )
                    // console.log(JSON.stringify(response, null, 2));
                    console.log('nlu done')
                    db.collection('articles').doc(infoObj.headline).update({ emotion: response }).then(() => {
                        console.log('created emotion')
                    }).catch(err => {
                        db.collection('articles').doc(infoObj.headline).set({ emotion: response })
                    })
                }
//                 console.log('RESULT OBJECt', resultObject.nlu)
//                 console.log('RESULT OBJECT TONE DFGDFGDG',resultObject.tone)
//                 return resultObject
            }
        );
        db.collection('articles').doc(infoObj.headline).update({ info: infoObj }).then(() => {
            console.log('created')
        }).catch(err => {
            db.collection('articles').doc(infoObj.headline).set({ info: infoObj })
        })
    }

}
// masterArticleScrapper(url)
module.exports = masterArticleScrapper