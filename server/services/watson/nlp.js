var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const secrets = require('../../../secrets')


const Promise = require('bluebird')
var toneAnalyzer = new ToneAnalyzerV3({
    username: process.env.TONE_USERNAME,
    password: process.env.TONE_PW,
    version: '2016-05-19',
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
});
toneAnalyzer.toneAsync = Promise.promisify(toneAnalyzer.tone)

var nlu = new NaturalLanguageUnderstandingV1({
    username: process.env.NLU_USERNAME,
    password: process.env.NLU_PW,
    version: '2017-02-27',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});
nlu.analyzeAsync = Promise.promisify(nlu.analyze)

function NLP() {
    return {
        url: null,
        text: null,
        toneParamaters: {
            tone_input: this.text,
            content_type: 'text/plain',
            sentences: false
        },
        nluParameters: {
            text: this.text, // Buffer or String
            features: {
                categories: {},
                entities: {
                    limit: 5
                },
                keywords: {
                    sentiment: true,
                    emotion: true,
                    limit: 10
                },
                emotion: {
                    document: true
                },
                sentiment: {
                    document: true
                }
            }
        },
        analyze: async function (text){
            const data = {flag: false}
            if (text.length === 0){
                data.flag = true
                return data
            }
            this.nluParameters.text = text
            this.toneParamaters.tone_input = text
            const nluResults = await nlu.analyzeAsync(this.nluParameters)
            const toneResults = await toneAnalyzer.toneAsync(this.toneParamaters)
            const keywordArray = [];
            nluResults.keywords.forEach((keyword) => {
                if (!keyword.text.match(/[^ a-zA-Z.'"]/) && !keyword.text.match(/ {2,}/ig) && !keyword.text.match(/\.[^ ]/ig)  && !keyword.text.match(/[a-z][A-Z]/g) ){
                    keyword.text = keyword.text.replace(/[^ a-zA-Z]/ig, ' ').replace(/ {2,}/ig, ' ')
                    keywordArray.push(keyword)
                  }
            })
            nluResults.keywords = keywordArray
            data.tone = toneResults
            data.nlu = nluResults
            return data
        }
    }
}

 module.exports = NLP
