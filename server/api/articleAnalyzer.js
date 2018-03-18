const router = require('express').Router()
const masterArticleScrapper = require('../../scrappers/masterScrapper.js');
const db = require('../db/firestore')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.NEWS_KEY)

// 
router.post('/related', (req, res, next) => {
    const keywords = req.body.keywords
    const parentUrl = req.body.url
    console.log('in api');
    newsapi.v2.everything({
        sources: 'the-new-york-times',
        q: keywords.slice(0,3).join(' '),
        language: 'en',
        // country: 'us'
      }).then(response => {
          console.log('where are we?', response)
          //masterArticle
        const articles = [];
        response.articles.forEach(article => {
            masterArticleScrapper(req.params[0])
            .then(nothing => {
                console.log('in masterarticle .then')
                const observer = articles.onSnapshot(docSnap => {
                    docSnap.forEach(docu => {
                        articles.push(docu.data())
                    })
                    console.log('all the articles', articles);
                    res.send(articles)
                })
            })
            .catch(next)        })
      });
})
router.post('/url/*', (req, res, next) => {
    //console.log('WE ARE IN API', req.params[0])
    const articles = db.collection('articles').where('info.url', '==', req.params[0])
    masterArticleScrapper(req.params[0])
        .then(nothing => {
            const observer = articles.onSnapshot(docSnap => {
                docSnap.forEach(docu => {
                    res.send(docu.data());
                })
            })
        })
        .catch(next)
})
router.get('/url/*', (req, res, next) => {
    console.log('hello')
    let articleRef = db.collection('articles').where('info.url', '==', req.params[0])
    articleRef.get().then(docu => {
        docu.forEach(d => {
            // console.log(d.data())
            // console.log(d.data().emotion.keywords)
            const data = d.data()
            res.send(data)
            // const keywords = data.emotion.keywords.map(obj => {
            //     return obj.text
            // })
            // console.log(keywords)
        })
    })

})
module.exports = router;