import React, { Component } from 'react';
import { VictoryBar, VictoryStack, VictoryAxis, VictoryLabel } from 'victory';
import { connect } from 'react-redux'
import { fetchArticleData } from '../store/singleArticle'
import { fetchRelatedArticles } from '../store/relatedArticles'

// https://formidable.com/open-source/victory/gallery/stacked-bars-central-axis/

class BarChart extends Component {
    constructor() {
      super();
      this.state = {
        dataA: [
          { x: "Anger", y: 27 },
          { x: "Disgust", y: 40 },
          { x: "Fear", y: 38 },
          { x: "Joy", y: 37 },
          { x: "Sadness", y: 25 },
          { x: "Emotion Tone", y: 19 },
          { x: "Openness", y: 15 },
          { x: "Conscientousness", y: 13 },
          { x: "Extraversion", y: 12 },
          { x: "Agreeableness", y: 15 },
          { x: "Emotional Range", y: 13 }
        ],
        dataB: [
          { x: "Anger", y: 30 },
          { x: "Disgust", y: 4 },
          { x: "Fear", y: 22 },
          { x: "Joy", y: 43 },
          { x: "Sadness", y: 12 },
          { x: "Emotion Tone", y: 44 },
          { x: "Openness", y: 35 },
          { x: "Conscientousness", y: 23 },
          { x: "Extraversion", y: 2 },
          { x: "Agreeableness", y: 40 },
          { x: "Emotional Range", y: 25 }
        ]
      };
      this.parseData = this.parseData.bind(this);
      this.parseDataMultiple = this.parseDataMultiple.bind(this);
    }
    
  shouldComponentUpdate(nextProps, nextState){
    console.log('nextProps',nextProps)
    if(this.props !== nextProps){
      return true
    }
  }
  //change singleArticle to this.props.whatever
  //change aggregateData to this.props.whatever
  componentDidMount(){
    // this.props.loadData('https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html')
    // console.log('props',this.props)
    
  }
  
  parseData(data){
    let resultArr = [];
    
    data.tone_categories.forEach( category => {
      if(category.category_id === 'emotion_tone' || category.category_id === 'social_tone'){
        category.tones.forEach(tone => {
          let resultObj = {}
          resultObj.x = tone.tone_name;
          resultObj.y = Math.floor(tone.score * 100);
          resultArr.push(resultObj)
        })
      }
    })
    return resultArr;
  }
  
  parseDataMultiple(dataArr){
    console.log(dataArr)
    let transitionArr = [];
    let resultArr = [];
    dataArr.forEach(article => {
      let singleArticleInfo = this.parseData(article.tone.document_tone)
      transitionArr.push(singleArticleInfo)
    })
    let resultObj = {}
    transitionArr.forEach( articleArr => {
      articleArr.forEach(emotion => {
        pushIntoResultObj(emotion.x, emotion.y)
      })
    })
    function pushIntoResultObj (name, score) {
      if(!resultObj.hasOwnProperty(name)){
        resultObj[name] = score;
      } else {
        resultObj[name] = ((resultObj[name] + score) / 2);
      }
    }
    Object.keys(resultObj).forEach( key => resultArr.push({
      x: key,
      // y: Math.floor(resultObj[key] * 100)
      y: Math.floor(resultObj[key])
    }))
    return resultArr;
  }

  render(){
    //change what you're feeding into these into props objects
    let singleArticleData = this.parseData(singleArticle.tone.document_tone)
    let aggregateData = this.parseDataMultiple(relatedArticles)
    console.log
    return(
      <div className="chartBackground">
        <svg viewBox="0 0 500 500" width="100%" height="100%">
      >
        <VictoryStack horizontal
          standalone={false}
          /* setting a symmetric domain makes it much easier to center the axis  */
          domain={{ x: [-60, 60] }}
          padding={{ top: 20, bottom: 30, left: 20, right: 20 }}
          height={500}
          width={500}
          style={{ data: { width: 20 }, labels: { fontSize: 11 } }}
        >
          <VictoryBar
            style={{ data: { fill: "tomato" } }}
            data={singleArticleData}
            y={(data) => (-Math.abs(data.y))} // tomato numbers
            labels={(data) => (`${data.x}: ${Math.abs(data.y)}%`)} // number label
          />
          <VictoryBar
            style={{ data: { fill: "orange" } }}
            data={aggregateData}
            labels={(data) => (`${Math.abs(data.y)}%`)} // number
          />
        </VictoryStack>
        <VictoryAxis dependentAxis
        height={500}
        width={500}
        padding={{ top: 30, bottom: 30, left: 20, right: 20 }}
        style={{
          axis: { stroke: "transparent" },
          ticks: { stroke: "transparent" },
          tickLabels: { fontSize: 11, fill: "black" }
        }}
        /*
          Use a custom tickLabelComponent with
          an absolutely positioned x value to position
          your tick labels in the center of the chart. The correct
          y values are still provided by VictoryAxis for each tick
        */
        tickLabelComponent={<VictoryLabel x={250} textAnchor="middle" />}
        tickValues={this.state.dataA.map((point) => point.x).reverse()}
      />
      </svg>
      </div>
    );
  }
}

const mapState = ({ singleArticle, relatedArticles }) => ({ singleArticle, relatedArticles })
const mapDispatch = (dispatch) => {
    return {
        loadData(url) {
            dispatch(fetchArticleData(url))
            dispatch(fetchRelatedArticles(url))
        }
    }
}

