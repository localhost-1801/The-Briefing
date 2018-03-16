const router = require('express').Router()
const masterArticleScrapper = require('../../scrappers/masterScrapper.js');

router.get('/*', (req, res, next) => {
    //console.log('WE ARE IN API', req.params[0])
    masterArticleScrapper(req.params[0])
        .then(JSONData => res.json(JSONData))
        .catch(next)
})
module.exports = router;