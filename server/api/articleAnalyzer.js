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
        const articlesArray = [];
        response.articles.forEach(article => {
            masterArticleScrapper(article.url, parentUrl)
            .then(nothing => {
                console.log('in masterarticle .then')
                const articles = db.collection('articles').where('info.url', '==', article.url)
                const observer = articles.onSnapshot(docSnap => {
                    docSnap.forEach(docu => {
                        articlesArray.push(docu.data())
                    })
                    console.log('all the articles', articlesArray.length);
                    
                })
            })
            .catch(next)        
        })
        res.send(articlesArray)
      });
})
router.post('/url/*', (req, res, next) => {
    //console.log('WE ARE IN API', req.params[0])
    const articles = db.collection('articles').where('info.url', '==', req.params[0])
    let send = true;
    
    masterArticleScrapper(req.params[0])
        .then(nothing => {
            const observer = articles.onSnapshot(docSnap => {
                docSnap.forEach(docu => {
                    if (send) {
                        console.log('how many times we getting hit boy', send)
                        res.send(docu.data());
                        send = !send
                        //it is because we are in the observer snapshot function
                    }
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