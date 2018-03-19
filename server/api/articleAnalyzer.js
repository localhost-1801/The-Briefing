const router = require('express').Router()
const masterArticleScrapper = require('../../scrappers/masterScrapper.js');
const db = require('../db/firestore')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.NEWS_KEY)

// 
router.get('/related/url/*', (req, res, next) => {
    const query = db.collection('articles').where('info.parent', '==', req.params[0])
    const related = [];
    query.get().then(docu => {
        docu.forEach(d => {
            console.log('beep')
            related.push(d.data())
            // return d.data()
        })
        res.send(related)
    })
    
})

router.post('/related', (req, res, next) => {
    let counter = 0;
    const keywords = req.body.keywords
    const parentUrl = req.body.url
    console.log('in api');
    newsapi.v2.everything({
        sources: 'the-new-york-times,bbc-news,cnn,the-wall-street-journal',
        q: keywords.slice(0,3).join(' '),
        language: 'en',
        // country: 'us'
      }).then(response => {
          console.log('where are we?')
          //masterArticle
        const articlesArray = [];
        response.articles.forEach(article => {
            masterArticleScrapper(article.url, parentUrl)
            .then(nothing => {
                console.log('in masterarticle .then')
                const articles = db.collection('articles').where('info.url', '==', article.url)
                const observer = articles.onSnapshot(docSnap => {
                    docSnap.forEach(docu => {
                        //Note that this is continually pushing things into an array on memory and could potentially cause problems
                        if (articlesArray.length < response.articles.length){
                            articlesArray.push(docu.data())
                        }
                    }) 
                    if (articlesArray.length === response.articles.length && counter < 1){
                        console.log(articlesArray, response.articles)
                        ++counter
                        res.send(articlesArray)
                    }
                })
  
            })
       
            // .catch(next)        
        })
     
        
      })

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