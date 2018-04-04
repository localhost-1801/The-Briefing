const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const dbFirestore = require('./db/firestore')
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
const masterArticleScrapper = require('./../scrapers/masterScraper')
const secrets = require('../secrets')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.NEWS_KEY)
const NLP = require('./services/watson/nlp');
const nlp = new NLP
const Promise = require('bluebird')


if (process.env.NODE_ENV !== 'production') require('../secrets')

  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())


  // api routes
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })

  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
  })

  const io = socketio(server)
  require('./socket')(io)


// const createLanding = async () => {
//   const collection = await dbFirestore.collection('landingArticles')
//   const deleted = await dbFirestore.dropTable(dbFirestore, 'landingArticles')
//
//
//   const otherCollection = await dbFirestore.collection('stateData')
//   const otherDeleted = await dbFirestore.dropTable(dbFirestore, 'stateData')
//
//
//   const newsResult = await newsapi.v2.topHeadlines({
//     sources: 'bbc-news,the-new-york-times,fox-news,the-wall-street-journal,the-washington-post',
//     pageSize: 100
//   })
//
//   const promiseLandingArray = await newsResult.articles.map(async (article) => {
//
//     const scrapeObj2 = await masterArticleScrapper(article.url)
//     if (!scrapeObj2.flag) {
//       const nlpResults2 = await nlp.analyze(scrapeObj2.text);
//       nlpResults2.info = scrapeObj2
//
//       const documentSnap = await dbFirestore.collection('landingArticles').doc(scrapeObj2.headline.replace(/,/ig, ' ')).get()
//       if (documentSnap.data() === undefined) {
//         const documentCreate = await dbFirestore.collection('landingArticles').doc(scrapeObj2.headline.replace(/,/ig, ' ')).set(nlpResults2)
//       } else {
//         const documentUpdate = await dbFirestore.collection('landingArticles').doc(scrapeObj2.headline.replace(/,/ig, ' ')).update(nlpResults2)
//       }
//       return nlpResults2
//     }
//   })
//   console.log('Creating - Landing Page Articles have been created and added to Firestore')
// }

// const heatMapData = async () => {
//   var nowDate = new Date();
//   var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
//
//   let statesData = [
//     { 'regionName': 'Alabama', 'code': 'AL', 'value': 0 },
//     { 'regionName': 'Alaska', 'code': 'AK', 'value': 0 },
//     { 'regionName': 'Arizona', 'code': 'AZ', 'value': 0 },
//     { 'regionName': 'Arkansas', 'code': 'AR', 'value': 0 },
//     { 'regionName': 'California', 'code': 'CA', 'value': 0 },
//     { 'regionName': 'Colorado', 'code': 'CO', 'value': 0 },
//     { 'regionName': 'Connecticut', 'code': 'CT', 'value': 0 },
//     { 'regionName': 'Delaware', 'code': 'DE', 'value': 0 },
//     { 'regionName': 'District of Columbia', 'code': 'DC', 'value': 0 },
//     { 'regionName': 'Florida', 'code': 'FL', 'value': 0 },
//     { 'regionName': 'Georgia', 'code': 'GA', 'value': 0 },
//     { 'regionName': 'Hawaii', 'code': 'HI', 'value': 0 },
//     { 'regionName': 'Idaho', 'code': 'ID', 'value': 0 },
//     { 'regionName': 'Illinois', 'code': 'IL', 'value': 0 },
//     { 'regionName': 'Indiana', 'code': 'IN', 'value': 0 },
//     { 'regionName': 'Iowa', 'code': 'IA', 'value': 0 },
//     { 'regionName': 'Kansas', 'code': 'KS', 'value': 0 },
//     { 'regionName': 'Kentucky', 'code': 'KY', 'value': 0 },
//     { 'regionName': 'Lousiana', 'code': 'LA', 'value': 0 },
//     { 'regionName': 'Maine', 'code': 'ME', 'value': 0 },
//     { 'regionName': 'Maryland', 'code': 'MD', 'value': 0 },
//     { 'regionName': 'Massachusetts', 'code': 'MA', 'value': 0 },
//     { 'regionName': 'Michigan', 'code': 'MI', 'value': 0 },
//     { 'regionName': 'Minnesota', 'code': 'MN', 'value': 0 },
//     { 'regionName': 'Mississippi', 'code': 'MS', 'value': 0 },
//     { 'regionName': 'Missouri', 'code': 'MO', 'value': 0 },
//     { 'regionName': 'Montana', 'code': 'MT', 'value': 0 },
//     { 'regionName': 'Nebraska', 'code': 'NE', 'value': 0 },
//     { 'regionName': 'Nevada', 'code': 'NV', 'value': 0 },
//     { 'regionName': 'New Hampshire', 'code': 'NH', 'value': 0 },
//     { 'regionName': 'New Jersey', 'code': 'NJ', 'value': 0 },
//     { 'regionName': 'New Mexico', 'code': 'NM', 'value': 0 },
//     { 'regionName': 'New York', 'code': 'NY', 'value': 0 },
//     { 'regionName': 'North Carolina', 'code': 'NC', 'value': 0 },
//     { 'regionName': 'North Dakota', 'code': 'ND', 'value': 0 },
//     { 'regionName': 'Ohio', 'code': 'OH', 'value': 0 },
//     { 'regionName': 'Oklahoma', 'code': 'OK', 'value': 0 },
//     { 'regionName': 'Oregon', 'code': 'OR', 'value': 0 },
//     { 'regionName': 'Pennsylvania', 'code': 'PA', 'value': 0 },
//     { 'regionName': 'Rhode Island', 'code': 'RI', 'value': 0 },
//     { 'regionName': 'South Carolina', 'code': 'SC', 'value': 0 },
//     { 'regionName': 'South Dakota', 'code': 'SD', 'value': 0 },
//     { 'regionName': 'Tennessee', 'code': 'TN', 'value': 0 },
//     { 'regionName': 'Texas', 'code': 'TX', 'value': 0 },
//     { 'regionName': 'Utah', 'code': 'UT', 'value': 0 },
//     { 'regionName': 'Vermont', 'code': 'VT', 'value': 0 },
//     { 'regionName': 'Virginia', 'code': 'VA', 'value': 0 },
//     { 'regionName': 'Washington', 'code': 'WA', 'value': 0 },
//     { 'regionName': 'West Virginia', 'code': 'WV', 'value': 0 },
//     { 'regionName': 'Wisconsin', 'code': 'WI', 'value': 0 },
//     { 'regionName': 'Wyoming', 'code': 'WY', 'value': 0 }
//   ]
//
//   let promiseStateData = await statesData.map(async (state) => {
//     const newsResultByState = await newsapi.v2.everything({
//       sources: 'bbc-news,the-new-york-times,fox-news,the-wall-street-journal,the-washington-post',
//       pageSize: 100,
//       q: state.regionName,
//       from: date,
//       to: date
//     })
//     let stateData = { 'regionName': state.regionName, 'code': state.code, 'value': newsResultByState.totalResults };
//     const documentSnap = await dbFirestore.collection('stateData').doc(stateData.regionName).get()
//     if (documentSnap.data() === undefined) {
//       const documentCreate = await dbFirestore.collection('stateData').doc().set(stateData)
//     } else {
//       const documentCreate = await dbFirestore.collection('stateData').doc().update(stateData)
//     }
//     return stateData
//   })
//   Promise.all(promiseStateData)
// }
// setInterval(async () => {
//   await createLanding()
//   await heatMapData();
// }, 86400000)


module.exports = app
