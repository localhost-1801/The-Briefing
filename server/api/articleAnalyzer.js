const router = require('express').Router()
const masterArticleScraper = require('../../scrapers/masterScraper.js');
const db = require('../db/firestore')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.NEWS_KEY)
const secrets = require('../../secrets')
const NLP = require('../services/watson/nlp');
const Tweet = require('../services/twitter/twitter')
const nlp = new NLP
const tweet = new Tweet

const Promise = require('bluebird')

router.get('/related/url/*', (req, res, next) => {
    const query = db.collection('articles').where('info.parent', '==', req.params[0])
    const related = [];
    query.get().then(docu => {
        docu.forEach(d => {
            related.push(d.data())
        })
        res.send(related)
    })

})

router.get('/stateData', (req, res, next) => {
    const query = db.collection('stateData')
    const stateData = [];
    query.get().then(docu => {
        docu.forEach(d => {
            stateData.push(d.data())
        })
        res.send(stateData)
    })
})

router.get('/landing', (req, res, next) => {
    let allLandingPageArticles = db.collection('landingArticles')
    const allLandingrticles = [];
    allLandingPageArticles.get().then(docu => {
        docu.forEach(d => {
            allLandingrticles.push(d.data())
        })
        res.send(allLandingrticles)
    })
})

router.post('/url/*', async (req, res, next) => {
    const scrapeObj = await masterArticleScraper(req.params[0]);
    if (scrapeObj.flag) {
        res.send({ message: 'Could not process this article. Please try another link.' })
    } else {
        const nlpResults = await nlp.analyze(scrapeObj.text);
        nlpResults.info = scrapeObj
        const data = nlpResults
        data.info = scrapeObj
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
    }

})

router.get('/url/*', (req, res, next) => {
    let articleRef = db.collection('articles')
    articleRef.where('info.url', '==', req.params[0]).get().then(docu => {
        docu.forEach(d => {
            const data = d.data()
            res.send(data)
        })
    })

})

module.exports = router;

router.post('/related', async (req, res, next) => {
    const keywords = req.body.keywords
    const parentUrl = req.body.url
    const query = keywords;
    const newsResults = await newsapi.v2.everything({
        sources: 'the-new-york-times, bbc-news',
        q: query,
        language: 'en',
    })
    const promiseArray = await newsResults.articles.map(async (article) => {
        const scrapeObj = await masterArticleScraper(article.url, parentUrl);
        if (article.url.includes('bbc') && parentUrl.includes('bbc')){
            article.url = article.url.replace('bbc.co.uk', 'bbc.com')
        }
        if (!scrapeObj.flag) {
            const nlpResults = await nlp.analyze(scrapeObj.text);
            nlpResults.info = scrapeObj

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
            res.send(results.filter(element => element !== undefined));
        })
    if (parentUrl) {
        infoObj.parent = parentUrl;
    }
    data = { tone: tone, emotion: response, info: infoObj }
    db.collection('articles').doc(infoObj.headline).update(data).then(() => {
    }).catch(err => {
        if(err){
            console.log('Error: ', err)
        }
        db.collection('articles').doc(infoObj.headline).set(data)
    })
})



