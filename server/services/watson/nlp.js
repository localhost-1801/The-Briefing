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
            this.nluParameters.text = text
            this.toneParamaters.tone_input = text
            const nluResults = await nlu.analyzeAsync(this.nluParameters)
            const toneResults = await toneAnalyzer.toneAsync(this.toneParamaters)
            nluResults.keywords.forEach(keyword => {
            })
            const data = {
                tone: toneResults,
                nlu: nluResults
            }
            return data
        }
    }
}

 module.exports = NLP
// NLP.prototype.tone = function (text) {
//     this.text = text
//     // this.url = url
//     return nlu.analyzeAsync(this.text)
// }
// const text = `BEIRUT, Lebanon — A new United Nations resolution demanding a cease-fire across Syria appeared to have little effect on Sunday, as Syrian government forces began new ground attacks against a rebel-held enclave east of Damascus, the capital, and continued aerial bombings that have killed more than 500 people there in the past week.There were reports Sunday evening of a suspected chlorine attack, with one child killed in eastern Ghouta and 11 people suffering symptoms like labored breathing, according to medical staff supported by the Syrian American Medical Society.The unabated violence was disappointing after days of haggling over the wording of the Security Council resolution, which passed Saturday with the approval of both Russia, which backs the Syrian government, and the United States, which opposes it.“Actually there is no cease-fire at all,” Firas Abdullah, an anti-government activist in eastern Ghouta, said via internet chat. “Assad airplanes and Russian airplanes are still hitting the cities of eastern Ghouta. Now while I am talking, there is a helicopter from the Assad army, just flying above us.”In the early morning hours, residents in the rebel-held area and in government-held Damascus reported a few hours of relative calm. But within hours, pro-government forces tried to push into the enclave from two directions, and government airstrikes resumed. Rebel mortar shells also fell on Damascus.In one hospital in Ghouta, a mother wept as a nurse tended her small son, severely injured and dying, on a gurney next to two other dead or dying children, a Tweety Bird decal on the wall behind them.“He always told me he wants to die and go to heaven because there is food there,” she said. “He’s only a child, enough is enough, God.”A nurse, who had kept her hand on the child’s chest, finally escorted the mother to a chair in the hallway. Then the nurse crouched down in the fetal position and wept.The cease-fire had several loopholes. It had no specific start time, only “without delay,” and like previous agreements, excluded groups designated as terrorists like the Qaeda-linked Levant Liberation Committee, which has a small presence in Ghouta. The Army of Islam, the main insurgent group in Ghouta, called on the United Nations to broker the departure of the Qaeda group, known by its Arabic initials, H.T.S.“The presence of H.T.S. elements in the outskirts of one of the towns in Ghouta is not an excuse for burning all of al-Ghouta and killing of 400,000 citizens,” Mohammad Alloush, the spokesman for the Army of Islam, said on Twitter. “And these elements are ready to get out to stop the bloodshed of civilians in Ghouta, but the regime is still hindering their exit.”Previous cease-fires, like ones in the northern city of Aleppo, have foundered on this issue: The opposition says the government and its ally Russia bomb wherever they like, asserting that Qaeda is present, while the government says the non-Qaeda rebels are de facto allied with the group.Eastern Ghouta has been surrounded and besieged for years. The main rebel groups there, numbering in the tens of thousands, are the Army of Islam, an Islamist group, and its rival, Faylaq al-Sham, which brands itself as part of the Free Syrian Army. Both groups have shown willingness to participate in negotiations, and Russia and the government have dealt with their representatives in talks in Astana, Kazakhstan.Smaller numbers of fighters, numbering in the hundreds, are affiliated with Ahrar al-Sham, a more hard-line Islamist group, and the H.T.S., the Qaeda-linked group.Mr. Alloush said in an interview that he was calling for the U.N. to broker the departure of the H.T.S. fighters, saying they were ready to leave.“We want to remove this excuse” for bombing the area, he added. “The Russians are trying to repeat Aleppo.”But another resident, Salam al Ghoutaimi, said he doubted that the H.T.S. fighters, who he said numbered 400, would leave quietly, and that Russia was putting the ball in the court of the two main opposition factions to see if it would force them out. “I think the factions will be fighting each other,” he said. “The siege will continue.”`

// const test = new NLP

// test.analyze(text)
// .then(result => {
//     console.log(result)
// })
// test.tone()
// console.log(test.analyze(text))
// console.log(test)