let singleArticle = {
  "tone": {
    "document_tone": {
      "tone_categories": [
        {
          "category_name": "Emotion Tone",
          "tones": [
            {
              "tone_id": "anger",
              "score": 0.110374,
              "tone_name": "Anger"
            },
            {
              "score": 0.441499,
              "tone_name": "Disgust",
              "tone_id": "disgust"
            },
            {
              "score": 0.083986,
              "tone_name": "Fear",
              "tone_id": "fear"
            },
            {
              "score": 0.138962,
              "tone_name": "Joy",
              "tone_id": "joy"
            },
            {
              "score": 0.45254,
              "tone_name": "Sadness",
              "tone_id": "sadness"
            }
          ],
          "category_id": "emotion_tone"
        },
        {
          "category_name": "Language Tone",
          "tones": [
            {
              "tone_id": "analytical",
              "score": 0.001259,
              "tone_name": "Analytical"
            },
            {
              "tone_name": "Confident",
              "tone_id": "confident",
              "score": 0
            },
            {
              "score": 0.448741,
              "tone_name": "Tentative",
              "tone_id": "tentative"
            }
          ],
          "category_id": "language_tone"
        },
        {
          "category_name": "Social Tone",
          "tones": [
            {
              "tone_name": "Openness",
              "tone_id": "openness_big5",
              "score": 0.472888
            },
            {
              "score": 0.838567,
              "tone_name": "Conscientiousness",
              "tone_id": "conscientiousness_big5"
            },
            {
              "tone_name": "Extraversion",
              "tone_id": "extraversion_big5",
              "score": 0.928092
            },
            {
              "tone_id": "agreeableness_big5",
              "score": 0.77874,
              "tone_name": "Agreeableness"
            },
            {
              "tone_name": "Emotional Range",
              "tone_id": "emotional_range_big5",
              "score": 0.444064
            }
          ],
          "category_id": "social_tone"
        }
      ]
    }
  },
  "nlu": {
    "emotion": {
      "document": {
        "emotion": {
          "fear": 0.083986,
          "disgust": 0.441499,
          "joy": 0.138962,
          "sadness": 0.45254,
          "anger": 0.110374
        }
      }
    },
    "sentiment": {
      "document": {
        "score": -0.804389,
        "label": "negative"
      }
    },
    "usage": {
      "features": 3,
      "text_characters": 500,
      "text_units": 1
    },
    "keywords": [
      {
        "emotion": {
          "sadness": 0.229812,
          "anger": 0.046586,
          "fear": 0.155446,
          "disgust": 0.340313,
          "joy": 0.230265
        },
        "relevance": 0.951948,
        "text": "opposition Labour Party",
        "sentiment": {
          "label": "neutral",
          "score": 0
        }
      },
      {
        "emotion": {
          "fear": 0.226472,
          "disgust": 0.232288,
          "joy": 0.218812,
          "sadness": 0.306743,
          "anger": 0.078415
        },
        "relevance": 0.943889,
        "text": "Prime Minister Theresa",
        "sentiment": {
          "score": 0,
          "label": "neutral"
        }
      },
      {
        "emotion": {
          "fear": 0.142378,
          "disgust": 0.089759,
          "joy": 0.246608,
          "sadness": 0.503889,
          "anger": 0.031473
        },
        "relevance": 0.765691,
        "text": "Labour lawmakers",
        "sentiment": {
          "score": -0.371827,
          "label": "negative"
        }
      },
      {
        "sentiment": {
          "score": -0.554885,
          "label": "negative"
        },
        "emotion": {
          "sadness": 0.374518,
          "anger": 0.215645,
          "fear": 0.115342,
          "disgust": 0.303757,
          "joy": 0.075195
        },
        "relevance": 0.745865,
        "text": "ambivalent stance"
      },
      {
        "emotion": {
          "anger": 0.215645,
          "fear": 0.115342,
          "disgust": 0.303757,
          "joy": 0.075195,
          "sadness": 0.374518
        },
        "relevance": 0.70661,
        "text": "familiar wounds",
        "sentiment": {
          "label": "negative",
          "score": -0.554885
        }
      },
      {
        "emotion": {
          "fear": 0.087354,
          "disgust": 0.094981,
          "joy": 0.150366,
          "sadness": 0.124217,
          "anger": 0.189886
        },
        "relevance": 0.700262,
        "text": "Mr. Corbyn",
        "sentiment": {
          "score": 0,
          "label": "neutral"
        }
      },
      {
        "emotion": {
          "fear": 0.094174,
          "disgust": 0.381569,
          "joy": 0.131986,
          "sadness": 0.390316,
          "anger": 0.088592
        },
        "relevance": 0.697429,
        "text": "leftist activism",
        "sentiment": {
          "label": "negative",
          "score": -0.25023
        }
      },
      {
        "emotion": {
          "sadness": 0.374518,
          "anger": 0.215645,
          "fear": 0.115342,
          "disgust": 0.303757,
          "joy": 0.075195
        },
        "relevance": 0.677102,
        "text": "left-wing leader",
        "sentiment": {
          "score": -0.554885,
          "label": "negative"
        }
      },
      {
        "sentiment": {
          "score": 0,
          "label": "neutral"
        },
        "emotion": {
          "fear": 0.226472,
          "disgust": 0.232288,
          "joy": 0.218812,
          "sadness": 0.306743,
          "anger": 0.078415
        },
        "relevance": 0.657066,
        "text": "Conservative Party"
      },
      {
        "emotion": {
          "fear": 0.088927,
          "disgust": 0.177698,
          "joy": 0.193143,
          "sadness": 0.435279,
          "anger": 0.149187
        },
        "relevance": 0.648214,
        "text": "Jeremy Corbyn.Twice",
        "sentiment": {
          "label": "neutral",
          "score": 0
        }
      }
    ],
    "language": "en"
  },
  "info": {
    "headline": "U.K. Labour Leader’s Stance on Russian Ex-Spy’s Poisoning Splits Party",
    "textLength": 5908,
    "source": "nytimes",
    "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
    "url": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
    "text": "LONDON — While Prime Minister Theresa May has united her warring Conservative Party by denouncing Russia over the poisoning of a former spy, things have not gone so smoothly for the opposition Labour Party. Among Labour lawmakers, familiar wounds have reopened over the more ambivalent stance of its left-wing leader, Jeremy Corbyn.Twice in Parliament this week, Mr. Corbyn, whose political views were forged in his leftist activism in the 1980s, has eschewed the supportive, cheerleading role that opposition leaders traditionally play to the prime minister when Britain is in conflict with a foreign power. At times, in his reluctance to criticize Moscow, he sounded like his ideological opposite, President Trump.While he condemned the attack in Salisbury, England, as an “appalling act of violence,” Mr. Corbyn has claimed that the Conservatives took donations from wealthy Russians, and he has highlighted cuts to the British Foreign Office and called for the Russian authorities to be “held to "
  }
}

