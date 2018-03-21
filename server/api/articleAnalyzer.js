const router = require('express').Router()
const masterArticleScrapper = require('../../scrappers/masterScrapper.js');
const db = require('../db/firestore')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.NEWS_KEY)
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const secrets = require('../../secrets')
const NLP = require('../services/watson/nlp');
const Tweet = require('../services/twitter/twitter')
const nlp = new NLP
const tweet = new Tweet

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

//api/article/related/url/
router.get('/related/url/*', (req, res, next) => {
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

router.post('/related', async (req, res, next) => {
    const keywords = req.body.keywords
    // console.log(keywords)
    const parentUrl = req.body.url
    const query = keywords.slice(0, 3).join(' ')
    console.log(query)
    const newsResults = await newsapi.v2.everything({
        sources: 'the-new-york-times, bbc-news',
        q: query,
        language: 'en',
        // country: 'us'
    })
    const promiseArray = newsResults.articles.map(async (article) => {

        const scrapeObj = await masterArticleScrapper(article.url, parentUrl );
        if (scrapeObj.text !== 0){
            const nlpResults = await nlp.analyze(scrapeObj.text);
            nlpResults.info = scrapeObj
            
            //Add document to Firestore
            const documentSnap = await db.collection('articles').doc(scrapeObj.headline.replace(/,/ig, ' ')).get()
            if (documentSnap.data() === undefined) {
                const documentCreate = await db.collection('articles').doc(scrapeObj.headline.replace(/,/ig, ' ')).set(nlpResults)
            } else {
                const documentUpdate = await db.collection('articles').doc(scrapeObj.headline.replace(/,/ig, ' ')).update(nlpResults)
            }
            return nlpResults 
        }
    })
    Promise.all(promiseArray)
        .then(results => {
            console.log('IN API SEND HELP', results.length)
            res.send(results)
        })
    // res.send(articleArray)
})
router.post('/url/*', async (req, res, next) => {
    const scrapeObj = await masterArticleScrapper(req.params[0]);
    const nlpResults = await nlp.analyze(scrapeObj.text);
    nlpResults.info = scrapeObj
    const data = nlpResults
    data.info = scrapeObj
    // Add document to Firestore
    const query = nlpResults.nlu.entities[0].text
    const tweets = await tweet.query(query)
    data.tweets = tweets
    const documentSnap = await db.collection('articles').doc(scrapeObj.headline.replace(/,/ig, ' ')).get()
    if (documentSnap.data() === undefined) {
        const documentCreate = await db.collection('articles').doc(scrapeObj.headline.replace(/,/ig, ' ')).set(data)
    } else {
        const documentUpdate = await db.collection('articles').doc(scrapeObj.headline.replace(/,/ig, ' ')).update(data)
    }
    res.send(data)
})
router.get('/url/*', (req, res, next) => {
    // console.log('hello')
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
