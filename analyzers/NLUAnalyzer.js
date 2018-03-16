// import masterScrapper from '../scrappers/masterScrapper.js';

// var fs = require('fs');
// var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

// var nlu = new NaturalLanguageUnderstandingV1({
//     "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
//     "username": process.env.NLU_UNDERSTANDING,
//     "password": process.env.NLU_PW
// });

// nlu.analyze(
//     {
//         html: file_data, // Buffer or String
//         features: {
//             concepts: {},
//             keywords: {}
//         }
//     },
//     function (err, response) {
//         if (err) {
//             console.log('error:', err);
//         } else {
//             console.log(JSON.stringify(response, null, 2));
//         }
//     }
// );