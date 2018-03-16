const router = require('express').Router()
const masterArticleScrapper = require('../../scrappers/masterScrapper.js');
const db = require('../db/firestore')


router.post('/*', (req, res, next) => {
    //console.log('WE ARE IN API', req.params[0])
    masterArticleScrapper(req.params[0])
        .then(JSONData => res.json(JSONData))
        .catch(next)
})
router.get('/*', (req, res, next) => {
    console.log('hello')
    let articleRef = db.collection('articles').where('info.url', '==', req.params[0])
    articleRef.get().then(docu => {
        docu.forEach(d => {
            // console.log(d.data())
            // console.log(d.data().emotion.keywords)
            const data = d.data()
            const keywords = data.emotion.keywords.map(obj => {
                return obj.text
            })
            console.log(keywords)
        })
    })

})
module.exports = router;