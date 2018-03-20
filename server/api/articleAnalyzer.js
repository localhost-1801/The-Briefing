/**
 * REVIEW This file should probably be called `articles` to match the mount point
 *        in your API
 */

const router = require('express').Router()
const masterArticleScrapper = require('../../scrappers/masterScrapper.js');
const db = require('../db/firestore')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.NEWS_KEY)
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const secrets = require('../../secrets')
const NLP = require('../services/watson/nlp');
const nlp = new NLP

const Promise = require('bluebird')
// var toneAnalyzer = new ToneAnalyzerV3({
//     username: process.env.TONE_USERNAME,
//     password: process.env.TONE_PW,
//     version: '2016-05-19',
//     url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
// });
// toneAnalyzer.toneAsync = Promise.promisify(toneAnalyzer.tone)

// var nlu = new NaturalLanguageUnderstandingV1({
//     username: process.env.NLU_USERNAME,
//     password: process.env.NLU_PW,
//     version: '2017-02-27',
//     url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
// });
// nlu.analyzeAsync = Promise.promisify(nlu.analyze)

// GET /articles/:id/related
// GET /articles?relatedTo=<url>
router.get('/related/url/*', (req, res, next) => {
    // REVIEW - What's going on here with info.parent? What is your storage schema?
    const query = db.collection('articles').where('info.parent', '==', req.params[0])
    const related = [];
    query.get().then(docu => {
        docu.forEach(d => {
            related.push(d.data())
            // return d.data()
        })
        res.send(related)
    })

})

/**
 * REVIEW - What's going on here?
 */
router.post('/related', async (req, res, next) => {
    const keywords = req.body.keywords
    const parentUrl = req.body.url
    const newsResults = await newsapi.v2.everything({
        sources: 'the-new-york-times,bbc-news,cnn,the-wall-street-journal',
        q: keywords.slice(0, 3).join(' '),
        language: 'en',
        // country: 'us'
    })
    const promiseArray = newsResults.articles.map(async (article) => {

        const scrapeObj = await masterArticleScrapper(article.url, parentUrl );
        const nlpResults = await nlp.analyze(scrapeObj.text.slice(0, 500));
        nlpResults.info = scrapeObj

        //Add document to Firestore
        const documentSnap = await db.collection('articles').doc(scrapeObj.headline).get()
        if (documentSnap.data() === undefined) {
            const documentCreate = await db.collection('articles').doc(scrapeObj.headline).set(nlpResults)
        } else {
            const documentUpdate = await db.collection('articles').doc(scrapeObj.headline).update(nlpResults)
        }
        return nlpResults
    })
    Promise.all(promiseArray)
        .then(results => {
            // console.log(results)
            res.send(results)
        })
    // res.send(articleArray)
})
router.post('/url/*', async (req, res, next) => {
    const scrapeObj = await masterArticleScrapper(req.params[0]);
    const nlpResults = await nlp.analyze(scrapeObj.text);
    nlpResults.info = scrapeObj

    //Add document to Firestore
    // REVIEW - Probaby safer to check by URL, rather than headline. Headlines get updated,
    //          URLs usually don't
    const documentSnap = await db.collection('articles').doc(scrapeObj.headline).get()
    if (documentSnap.data() === undefined) {
        const documentCreate = await db.collection('articles').doc(scrapeObj.headline).set(nlpResults)
    } else {
        const documentUpdate = await db.collection('articles').doc(scrapeObj.headline).update(nlpResults)
    }
    res.send(nlpResults)
})
router.get('/url/*', (req, res, next) => {
    console.log('hello')
    let articleRef = db.collection('articles').where('info.url', '==', req.params[0])
    articleRef.get().then(docu => {
        docu.forEach(d => {
            const data = d.data()
            res.send(data)
        })
    })

})
module.exports = router;



    // if (parentUrl) {
    //     infoObj.parent = parentUrl;
    // }
    // data = { tone: tone, emotion: response, info: infoObj }
    // db.collection('articles').doc(infoObj.headline).update(data).then(() => {
    //     console.log('updated')

    // }).catch(err => {
    //     console.log('', infoObj.headline)
    //     db.collection('articles').doc(infoObj.headline).set(data)
