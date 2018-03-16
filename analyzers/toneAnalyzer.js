//import masterArticleScrapper from '../scrappers/masterScrapper.js';
const masterArticleScrapper = require('../scrappers/masterScrapper.js')

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const url = 'http://www.bbc.com/news/world-us-canada-43402077'
//const url = 'http://www.foxnews.com/world/2018/03/14/23-russian-diplomats-to-be-expelled-from-britain-amid-probe-into-ex-spys-poisoning.html';


//const object = await masterArticleScrapper(url);
const test = async () => {
    const object = await masterArticleScrapper(url)
    return object
}
//console.log('LOGsdfsdfsdfsfsd LOG', test());
let testresults = test();
console.log(testresults)
//console.log('LOG LOG LOG', test().then(result => result));

// const wrapper = 

var toneAnalyzer = new ToneAnalyzerV3({
    "url": "https://gateway.watsonplatform.net/tone-analyzer/api",
    "username": process.env.TONE_USERNAME,
    "password": process.env.TONE_PW,
    version: '2017-09-21',
    sentences: false
});

// toneAnalyzer.tone(

//     {
//         tone_input: test(),
//         content_type: 'text/plain'
//     },
//     function (err, tone) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(JSON.stringify(tone, null, 2));
//         }
//     }
// );

///home/warren/Fullstack Academy/Headlines/scrappers/masterScrapper.js