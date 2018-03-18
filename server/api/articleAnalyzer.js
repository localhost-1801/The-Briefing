const router = require('express').Router()
const masterArticleScrapper = require('../../scrappers/masterScrapper.js');
const db = require('../db/firestore')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.NEWS_KEY)

// 
router.post('/related', (req, res, next) => {
    const keywords = req.body.keywords
    const parentUrl = req.body.url
    newsapi.v2.everything({
        sources: 'bbc-news,the-new-york-times',
        q: keywords.join(' '),
        language: 'en',
        page: 2
        // country: 'us'
      }).then(response => {
          //masterArticle
        response.articles.forEach(article => {
            masterArticleScrapper(article.url, parentUrl)
        })
        console.log(response.articles.length);
      });
})
router.post('/url/*', (req, res, next) => {
    //console.log('WE ARE IN API', req.params[0])
    masterArticleScrapper(req.params[0])
        .then(JSONData => res.json(req.params[0]))
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