let relatedArticles = [
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "tone_name": "Anger",
                "tone_id": "anger",
                "score": 0.316304
              },
              {
                "tone_name": "Disgust",
                "tone_id": "disgust",
                "score": 0.241808
              },
              {
                "tone_name": "Fear",
                "tone_id": "fear",
                "score": 0.238041
              },
              {
                "score": 0.098653,
                "tone_name": "Joy",
                "tone_id": "joy"
              },
              {
                "tone_name": "Sadness",
                "tone_id": "sadness",
                "score": 0.409421
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "score": 0.31581,
                "tone_name": "Analytical",
                "tone_id": "analytical"
              },
              {
                "tone_name": "Confident",
                "tone_id": "confident",
                "score": 0
              },
              {
                "tone_name": "Tentative",
                "tone_id": "tentative",
                "score": 0.44347
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "score": 0.212869,
                "tone_name": "Openness",
                "tone_id": "openness_big5"
              },
              {
                "score": 0.886744,
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5"
              },
              {
                "score": 0.184435,
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5"
              },
              {
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5",
                "score": 0.488598
              },
              {
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5",
                "score": 0.650161
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "keywords": [
        {
          "emotion": {
            "fear": 0.107588,
            "disgust": 0.060752,
            "joy": 0.401816,
            "sadness": 0.122739,
            "anger": 0.054193
          },
          "relevance": 0.94909,
          "text": "President Xi Jinping",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "emotion": {
            "fear": 0.107588,
            "disgust": 0.060752,
            "joy": 0.401816,
            "sadness": 0.122739,
            "anger": 0.054193
          },
          "relevance": 0.922618,
          "text": "unabashed authoritarianism",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "emotion": {
            "fear": 0.020204,
            "disgust": 0.018883,
            "joy": 0.79551,
            "sadness": 0.0496,
            "anger": 0.043252
          },
          "relevance": 0.916973,
          "text": "Good morning.The world",
          "sentiment": {
            "label": "positive",
            "score": 0.544757
          }
        },
        {
          "sentiment": {
            "label": "neutral",
            "score": 0
          },
          "emotion": {
            "fear": 0.104418,
            "disgust": 0.043278,
            "joy": 0.258538,
            "sadness": 0.219779,
            "anger": 0.166181
          },
          "relevance": 0.804864,
          "text": "Angela Merkel"
        },
        {
          "emotion": {
            "sadness": 0.04359,
            "anger": 0.031155,
            "fear": 0.872375,
            "disgust": 0.044243,
            "joy": 0.018706
          },
          "relevance": 0.779043,
          "text": "moral auth",
          "sentiment": {
            "label": "negative",
            "score": -0.449402
          }
        },
        {
          "sentiment": {
            "label": "neutral",
            "score": 0
          },
          "emotion": {
            "fear": 0.087573,
            "disgust": 0.077654,
            "joy": 0.185315,
            "sadness": 0.144548,
            "anger": 0.090723
          },
          "relevance": 0.766977,
          "text": "Beijing correspondent"
        },
        {
          "emotion": {
            "fear": 0.107588,
            "disgust": 0.060752,
            "joy": 0.401816,
            "sadness": 0.122739,
            "anger": 0.054193
          },
          "relevance": 0.676976,
          "text": "global shift",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        },
        {
          "emotion": {
            "sadness": 0.04359,
            "anger": 0.031155,
            "fear": 0.872375,
            "disgust": 0.044243,
            "joy": 0.018706
          },
          "relevance": 0.646848,
          "text": "U.S.Some critics",
          "sentiment": {
            "score": -0.449402,
            "label": "negative"
          }
        },
        {
          "emotion": {
            "fear": 0.104418,
            "disgust": 0.043278,
            "joy": 0.258538,
            "sadness": 0.219779,
            "anger": 0.166181
          },
          "relevance": 0.371039,
          "text": "Colosseum",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        },
        {
          "emotion": {
            "sadness": 0.296677,
            "anger": 0.216125,
            "fear": 0.162639,
            "disgust": 0.068232,
            "joy": 0.0685
          },
          "relevance": 0.369862,
          "text": "briefing",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "sadness": 0.067786,
            "anger": 0.053285,
            "fear": 0.436558,
            "disgust": 0.030593,
            "joy": 0.407571
          }
        }
      },
      "sentiment": {
        "document": {
          "label": "negative",
          "score": -0.616819
        }
      },
      "usage": {
        "text_characters": 500,
        "text_units": 1,
        "features": 3
      }
    },
    "info": {
      "headline": "Angela Merkel, China, Syria: Your Tuesday Briefing",
      "textLength": 7329,
      "source": "nytimes",
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "url": "https://www.nytimes.com/2018/02/27/briefing/angela-merkel-china-syria.html",
      "text": "(Want to get this briefing by email? Here’s the sign-up.)Good morning.The world tilts toward authoritarianism, Angela Merkel grooms a successor and the Colosseum gets snow. Here’s the news:• Are we in the era of the strongman?Our Beijing correspondent, a veteran of both Washington and Russia, details how China’s move to extend the rule of President Xi Jinping fits into a global shift toward unabashed authoritarianism, unchecked by the U.S.Some critics fear that the U.S. has diminished moral authority — and inclination — to oppose the world’s slide toward more hard-line control.Above, memorabilia showing Mr. Xi and his wife, and his predecessors._____• There is no end to the horror in Syria.The U.N. secretary general, António Guterres, appealed for a cease-fire decision to be respected to allow relief aid for 400,000 people trapped in eastern Ghouta, a besieged suburb of Damascus. One resident called it “an uninhabitable hell.”Russia ordered a daily humanitarian truce, but it was unclea"
    }
  },
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "score": 0.316304,
                "tone_name": "Anger",
                "tone_id": "anger"
              },
              {
                "tone_name": "Disgust",
                "tone_id": "disgust",
                "score": 0.241808
              },
              {
                "score": 0.238041,
                "tone_name": "Fear",
                "tone_id": "fear"
              },
              {
                "score": 0.098653,
                "tone_name": "Joy",
                "tone_id": "joy"
              },
              {
                "tone_name": "Sadness",
                "tone_id": "sadness",
                "score": 0.409421
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "score": 0.31581,
                "tone_name": "Analytical",
                "tone_id": "analytical"
              },
              {
                "score": 0,
                "tone_name": "Confident",
                "tone_id": "confident"
              },
              {
                "tone_name": "Tentative",
                "tone_id": "tentative",
                "score": 0.44347
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "score": 0.212869,
                "tone_name": "Openness",
                "tone_id": "openness_big5"
              },
              {
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5",
                "score": 0.886744
              },
              {
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5",
                "score": 0.184435
              },
              {
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5",
                "score": 0.488598
              },
              {
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5",
                "score": 0.650161
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "sentiment": {
        "document": {
          "score": -0.902959,
          "label": "negative"
        }
      },
      "usage": {
        "text_units": 1,
        "features": 3,
        "text_characters": 500
      },
      "keywords": [
        {
          "sentiment": {
            "label": "neutral",
            "score": 0
          },
          "emotion": {
            "sadness": 0.504281,
            "anger": 0.26238,
            "fear": 0.340169,
            "disgust": 0.270602,
            "joy": 0.005597
          },
          "relevance": 0.995376,
          "text": "Ms. Holtom"
        },
        {
          "emotion": {
            "sadness": 0.386305,
            "anger": 0.259848,
            "fear": 0.04556,
            "disgust": 0.209444,
            "joy": 0.134806
          },
          "relevance": 0.888333,
          "text": "Stephanie Holtom",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        },
        {
          "emotion": {
            "sadness": 0.222636,
            "anger": 0.319359,
            "fear": 0.07783,
            "disgust": 0.210153,
            "joy": 0.085794
          },
          "relevance": 0.693797,
          "text": "suburban strip",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "emotion": {
            "fear": 0.07783,
            "disgust": 0.210153,
            "joy": 0.085794,
            "sadness": 0.222636,
            "anger": 0.319359
          },
          "relevance": 0.657508,
          "text": "Welsh city",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "sadness": 0.386305,
            "anger": 0.259848,
            "fear": 0.04556,
            "disgust": 0.209444,
            "joy": 0.134806
          },
          "relevance": 0.652654,
          "text": "European Union"
        },
        {
          "emotion": {
            "fear": 0.572761,
            "disgust": 0.073837,
            "joy": 0.078901,
            "sadness": 0.260149,
            "anger": 0.232231
          },
          "relevance": 0.647075,
          "text": "British government",
          "sentiment": {
            "score": -0.360587,
            "label": "negative"
          }
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "fear": 0.094616,
            "disgust": 0.151352,
            "joy": 0.158235,
            "sadness": 0.219155,
            "anger": 0.051348
          },
          "relevance": 0.429119,
          "text": "referendum"
        },
        {
          "sentiment": {
            "label": "negative",
            "score": -0.360587
          },
          "emotion": {
            "fear": 0.572761,
            "disgust": 0.073837,
            "joy": 0.078901,
            "sadness": 0.260149,
            "anger": 0.232231
          },
          "relevance": 0.406423,
          "text": "supermarket"
        },
        {
          "emotion": {
            "fear": 0.236389,
            "disgust": 0.234547,
            "joy": 0.006002,
            "sadness": 0.458507,
            "anger": 0.420498
          },
          "relevance": 0.401822,
          "text": "mess",
          "sentiment": {
            "score": -0.76531,
            "label": "negative"
          }
        },
        {
          "emotion": {
            "sadness": 0.222636,
            "anger": 0.319359,
            "fear": 0.07783,
            "disgust": 0.210153,
            "joy": 0.085794
          },
          "relevance": 0.399133,
          "text": "Swansea",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "sadness": 0.44462,
            "anger": 0.393863,
            "fear": 0.273574,
            "disgust": 0.28133,
            "joy": 0.012271
          }
        }
      }
    },
    "info": {
      "headline": "As Britain Stumbles Over ‘Brexit,’ Support Grows for 2nd Vote",
      "textLength": 9502,
      "source": "nytimes",
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "url": "https://www.nytimes.com/2018/02/10/world/europe/uk-brexit-second-referendum.html",
      "text": "FFORESTFACH, Wales — In a 2016 referendum, Stephanie Holtom voted to leave the European Union, worried about immigration and convinced that other countries were telling the British government what to do.But outside a supermarket recently in a large, suburban strip mall not far from the Welsh city of Swansea, Ms. Holtom conceded she might have been wrong.“I agreed to come out of Europe, but I am beginning to have second thoughts. I think it’s a mess, and I’m sick to death of it,” said Ms. Holtom, who is retired, as she collected her shopping cart. She added that, if there were a second referendum, “people would vote to stay.”Since a majority of Britons voted narrowly to leave the bloc more than 18 months ago, most politicians have treated a withdrawal, known as Brexit, as inviolable. Even amid signs of a slowing economy, few saw signs of a shift in public opinion.Until now.London may be almost 200 miles away, but people here in Wales have noticed that Prime Minister Theresa May is strug"
    }
  },
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "score": 0.316304,
                "tone_name": "Anger",
                "tone_id": "anger"
              },
              {
                "score": 0.241808,
                "tone_name": "Disgust",
                "tone_id": "disgust"
              },
              {
                "score": 0.238041,
                "tone_name": "Fear",
                "tone_id": "fear"
              },
              {
                "score": 0.098653,
                "tone_name": "Joy",
                "tone_id": "joy"
              },
              {
                "tone_name": "Sadness",
                "tone_id": "sadness",
                "score": 0.409421
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "tone_name": "Analytical",
                "tone_id": "analytical",
                "score": 0.31581
              },
              {
                "score": 0,
                "tone_name": "Confident",
                "tone_id": "confident"
              },
              {
                "score": 0.44347,
                "tone_name": "Tentative",
                "tone_id": "tentative"
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "tone_name": "Openness",
                "tone_id": "openness_big5",
                "score": 0.212869
              },
              {
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5",
                "score": 0.886744
              },
              {
                "score": 0.184435,
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5"
              },
              {
                "score": 0.488598,
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5"
              },
              {
                "score": 0.650161,
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5"
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "sentiment": {
        "document": {
          "label": "neutral",
          "score": 0
        }
      },
      "usage": {
        "text_units": 1,
        "features": 3,
        "text_characters": 87
      },
      "keywords": [
        {
          "emotion": {
            "sadness": 0.108579,
            "anger": 0.059041,
            "fear": 0.154564,
            "disgust": 0.445684,
            "joy": 0.090752
          },
          "relevance": 0.980207,
          "text": "chancellor John McDonnell",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "fear": 0.154564,
            "disgust": 0.445684,
            "joy": 0.090752,
            "sadness": 0.108579,
            "anger": 0.059041
          },
          "relevance": 0.867143,
          "text": "annual tax returns"
        },
        {
          "emotion": {
            "sadness": 0.108579,
            "anger": 0.059041,
            "fear": 0.154564,
            "disgust": 0.445684,
            "joy": 0.090752
          },
          "relevance": 0.665161,
          "text": "Labour leader",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "sadness": 0.108579,
            "anger": 0.059041,
            "fear": 0.154564,
            "disgust": 0.445684,
            "joy": 0.090752
          }
        }
      }
    },
    "info": {
      "headline": "Corbyn pays nearly £50K in income tax",
      "text": "The Labour leader and shadow chancellor John McDonnell release their annual tax returns",
      "url": "http://www.bbc.co.uk/news/uk-politics-42919275",
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html"
    }
  },
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "tone_name": "Anger",
                "tone_id": "anger",
                "score": 0.316304
              },
              {
                "score": 0.241808,
                "tone_name": "Disgust",
                "tone_id": "disgust"
              },
              {
                "score": 0.238041,
                "tone_name": "Fear",
                "tone_id": "fear"
              },
              {
                "score": 0.098653,
                "tone_name": "Joy",
                "tone_id": "joy"
              },
              {
                "tone_name": "Sadness",
                "tone_id": "sadness",
                "score": 0.409421
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "score": 0.31581,
                "tone_name": "Analytical",
                "tone_id": "analytical"
              },
              {
                "tone_name": "Confident",
                "tone_id": "confident",
                "score": 0
              },
              {
                "score": 0.44347,
                "tone_name": "Tentative",
                "tone_id": "tentative"
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "tone_name": "Openness",
                "tone_id": "openness_big5",
                "score": 0.212869
              },
              {
                "score": 0.886744,
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5"
              },
              {
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5",
                "score": 0.184435
              },
              {
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5",
                "score": 0.488598
              },
              {
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5",
                "score": 0.650161
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "sentiment": {
        "document": {
          "label": "neutral",
          "score": 0
        }
      },
      "usage": {
        "text_characters": 92,
        "text_units": 1,
        "features": 3
      },
      "keywords": [
        {
          "emotion": {
            "fear": 0.070613,
            "disgust": 0.133229,
            "joy": 0.301641,
            "sadness": 0.3028,
            "anger": 0.137898
          },
          "relevance": 0.970666,
          "text": "British politics",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "emotion": {
            "sadness": 0.101966,
            "anger": 0.142816,
            "fear": 0.135473,
            "disgust": 0.239129,
            "joy": 0.363926
          },
          "relevance": 0.864297,
          "text": "opinion",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "sadness": 0.19626,
            "anger": 0.162006,
            "fear": 0.088055,
            "disgust": 0.230907,
            "joy": 0.385382
          }
        }
      }
    },
    "info": {
      "url": "http://www.bbc.co.uk/news/uk-politics-42414394",
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "headline": "How political polling tells the story of 2017",
      "text": "It was a rollercoaster year in British politics - here's how the opinion polls reflected it."
    }
  },
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "tone_name": "Anger",
                "tone_id": "anger",
                "score": 0.117502
              },
              {
                "tone_name": "Disgust",
                "tone_id": "disgust",
                "score": 0.182757
              },
              {
                "score": 0.08925,
                "tone_name": "Fear",
                "tone_id": "fear"
              },
              {
                "tone_name": "Joy",
                "tone_id": "joy",
                "score": 0.152064
              },
              {
                "tone_name": "Sadness",
                "tone_id": "sadness",
                "score": 0.669429
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "tone_name": "Analytical",
                "tone_id": "analytical",
                "score": 0
              },
              {
                "tone_name": "Confident",
                "tone_id": "confident",
                "score": 0
              },
              {
                "tone_name": "Tentative",
                "tone_id": "tentative",
                "score": 0
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "tone_name": "Openness",
                "tone_id": "openness_big5",
                "score": 0.8776
              },
              {
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5",
                "score": 0.371171
              },
              {
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5",
                "score": 0.813881
              },
              {
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5",
                "score": 0.688248
              },
              {
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5",
                "score": 0.3747
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "sentiment": {
        "document": {
          "label": "neutral",
          "score": 0
        }
      },
      "usage": {
        "text_units": 1,
        "features": 3,
        "text_characters": 111
      },
      "keywords": [
        {
          "emotion": {
            "fear": 0.046393,
            "disgust": 0.090858,
            "joy": 0.031769,
            "sadness": 0.340139,
            "anger": 0.102594
          },
          "relevance": 0.91028,
          "text": "final Brexit deal",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        },
        {
          "emotion": {
            "sadness": 0.340139,
            "anger": 0.102594,
            "fear": 0.046393,
            "disgust": 0.090858,
            "joy": 0.031769
          },
          "relevance": 0.722128,
          "text": "Richard Leonard",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "emotion": {
            "fear": 0.319276,
            "disgust": 0.082701,
            "joy": 0.022699,
            "sadness": 0.555913,
            "anger": 0.194489
          },
          "relevance": 0.695522,
          "text": "general election",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "emotion": {
            "sadness": 0.340139,
            "anger": 0.102594,
            "fear": 0.046393,
            "disgust": 0.090858,
            "joy": 0.031769
          },
          "relevance": 0.453169,
          "text": "MPs",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "fear": 0.115865,
            "disgust": 0.097799,
            "joy": 0.015654,
            "sadness": 0.554217,
            "anger": 0.164117
          }
        }
      }
    },
    "info": {
      "url": "http://www.bbc.co.uk/news/uk-scotland-scotland-politics-42619797",
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "headline": "Leonard predicts new election over Brexit",
      "text": "Richard Leonard predicts that MPs will reject the final Brexit deal, saying a general election could be needed."
    }
  },
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "score": 0.316304,
                "tone_name": "Anger",
                "tone_id": "anger"
              },
              {
                "score": 0.241808,
                "tone_name": "Disgust",
                "tone_id": "disgust"
              },
              {
                "tone_name": "Fear",
                "tone_id": "fear",
                "score": 0.238041
              },
              {
                "score": 0.098653,
                "tone_name": "Joy",
                "tone_id": "joy"
              },
              {
                "tone_name": "Sadness",
                "tone_id": "sadness",
                "score": 0.409421
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "score": 0.31581,
                "tone_name": "Analytical",
                "tone_id": "analytical"
              },
              {
                "score": 0,
                "tone_name": "Confident",
                "tone_id": "confident"
              },
              {
                "tone_name": "Tentative",
                "tone_id": "tentative",
                "score": 0.44347
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "score": 0.212869,
                "tone_name": "Openness",
                "tone_id": "openness_big5"
              },
              {
                "score": 0.886744,
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5"
              },
              {
                "score": 0.184435,
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5"
              },
              {
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5",
                "score": 0.488598
              },
              {
                "score": 0.650161,
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5"
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "sentiment": {
        "document": {
          "score": -0.446219,
          "label": "negative"
        }
      },
      "usage": {
        "text_units": 1,
        "features": 3,
        "text_characters": 103
      },
      "keywords": [
        {
          "emotion": {
            "fear": 0.097304,
            "disgust": 0.182627,
            "joy": 0.043986,
            "sadness": 0.543735,
            "anger": 0.168208
          },
          "relevance": 0.911867,
          "text": "catastrophic damage",
          "sentiment": {
            "score": -0.71585,
            "label": "negative"
          }
        },
        {
          "emotion": {
            "fear": 0.417815,
            "disgust": 0.268553,
            "joy": 0.058436,
            "sadness": 0.257897,
            "anger": 0.04953
          },
          "relevance": 0.803376,
          "text": "Scottish party",
          "sentiment": {
            "label": "negative",
            "score": -0.533902
          }
        },
        {
          "sentiment": {
            "score": -0.438827,
            "label": "negative"
          },
          "emotion": {
            "fear": 0.183874,
            "disgust": 0.107538,
            "joy": 0.04349,
            "sadness": 0.684365,
            "anger": 0.088784
          },
          "relevance": 0.758698,
          "text": "hard Brexit"
        },
        {
          "sentiment": {
            "label": "negative",
            "score": -0.533902
          },
          "emotion": {
            "sadness": 0.257897,
            "anger": 0.04953,
            "fear": 0.417815,
            "disgust": 0.268553,
            "joy": 0.058436
          },
          "relevance": 0.560588,
          "text": "Labour"
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "sadness": 0.592925,
            "anger": 0.077318,
            "fear": 0.313745,
            "disgust": 0.247195,
            "joy": 0.021179
          }
        }
      }
    },
    "info": {
      "url": "http://www.bbc.co.uk/news/uk-42503659",
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "headline": "SNP calls for Labour help on single market",
      "text": "The Scottish party wants to co-operate with Labour to prevent the \"catastrophic damage\" of hard Brexit."
    }
  },
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "tone_name": "Anger",
                "tone_id": "anger",
                "score": 0.316304
              },
              {
                "score": 0.241808,
                "tone_name": "Disgust",
                "tone_id": "disgust"
              },
              {
                "score": 0.238041,
                "tone_name": "Fear",
                "tone_id": "fear"
              },
              {
                "tone_name": "Joy",
                "tone_id": "joy",
                "score": 0.098653
              },
              {
                "tone_name": "Sadness",
                "tone_id": "sadness",
                "score": 0.409421
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "tone_name": "Analytical",
                "tone_id": "analytical",
                "score": 0.31581
              },
              {
                "score": 0,
                "tone_name": "Confident",
                "tone_id": "confident"
              },
              {
                "score": 0.44347,
                "tone_name": "Tentative",
                "tone_id": "tentative"
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "tone_name": "Openness",
                "tone_id": "openness_big5",
                "score": 0.212869
              },
              {
                "score": 0.886744,
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5"
              },
              {
                "score": 0.184435,
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5"
              },
              {
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5",
                "score": 0.488598
              },
              {
                "score": 0.650161,
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5"
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "sentiment": {
        "document": {
          "score": 0,
          "label": "neutral"
        }
      },
      "usage": {
        "text_units": 1,
        "features": 3,
        "text_characters": 500
      },
      "keywords": [
        {
          "emotion": {
            "sadness": 0.149057,
            "anger": 0.100022,
            "fear": 0.106346,
            "disgust": 0.071165,
            "joy": 0.62082
          },
          "relevance": 0.909018,
          "text": "Good morning.No respite",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "emotion": {
            "fear": 0.070258,
            "disgust": 0.25544,
            "joy": 0.314502,
            "sadness": 0.290106,
            "anger": 0.137934
          },
          "relevance": 0.787855,
          "text": "U.N. Security Council",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "sadness": 0.126593,
            "anger": 0.128791,
            "fear": 0.09031,
            "disgust": 0.097228,
            "joy": 0.349262
          },
          "relevance": 0.673847,
          "text": "Hapsburg Group"
        },
        {
          "emotion": {
            "sadness": 0.345425,
            "anger": 0.340628,
            "fear": 0.438239,
            "disgust": 0.17381,
            "joy": 0.024784
          },
          "relevance": 0.642285,
          "text": "chlorine attack",
          "sentiment": {
            "score": -0.281711,
            "label": "negative"
          }
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "sadness": 0.124826,
            "anger": 0.052641,
            "fear": 0.077901,
            "disgust": 0.063545,
            "joy": 0.476995
          },
          "relevance": 0.614861,
          "text": "new smartphone"
        },
        {
          "emotion": {
            "fear": 0.106346,
            "disgust": 0.071165,
            "joy": 0.62082,
            "sadness": 0.149057,
            "anger": 0.100022
          },
          "relevance": 0.611623,
          "text": "Syria’s war",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "emotion": {
            "fear": 0.438239,
            "disgust": 0.17381,
            "joy": 0.024784,
            "sadness": 0.345425,
            "anger": 0.340628
          },
          "relevance": 0.606678,
          "text": "rebel-held suburb",
          "sentiment": {
            "label": "negative",
            "score": -0.281711
          }
        },
        {
          "emotion": {
            "sadness": 0.345425,
            "anger": 0.340628,
            "fear": 0.438239,
            "disgust": 0.17381,
            "joy": 0.024784
          },
          "relevance": 0.513338,
          "text": "new reports",
          "sentiment": {
            "score": -0.281711,
            "label": "negative"
          }
        },
        {
          "emotion": {
            "sadness": 0.345425,
            "anger": 0.340628,
            "fear": 0.438239,
            "disgust": 0.17381,
            "joy": 0.024784
          },
          "relevance": 0.327404,
          "text": "Airstrikes",
          "sentiment": {
            "label": "negative",
            "score": -0.281711
          }
        },
        {
          "emotion": {
            "sadness": 0.296677,
            "anger": 0.216125,
            "fear": 0.162639,
            "disgust": 0.068232,
            "joy": 0.0685
          },
          "relevance": 0.272398,
          "text": "briefing",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "sadness": 0.409421,
            "anger": 0.316304,
            "fear": 0.238041,
            "disgust": 0.241808,
            "joy": 0.098653
          }
        }
      }
    },
    "info": {
      "headline": "Syria, Samsung, Xi Jinping: Your Monday Briefing",
      "textLength": 7917,
      "source": "nytimes",
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "url": "https://www.nytimes.com/2018/02/26/briefing/syria-samsung-xi-jinping.html",
      "text": "(Want to get this briefing by email? Here’s the sign-up.)Good morning.No respite in Syria’s war, Ukraine’s “Hapsburg Group” and Samsung’s new smartphone. Here’s the news:• Airstrikes continued against a rebel-held suburb of Damascus where more than 500 civilians have been killed in the past week.There were new reports of a suspected chlorine attack, despite a U.N. Security Council resolution on Saturday that called for a 30-day cease-fire.Our correspondents examined two phenomena in the regional turmoil: a Russian effort to repatriate women and children from territory held by the crumbling Islamic State, and a push for gender equality that’s swelling in Kurdish-controlled areas.Separately in Prague, the Czech police arrested a Syrian Kurdish leader. Turkey is seeking his extradition._____• In China, President Xi Jinping’s efforts to extend his rule as leader, perhaps indefinitely, raised fresh fears of a resurgence of strongman politics and of a new era of hostility and repression.For "
    }
  },
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "score": 0.117502,
                "tone_name": "Anger",
                "tone_id": "anger"
              },
              {
                "score": 0.182757,
                "tone_name": "Disgust",
                "tone_id": "disgust"
              },
              {
                "score": 0.08925,
                "tone_name": "Fear",
                "tone_id": "fear"
              },
              {
                "score": 0.152064,
                "tone_name": "Joy",
                "tone_id": "joy"
              },
              {
                "tone_name": "Sadness",
                "tone_id": "sadness",
                "score": 0.669429
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "score": 0,
                "tone_name": "Analytical",
                "tone_id": "analytical"
              },
              {
                "score": 0,
                "tone_name": "Confident",
                "tone_id": "confident"
              },
              {
                "score": 0,
                "tone_name": "Tentative",
                "tone_id": "tentative"
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "score": 0.8776,
                "tone_name": "Openness",
                "tone_id": "openness_big5"
              },
              {
                "score": 0.371171,
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5"
              },
              {
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5",
                "score": 0.813881
              },
              {
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5",
                "score": 0.688248
              },
              {
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5",
                "score": 0.3747
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "keywords": [
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "sadness": 0.501857,
            "anger": 0.164171,
            "fear": 0.085565,
            "disgust": 0.104584,
            "joy": 0.052499
          },
          "relevance": 0.943548,
          "text": "Intramural political feuds"
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "fear": 0.10766,
            "disgust": 0.2591,
            "joy": 0.296483,
            "sadness": 0.210322,
            "anger": 0.194243
          },
          "relevance": 0.937044,
          "text": "leader Jeremy Corbyn"
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "sadness": 0.210322,
            "anger": 0.194243,
            "fear": 0.10766,
            "disgust": 0.2591,
            "joy": 0.296483
          },
          "relevance": 0.752595,
          "text": "National Executive Committee"
        },
        {
          "sentiment": {
            "score": 0.573803,
            "label": "positive"
          },
          "relevance": 0.745639,
          "text": "Mr. Corbyn"
        },
        {
          "sentiment": {
            "label": "neutral",
            "score": 0
          },
          "emotion": {
            "fear": 0.037913,
            "disgust": 0.224917,
            "joy": 0.422647,
            "sadness": 0.106586,
            "anger": 0.012794
          },
          "relevance": 0.640468,
          "text": "Labour Party"
        },
        {
          "emotion": {
            "sadness": 0.21519,
            "anger": 0.024448,
            "fear": 0.219153,
            "disgust": 0.087276,
            "joy": 0.207857
          },
          "relevance": 0.637868,
          "text": "main opposition",
          "sentiment": {
            "label": "negative",
            "score": -0.400443
          }
        },
        {
          "sentiment": {
            "score": 0.200399,
            "label": "positive"
          },
          "emotion": {
            "sadness": 0.151545,
            "anger": 0.08686,
            "fear": 0.093654,
            "disgust": 0.072945,
            "joy": 0.174219
          },
          "relevance": 0.635314,
          "text": "radical socialist"
        },
        {
          "emotion": {
            "sadness": 0.106586,
            "anger": 0.012794,
            "fear": 0.037913,
            "disgust": 0.224917,
            "joy": 0.422647
          },
          "relevance": 0.622198,
          "text": "special case",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "sadness": 0.253291,
            "anger": 0.126397,
            "fear": 0.070927,
            "disgust": 0.119186,
            "joy": 0.193087
          },
          "relevance": 0.609279,
          "text": "Jon Lansman"
        },
        {
          "sentiment": {
            "label": "neutral",
            "score": 0
          },
          "emotion": {
            "fear": 0.10766,
            "disgust": 0.2591,
            "joy": 0.296483,
            "sadness": 0.210322,
            "anger": 0.194243
          },
          "relevance": 0.585689,
          "text": "Party members"
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "sadness": 0.262611,
            "anger": 0.077901,
            "fear": 0.046534,
            "disgust": 0.303854,
            "joy": 0.335738
          }
        }
      },
      "sentiment": {
        "document": {
          "label": "positive",
          "score": 0.555707
        }
      },
      "usage": {
        "text_characters": 500,
        "text_units": 1,
        "features": 3
      }
    },
    "info": {
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "url": "https://www.wsj.com/articles/the-corbyn-revolution-advances-1516234902",
      "text": "Intramural political feuds rarely warrant much attention, but developments within Britain’s Labour Party this week are a special case. The country’s main opposition that may be the next governing party extended its march to the left.  Party members on Monday elected three loyalists of left-wing leader Jeremy Corbyn to the party’s National Executive Committee, cementing Mr. Corbyn’s grip. One is Jon Lansman, a self-described “radical socialist” who founded Momentum, the group formed to support Mr. Corbyn against party moderates....",
      "headline": "The Corbyn Revolution Advances",
      "textLength": 547,
      "source": "wsj"
    }
  },
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "tone_name": "Anger",
                "tone_id": "anger",
                "score": 0.316304
              },
              {
                "score": 0.241808,
                "tone_name": "Disgust",
                "tone_id": "disgust"
              },
              {
                "tone_name": "Fear",
                "tone_id": "fear",
                "score": 0.238041
              },
              {
                "score": 0.098653,
                "tone_name": "Joy",
                "tone_id": "joy"
              },
              {
                "score": 0.409421,
                "tone_name": "Sadness",
                "tone_id": "sadness"
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "score": 0.31581,
                "tone_name": "Analytical",
                "tone_id": "analytical"
              },
              {
                "score": 0,
                "tone_name": "Confident",
                "tone_id": "confident"
              },
              {
                "score": 0.44347,
                "tone_name": "Tentative",
                "tone_id": "tentative"
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "score": 0.212869,
                "tone_name": "Openness",
                "tone_id": "openness_big5"
              },
              {
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5",
                "score": 0.886744
              },
              {
                "score": 0.184435,
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5"
              },
              {
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5",
                "score": 0.488598
              },
              {
                "score": 0.650161,
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5"
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "keywords": [
        {
          "emotion": {
            "sadness": 0.212667,
            "anger": 0.044935,
            "fear": 0.13463,
            "disgust": 0.07396,
            "joy": 0.315294
          },
          "relevance": 0.949151,
          "text": "British prime minister",
          "sentiment": {
            "label": "positive",
            "score": 0.472776
          }
        },
        {
          "sentiment": {
            "score": -0.301541,
            "label": "negative"
          },
          "emotion": {
            "fear": 0.395198,
            "disgust": 0.074349,
            "joy": 0.026062,
            "sadness": 0.324068,
            "anger": 0.425866
          },
          "relevance": 0.923905,
          "text": "soil.In language reminiscent"
        },
        {
          "emotion": {
            "fear": 0.365268,
            "disgust": 0.544971,
            "joy": 0.018475,
            "sadness": 0.28051,
            "anger": 0.162016
          },
          "relevance": 0.809591,
          "text": "corrupt Russians",
          "sentiment": {
            "label": "negative",
            "score": -0.62409
          }
        },
        {
          "sentiment": {
            "score": -0.301541,
            "label": "negative"
          },
          "emotion": {
            "fear": 0.395198,
            "disgust": 0.074349,
            "joy": 0.026062,
            "sadness": 0.324068,
            "anger": 0.425866
          },
          "relevance": 0.699622,
          "text": "nerve agent"
        },
        {
          "emotion": {
            "fear": 0.123547,
            "disgust": 0.495633,
            "joy": 0.167391,
            "sadness": 0.22025,
            "anger": 0.219285
          },
          "relevance": 0.68786,
          "text": "world leaders",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        },
        {
          "emotion": {
            "fear": 0.395198,
            "disgust": 0.074349,
            "joy": 0.026062,
            "sadness": 0.324068,
            "anger": 0.425866
          },
          "relevance": 0.657435,
          "text": "Cold War",
          "sentiment": {
            "label": "negative",
            "score": -0.301541
          }
        },
        {
          "emotion": {
            "sadness": 0.185165,
            "anger": 0.640925,
            "fear": 0.388186,
            "disgust": 0.119291,
            "joy": 0.016327
          },
          "relevance": 0.589624,
          "text": "spies",
          "sentiment": {
            "score": -0.301541,
            "label": "negative"
          }
        },
        {
          "sentiment": {
            "label": "negative",
            "score": -0.301541
          },
          "emotion": {
            "fear": 0.395198,
            "disgust": 0.074349,
            "joy": 0.026062,
            "sadness": 0.324068,
            "anger": 0.425866
          },
          "relevance": 0.498006,
          "text": "confrontation"
        },
        {
          "emotion": {
            "sadness": 0.28051,
            "anger": 0.162016,
            "fear": 0.365268,
            "disgust": 0.544971,
            "joy": 0.018475
          },
          "relevance": 0.497273,
          "text": "crackdown",
          "sentiment": {
            "score": -0.62409,
            "label": "negative"
          }
        },
        {
          "emotion": {
            "sadness": 0.22025,
            "anger": 0.219285,
            "fear": 0.123547,
            "disgust": 0.495633,
            "joy": 0.167391
          },
          "relevance": 0.489482,
          "text": "Theresa",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "fear": 0.331863,
            "disgust": 0.238327,
            "joy": 0.030709,
            "sadness": 0.278833,
            "anger": 0.511997
          }
        }
      },
      "sentiment": {
        "document": {
          "label": "negative",
          "score": -0.0677184
        }
      },
      "usage": {
        "text_units": 1,
        "features": 3,
        "text_characters": 500
      }
    },
    "info": {
      "headline": "Theresa May Expels Russian Diplomats. But Now Comes the Hard Part.",
      "textLength": 10101,
      "source": "nytimes",
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "url": "https://www.nytimes.com/2018/03/14/world/europe/russia-spy-britain-theresa-may.html",
      "text": "LONDON — Few world leaders have looked weaker than Theresa May, the British prime minister. Yet in Parliament on Wednesday, she vowed to stand tough in the escalating confrontation with Russia over the use of a nerve agent to poison one of its former spies on British soil.In language reminiscent of the Cold War, Mrs. May — until recently, accused at home of not being hard enough on Moscow — expelled 23 Russians she said were spies, promised a crackdown on corrupt Russians and the money they funnel into Britain, and called off high-level contacts between the two governments.Suddenly, she is the most forceful Western leader in denouncing President Vladimir V. Putin’s government, which she portrayed as a malevolent and lawless force.Her decision makes for a particularly sharp contrast with President Trump, who has been notably reluctant to criticize Mr. Putin and is dogged by accusations that the Kremlin tried to help him in the 2016 election.But it was not clear how strongly allies would"
    }
  },
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "score": 0.110374,
                "tone_name": "Anger",
                "tone_id": "anger"
              },
              {
                "score": 0.441499,
                "tone_name": "Disgust",
                "tone_id": "disgust"
              },
              {
                "score": 0.083986,
                "tone_name": "Fear",
                "tone_id": "fear"
              },
              {
                "tone_name": "Joy",
                "tone_id": "joy",
                "score": 0.138962
              },
              {
                "score": 0.45254,
                "tone_name": "Sadness",
                "tone_id": "sadness"
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "score": 0.001259,
                "tone_name": "Analytical",
                "tone_id": "analytical"
              },
              {
                "tone_name": "Confident",
                "tone_id": "confident",
                "score": 0
              },
              {
                "tone_name": "Tentative",
                "tone_id": "tentative",
                "score": 0.448741
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "tone_name": "Openness",
                "tone_id": "openness_big5",
                "score": 0.472888
              },
              {
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5",
                "score": 0.838567
              },
              {
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5",
                "score": 0.928092
              },
              {
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5",
                "score": 0.77874
              },
              {
                "score": 0.444064,
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5"
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "keywords": [
        {
          "emotion": {
            "fear": 0.155446,
            "disgust": 0.340313,
            "joy": 0.230265,
            "sadness": 0.229812,
            "anger": 0.046586
          },
          "relevance": 0.951948,
          "text": "opposition Labour Party",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        },
        {
          "emotion": {
            "fear": 0.226472,
            "disgust": 0.232288,
            "joy": 0.218812,
            "sadness": 0.306743,
            "anger": 0.078415
          },
          "relevance": 0.943889,
          "text": "Prime Minister Theresa",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "emotion": {
            "fear": 0.142378,
            "disgust": 0.089759,
            "joy": 0.246608,
            "sadness": 0.503889,
            "anger": 0.031473
          },
          "relevance": 0.765691,
          "text": "Labour lawmakers",
          "sentiment": {
            "score": -0.371827,
            "label": "negative"
          }
        },
        {
          "sentiment": {
            "label": "negative",
            "score": -0.554885
          },
          "emotion": {
            "fear": 0.115342,
            "disgust": 0.303757,
            "joy": 0.075195,
            "sadness": 0.374518,
            "anger": 0.215645
          },
          "relevance": 0.745865,
          "text": "ambivalent stance"
        },
        {
          "emotion": {
            "sadness": 0.374518,
            "anger": 0.215645,
            "fear": 0.115342,
            "disgust": 0.303757,
            "joy": 0.075195
          },
          "relevance": 0.70661,
          "text": "familiar wounds",
          "sentiment": {
            "label": "negative",
            "score": -0.554885
          }
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "fear": 0.087354,
            "disgust": 0.094981,
            "joy": 0.150366,
            "sadness": 0.124217,
            "anger": 0.189886
          },
          "relevance": 0.700262,
          "text": "Mr. Corbyn"
        },
        {
          "emotion": {
            "fear": 0.094174,
            "disgust": 0.381569,
            "joy": 0.131986,
            "sadness": 0.390316,
            "anger": 0.088592
          },
          "relevance": 0.697429,
          "text": "leftist activism",
          "sentiment": {
            "label": "negative",
            "score": -0.25023
          }
        },
        {
          "emotion": {
            "sadness": 0.374518,
            "anger": 0.215645,
            "fear": 0.115342,
            "disgust": 0.303757,
            "joy": 0.075195
          },
          "relevance": 0.677102,
          "text": "left-wing leader",
          "sentiment": {
            "score": -0.554885,
            "label": "negative"
          }
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "sadness": 0.306743,
            "anger": 0.078415,
            "fear": 0.226472,
            "disgust": 0.232288,
            "joy": 0.218812
          },
          "relevance": 0.657066,
          "text": "Conservative Party"
        },
        {
          "sentiment": {
            "label": "neutral",
            "score": 0
          },
          "emotion": {
            "fear": 0.088927,
            "disgust": 0.177698,
            "joy": 0.193143,
            "sadness": 0.435279,
            "anger": 0.149187
          },
          "relevance": 0.648214,
          "text": "Jeremy Corbyn.Twice"
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "sadness": 0.45254,
            "anger": 0.110374,
            "fear": 0.083986,
            "disgust": 0.441499,
            "joy": 0.138962
          }
        }
      },
      "sentiment": {
        "document": {
          "score": -0.804389,
          "label": "negative"
        }
      },
      "usage": {
        "text_characters": 500,
        "text_units": 1,
        "features": 3
      }
    },
    "info": {
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "url": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "text": "LONDON — While Prime Minister Theresa May has united her warring Conservative Party by denouncing Russia over the poisoning of a former spy, things have not gone so smoothly for the opposition Labour Party. Among Labour lawmakers, familiar wounds have reopened over the more ambivalent stance of its left-wing leader, Jeremy Corbyn.Twice in Parliament this week, Mr. Corbyn, whose political views were forged in his leftist activism in the 1980s, has eschewed the supportive, cheerleading role that opposition leaders traditionally play to the prime minister when Britain is in conflict with a foreign power. At times, in his reluctance to criticize Moscow, he sounded like his ideological opposite, President Trump.While he condemned the attack in Salisbury, England, as an “appalling act of violence,” Mr. Corbyn has claimed that the Conservatives took donations from wealthy Russians, and he has highlighted cuts to the British Foreign Office and called for the Russian authorities to be “held to ",
      "headline": "U.K. Labour Leader’s Stance on Russian Ex-Spy’s Poisoning Splits Party",
      "textLength": 5908,
      "source": "nytimes"
    }
  },
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "tone_name": "Anger",
                "tone_id": "anger",
                "score": 0.316304
              },
              {
                "tone_name": "Disgust",
                "tone_id": "disgust",
                "score": 0.241808
              },
              {
                "score": 0.238041,
                "tone_name": "Fear",
                "tone_id": "fear"
              },
              {
                "tone_name": "Joy",
                "tone_id": "joy",
                "score": 0.098653
              },
              {
                "tone_name": "Sadness",
                "tone_id": "sadness",
                "score": 0.409421
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "score": 0.31581,
                "tone_name": "Analytical",
                "tone_id": "analytical"
              },
              {
                "score": 0,
                "tone_name": "Confident",
                "tone_id": "confident"
              },
              {
                "tone_name": "Tentative",
                "tone_id": "tentative",
                "score": 0.44347
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "tone_name": "Openness",
                "tone_id": "openness_big5",
                "score": 0.212869
              },
              {
                "score": 0.886744,
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5"
              },
              {
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5",
                "score": 0.184435
              },
              {
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5",
                "score": 0.488598
              },
              {
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5",
                "score": 0.650161
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "keywords": [
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "sadness": 0.424998,
            "anger": 0.098901,
            "fear": 0.174941,
            "disgust": 0.254381,
            "joy": 0.193545
          },
          "relevance": 0.908679,
          "text": "LONDON—The opposition Labour"
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "sadness": 0.399777,
            "anger": 0.051984,
            "fear": 0.146597,
            "disgust": 0.275103,
            "joy": 0.124029
          },
          "relevance": 0.84193,
          "text": "leader Jeremy Corbyn"
        },
        {
          "emotion": {
            "fear": 0.174941,
            "disgust": 0.254381,
            "joy": 0.193545,
            "sadness": 0.424998,
            "anger": 0.098901
          },
          "relevance": 0.832499,
          "text": "close economic ties",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "fear": 0.146597,
            "disgust": 0.275103,
            "joy": 0.124029,
            "sadness": 0.399777,
            "anger": 0.051984
          },
          "relevance": 0.797033,
          "text": "Prime Minister Theresa"
        },
        {
          "emotion": {
            "sadness": 0.413656,
            "anger": 0.271518,
            "fear": 0.291242,
            "disgust": 0.099303,
            "joy": 0.032759
          },
          "relevance": 0.754478,
          "text": "early general election",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        },
        {
          "sentiment": {
            "label": "neutral",
            "score": 0
          },
          "emotion": {
            "fear": 0.174941,
            "disgust": 0.254381,
            "joy": 0.193545,
            "sadness": 0.424998,
            "anger": 0.098901
          },
          "relevance": 0.610142,
          "text": "European Union"
        },
        {
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "emotion": {
            "sadness": 0.424998,
            "anger": 0.098901,
            "fear": 0.174941,
            "disgust": 0.254381,
            "joy": 0.193545
          },
          "relevance": 0.606541,
          "text": "new strategy"
        },
        {
          "emotion": {
            "sadness": 0.399777,
            "anger": 0.051984,
            "fear": 0.146597,
            "disgust": 0.275103,
            "joy": 0.124029
          },
          "relevance": 0.577192,
          "text": "Brexit strategy",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "sentiment": {
            "label": "neutral",
            "score": 0
          },
          "emotion": {
            "sadness": 0.424998,
            "anger": 0.098901,
            "fear": 0.174941,
            "disgust": 0.254381,
            "joy": 0.193545
          },
          "relevance": 0.484638,
          "text": "bloc"
        },
        {
          "emotion": {
            "fear": 0.146597,
            "disgust": 0.275103,
            "joy": 0.124029,
            "sadness": 0.399777,
            "anger": 0.051984
          },
          "relevance": 0.461839,
          "text": "defeat",
          "sentiment": {
            "label": "neutral",
            "score": 0
          }
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "fear": 0.130003,
            "disgust": 0.381569,
            "joy": 0.099296,
            "sadness": 0.531013,
            "anger": 0.120084
          }
        }
      },
      "sentiment": {
        "document": {
          "score": 0,
          "label": "neutral"
        }
      },
      "usage": {
        "text_characters": 500,
        "text_units": 1,
        "features": 3
      }
    },
    "info": {
      "headline": "U.K. Labour Party Sets New Brexit Stand, Favors Strong EU Ties",
      "textLength": 526,
      "source": "wsj",
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "url": "https://www.wsj.com/articles/uk-labour-party-set-to-throw-new-doubt-on-governments-brexit-proposals-1519564402",
      "text": "LONDON—The opposition Labour Party is poised to announce a new strategy aimed at forcing Britain to maintain close economic ties with the European Union after it leaves the bloc. After months of sitting on the fence on the issue, Labour leader Jeremy Corbyn was expected to put forward in a speech Monday a program intended to ensure a defeat in Parliament for the Brexit strategy of Prime Minister Theresa May’s government, which would precipitate an early general election. The vote is next scheduled for 2022...."
    }
  },
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "category_name": "Emotion Tone",
            "tones": [
              {
                "tone_name": "Anger",
                "tone_id": "anger",
                "score": 0.316304
              },
              {
                "tone_name": "Disgust",
                "tone_id": "disgust",
                "score": 0.241808
              },
              {
                "score": 0.238041,
                "tone_name": "Fear",
                "tone_id": "fear"
              },
              {
                "tone_name": "Joy",
                "tone_id": "joy",
                "score": 0.098653
              },
              {
                "score": 0.409421,
                "tone_name": "Sadness",
                "tone_id": "sadness"
              }
            ],
            "category_id": "emotion_tone"
          },
          {
            "category_name": "Language Tone",
            "tones": [
              {
                "score": 0.31581,
                "tone_name": "Analytical",
                "tone_id": "analytical"
              },
              {
                "tone_name": "Confident",
                "tone_id": "confident",
                "score": 0
              },
              {
                "tone_name": "Tentative",
                "tone_id": "tentative",
                "score": 0.44347
              }
            ],
            "category_id": "language_tone"
          },
          {
            "category_name": "Social Tone",
            "tones": [
              {
                "tone_name": "Openness",
                "tone_id": "openness_big5",
                "score": 0.212869
              },
              {
                "tone_name": "Conscientiousness",
                "tone_id": "conscientiousness_big5",
                "score": 0.886744
              },
              {
                "score": 0.184435,
                "tone_name": "Extraversion",
                "tone_id": "extraversion_big5"
              },
              {
                "tone_name": "Agreeableness",
                "tone_id": "agreeableness_big5",
                "score": 0.488598
              },
              {
                "tone_name": "Emotional Range",
                "tone_id": "emotional_range_big5",
                "score": 0.650161
              }
            ],
            "category_id": "social_tone"
          }
        ]
      }
    },
    "nlu": {
      "sentiment": {
        "document": {
          "score": -0.485422,
          "label": "negative"
        }
      },
      "usage": {
        "text_characters": 112,
        "text_units": 1,
        "features": 3
      },
      "keywords": [
        {
          "sentiment": {
            "label": "negative",
            "score": -0.381083
          },
          "emotion": {
            "sadness": 0.656915,
            "anger": 0.172664,
            "fear": 0.101353,
            "disgust": 0.158088,
            "joy": 0.126305
          },
          "relevance": 0.920542,
          "text": "extreme political news"
        },
        {
          "emotion": {
            "sadness": 0.540526,
            "anger": 0.081936,
            "fear": 0.08981,
            "disgust": 0.159485,
            "joy": 0.22512
          },
          "relevance": 0.732749,
          "text": "biggest stories",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "emotion": {
            "sadness": 0.540526,
            "anger": 0.081936,
            "fear": 0.08981,
            "disgust": 0.159485,
            "joy": 0.22512
          },
          "relevance": 0.459481,
          "text": "Parliament",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          }
        },
        {
          "sentiment": {
            "label": "neutral",
            "score": 0
          },
          "emotion": {
            "fear": 0.08981,
            "disgust": 0.159485,
            "joy": 0.22512,
            "sadness": 0.540526,
            "anger": 0.081936
          },
          "relevance": 0.246377,
          "text": "centre"
        }
      ],
      "language": "en",
      "emotion": {
        "document": {
          "emotion": {
            "fear": 0.08925,
            "disgust": 0.182757,
            "joy": 0.152064,
            "sadness": 0.669429,
            "anger": 0.117502
          }
        }
      }
    },
    "info": {
      "url": "http://www.bbc.co.uk/news/uk-politics-parliaments-42406032",
      "parent": "https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html",
      "headline": "Why Parliament led the news in 2017",
      "text": "It's been another year of extreme political news - with Parliament at the centre of many of the biggest stories."
    }
  }
]


export default connect (mapState, mapDispatch)(BarChart)

