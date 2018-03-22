import React from 'react';
import { connect } from 'react-redux';
import { ResponsiveBubble } from '@nivo/circle-packing';


class BubbleChart extends React.Component {
  constructor(){
    super()

    this.state = {
      aggregate: false
    }
  }

  parseData(data){
    let resultArr = [];
    data.nlu.keywords.forEach(keyword => {
      let resultObj = {};
      resultObj.name = keyword.text;
      resultObj.color = 'hsl(' + Math.floor(Math.random() * 366) + ', 70%, 50%)';
      resultObj.loc = Math.floor(keyword.relevance * 100);
      resultArr.push(resultObj);
    })
    return resultArr
  }

  parseDataMultiple(data){

  }

  render(){
    // if(this.props.relatedArticles.length === 0 || this.props.singleArticle.tone === undefined){
    //   return (<div>no related articles</div>)
    // }
    let bubbleData = [];
    if (this.state.aggregate){
      bubbleData = this.parseDataMultiple(dummyRelatedArticles)
    } else {
      bubbleData = this.parseData(dummySingleArticle)
    }
    return(
      <div className='bubbleWrapper'>
      <ResponsiveBubble
        root={
          {
            "name": "pie",
            "color": "hsl(284, 70%, 50%)",
            "children": bubbleData
          }
        }
        margin={{
            "top": 20,
            "right": 20,
            "bottom": 20,
            "left": 20
        }}
        identity="name"
        value="loc"
        colors="nivo"
        colorBy="name"
        leavesOnly={true}
        padding={6}
        labelTextColor="inherit:darker(0.8)"
        borderWidth={2}
        fill={[
            {
                "match": {
                    "depth": 1
                },
                "id": "lines"
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={12}
    />
  </div>
    )
  }
}

let dummyRelatedArticles = [
  {
    "tone": {
      "document_tone": {
        "tone_categories": [
          {
            "tones": [
              {
                "score": 0.232548,
                "tone_id": "anger",
                "tone_name": "Anger"
              },
              {
                "score": 0.012213,
                "tone_id": "disgust",
                "tone_name": "Disgust"
              },
              {
                "score": 0.174107,
                "tone_id": "fear",
                "tone_name": "Fear"
              },
              {
                "score": 0.283735,
                "tone_id": "joy",
                "tone_name": "Joy"
              },
              {
                "score": 0.481763,
                "tone_id": "sadness",
                "tone_name": "Sadness"
              }
            ],
            "category_id": "emotion_tone",
            "category_name": "Emotion Tone"
          },
          {
            "tones": [
              {
                "score": 0.124334,
                "tone_id": "analytical",
                "tone_name": "Analytical"
              },
              {
                "score": 0,
                "tone_id": "confident",
                "tone_name": "Confident"
              },
              {
                "score": 0.349867,
                "tone_id": "tentative",
                "tone_name": "Tentative"
              }
            ],
            "category_id": "language_tone",
            "category_name": "Language Tone"
          },
          {
            "tones": [
              {
                "score": 0.6658,
                "tone_id": "openness_big5",
                "tone_name": "Openness"
              },
              {
                "score": 0.541779,
                "tone_id": "conscientiousness_big5",
                "tone_name": "Conscientiousness"
              },
              {
                "score": 0.746199,
                "tone_id": "extraversion_big5",
                "tone_name": "Extraversion"
              },
              {
                "score": 0.349876,
                "tone_id": "agreeableness_big5",
                "tone_name": "Agreeableness"
              },
              {
                "score": 0.766059,
                "tone_id": "emotional_range_big5",
                "tone_name": "Emotional Range"
              }
            ],
            "category_id": "social_tone",
            "category_name": "Social Tone"
          }
        ]
      }
    },
    "nlu": {
      "usage": {
        "text_units": 1,
        "text_characters": 1000,
        "features": 5
      },
      "sentiment": {
        "document": {
          "score": -0.819524,
          "label": "negative"
        }
      },
      "language": "en",
      "keywords": [
        {
          "text": "trade war",
          "sentiment": {
            "score": -0.445513,
            "label": "negative"
          },
          "relevance": 0.907881,
          "emotion": {
            "sadness": 0.406554,
            "joy": 0.367543,
            "fear": 0.261429,
            "disgust": 0.026899,
            "anger": 0.103946
          }
        },
        {
          "text": "tougher government oversight",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "relevance": 0.783026,
          "emotion": {
            "sadness": 0.606743,
            "joy": 0.03384,
            "fear": 0.165455,
            "disgust": 0.030225,
            "anger": 0.179805
          }
        },
        {
          "text": "large technology companies",
          "sentiment": {
            "score": -0.348656,
            "label": "negative"
          },
          "relevance": 0.714685,
          "emotion": {
            "sadness": 0.385779,
            "joy": 0.370927,
            "fear": 0.191185,
            "disgust": 0.011297,
            "anger": 0.060345
          }
        },
        {
          "text": "President Trump",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "relevance": 0.541278,
          "emotion": {
            "sadness": 0.157776,
            "joy": 0.606648,
            "fear": 0.034633,
            "disgust": 0.021819,
            "anger": 0.104998
          }
        },
        {
          "text": "annual tariffs",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "relevance": 0.53161,
          "emotion": {
            "sadness": 0.157776,
            "joy": 0.606648,
            "fear": 0.034633,
            "disgust": 0.021819,
            "anger": 0.104998
          }
        },
        {
          "text": "trade tensions",
          "sentiment": {
            "score": -0.691999,
            "label": "negative"
          },
          "relevance": 0.519818,
          "emotion": {
            "sadness": 0.146549,
            "joy": 0.52143,
            "fear": 0.193964,
            "disgust": 0.035501,
            "anger": 0.116503
          }
        },
        {
          "text": "Global markets",
          "sentiment": {
            "score": -0.537335,
            "label": "negative"
          },
          "relevance": 0.511001,
          "emotion": {
            "sadness": 0.348088,
            "joy": 0.347769,
            "fear": 0.19265,
            "disgust": 0.018238,
            "anger": 0.273156
          }
        },
        {
          "text": "Chinese imports",
          "sentiment": {
            "score": 0,
            "label": "neutral"
          },
          "relevance": 0.510549,
          "emotion": {
            "sadness": 0.157776,
            "joy": 0.606648,
            "fear": 0.034633,
            "disgust": 0.021819,
            "anger": 0.104998
          }
        },
        {
          "text": "United States",
          "sentiment": {
            "score": -0.537335,
            "label": "negative"
          },
          "relevance": 0.504525,
          "emotion": {
            "sadness": 0.348088,
            "joy": 0.347769,
            "fear": 0.19265,
            "disgust": 0.018238,
            "anger": 0.273156
          }
        }
      ],
      "entities": [
        {
          "type": "Person",
          "text": "President Trump",
          "relevance": 0.527259,
          "count": 1
        },
        {
          "type": "Company",
          "text": "Facebook",
          "relevance": 0.442729,
          "disambiguation": {
            "subtype": [
              "Website",
              "VentureFundedCompany"
            ],
            "name": "Facebook",
            "dbpedia_resource": "http://dbpedia.org/resource/Facebook"
          },
          "count": 1
        },
        {
          "type": "Location",
          "text": "United States",
          "relevance": 0.435659,
          "disambiguation": {
            "subtype": [
              "Region",
              "AdministrativeDivision",
              "GovernmentalJurisdiction",
              "FilmEditor",
              "Country"
            ],
            "name": "United States",
            "dbpedia_resource": "http://dbpedia.org/resource/United_States"
          },
          "count": 1
        },
        {
          "type": "Company",
          "text": "Boeing",
          "relevance": 0.428357,
          "disambiguation": {
            "subtype": [
              "AircraftManufacturer"
            ],
            "name": "Spirit AeroSystems",
            "dbpedia_resource": "http://dbpedia.org/resource/Spirit_AeroSystems"
          },
          "count": 1
        }
      ],
      "emotion": {
        "document": {
          "emotion": {
            "sadness": 0.481763,
            "joy": 0.283735,
            "fear": 0.174107,
            "disgust": 0.012213,
            "anger": 0.232548
          }
        }
      },
      "categories": [
        {
          "score": 0.58337,
          "label": "/finance/investing/stocks"
        },
        {
          "score": 0.421619,
          "label": "/technology and computing/consumer electronics/telephones/mobile phones/smart phones"
        },
        {
          "score": 0.281061,
          "label": "/technology and computing/internet technology/social network"
        }
      ]
    },
    "info": {
      "url": "https://www.nytimes.com/2018/03/22/business/dow-sp-trade.html",
      "source": "nytimes",
      "headline": "Stock Markets Tumble Amid Heightening Tensions Over Trade",
      "textLength": 1413,
      "text": "Global markets shuddered on Thursday as investors began to take seriously the prospect of a trade war between the world’s two largest economies.Stocks in the United States fell for a second straight day, as President Trump imposed $60 billion worth of annual tariffs on Chinese imports, and investors’ concerns about the growing trade tensions mounted.After wobbling throughout the day, the Standard & Poor’s 500 index turned decisively lower in the last hour of trading, closing down by 2.5 percent. That put the index into negative territory for the year.Large exporters, whose fortunes could be harmed by a trade war, were hit especially hard. Shares of Boeing, one of the country’s largest exporters, and Caterpillar, which counts China as an important market, both fell about 5 percent.The specter of a trade war also battered shares of large technology companies, which already have been reeling in anticipation of tougher government oversight. Facebook slumped by more than 2 percent, and Goog",
      "parent": "https://www.nytimes.com/2018/03/22/business/dow-sp-trade.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news"
    }
  }
]
let dummySingleArticle = {
  "tone": {
    "document_tone": {
      "tone_categories": [
        {
          "tones": [
            {
              "score": 0.232548,
              "tone_id": "anger",
              "tone_name": "Anger"
            },
            {
              "score": 0.012213,
              "tone_id": "disgust",
              "tone_name": "Disgust"
            },
            {
              "score": 0.174107,
              "tone_id": "fear",
              "tone_name": "Fear"
            },
            {
              "score": 0.283735,
              "tone_id": "joy",
              "tone_name": "Joy"
            },
            {
              "score": 0.481763,
              "tone_id": "sadness",
              "tone_name": "Sadness"
            }
          ],
          "category_id": "emotion_tone",
          "category_name": "Emotion Tone"
        },
        {
          "tones": [
            {
              "score": 0.124334,
              "tone_id": "analytical",
              "tone_name": "Analytical"
            },
            {
              "score": 0,
              "tone_id": "confident",
              "tone_name": "Confident"
            },
            {
              "score": 0.349867,
              "tone_id": "tentative",
              "tone_name": "Tentative"
            }
          ],
          "category_id": "language_tone",
          "category_name": "Language Tone"
        },
        {
          "tones": [
            {
              "score": 0.6658,
              "tone_id": "openness_big5",
              "tone_name": "Openness"
            },
            {
              "score": 0.541779,
              "tone_id": "conscientiousness_big5",
              "tone_name": "Conscientiousness"
            },
            {
              "score": 0.746199,
              "tone_id": "extraversion_big5",
              "tone_name": "Extraversion"
            },
            {
              "score": 0.349876,
              "tone_id": "agreeableness_big5",
              "tone_name": "Agreeableness"
            },
            {
              "score": 0.766059,
              "tone_id": "emotional_range_big5",
              "tone_name": "Emotional Range"
            }
          ],
          "category_id": "social_tone",
          "category_name": "Social Tone"
        }
      ]
    }
  },
  "nlu": {
    "usage": {
      "text_units": 1,
      "text_characters": 1000,
      "features": 5
    },
    "sentiment": {
      "document": {
        "score": -0.819524,
        "label": "negative"
      }
    },
    "language": "en",
    "keywords": [
      {
        "text": "trade war",
        "sentiment": {
          "score": -0.445513,
          "label": "negative"
        },
        "relevance": 0.907881,
        "emotion": {
          "sadness": 0.406554,
          "joy": 0.367543,
          "fear": 0.261429,
          "disgust": 0.026899,
          "anger": 0.103946
        }
      },
      {
        "text": "tougher government oversight",
        "sentiment": {
          "score": 0,
          "label": "neutral"
        },
        "relevance": 0.783026,
        "emotion": {
          "sadness": 0.606743,
          "joy": 0.03384,
          "fear": 0.165455,
          "disgust": 0.030225,
          "anger": 0.179805
        }
      },
      {
        "text": "large technology companies",
        "sentiment": {
          "score": -0.348656,
          "label": "negative"
        },
        "relevance": 0.714685,
        "emotion": {
          "sadness": 0.385779,
          "joy": 0.370927,
          "fear": 0.191185,
          "disgust": 0.011297,
          "anger": 0.060345
        }
      },
      {
        "text": "President Trump",
        "sentiment": {
          "score": 0,
          "label": "neutral"
        },
        "relevance": 0.541278,
        "emotion": {
          "sadness": 0.157776,
          "joy": 0.606648,
          "fear": 0.034633,
          "disgust": 0.021819,
          "anger": 0.104998
        }
      },
      {
        "text": "annual tariffs",
        "sentiment": {
          "score": 0,
          "label": "neutral"
        },
        "relevance": 0.53161,
        "emotion": {
          "sadness": 0.157776,
          "joy": 0.606648,
          "fear": 0.034633,
          "disgust": 0.021819,
          "anger": 0.104998
        }
      },
      {
        "text": "trade tensions",
        "sentiment": {
          "score": -0.691999,
          "label": "negative"
        },
        "relevance": 0.519818,
        "emotion": {
          "sadness": 0.146549,
          "joy": 0.52143,
          "fear": 0.193964,
          "disgust": 0.035501,
          "anger": 0.116503
        }
      },
      {
        "text": "Global markets",
        "sentiment": {
          "score": -0.537335,
          "label": "negative"
        },
        "relevance": 0.511001,
        "emotion": {
          "sadness": 0.348088,
          "joy": 0.347769,
          "fear": 0.19265,
          "disgust": 0.018238,
          "anger": 0.273156
        }
      },
      {
        "text": "Chinese imports",
        "sentiment": {
          "score": 0,
          "label": "neutral"
        },
        "relevance": 0.510549,
        "emotion": {
          "sadness": 0.157776,
          "joy": 0.606648,
          "fear": 0.034633,
          "disgust": 0.021819,
          "anger": 0.104998
        }
      },
      {
        "text": "United States",
        "sentiment": {
          "score": -0.537335,
          "label": "negative"
        },
        "relevance": 0.504525,
        "emotion": {
          "sadness": 0.348088,
          "joy": 0.347769,
          "fear": 0.19265,
          "disgust": 0.018238,
          "anger": 0.273156
        }
      }
    ],
    "entities": [
      {
        "type": "Person",
        "text": "President Trump",
        "relevance": 0.527259,
        "count": 1
      },
      {
        "type": "Company",
        "text": "Facebook",
        "relevance": 0.442729,
        "disambiguation": {
          "subtype": [
            "Website",
            "VentureFundedCompany"
          ],
          "name": "Facebook",
          "dbpedia_resource": "http://dbpedia.org/resource/Facebook"
        },
        "count": 1
      },
      {
        "type": "Location",
        "text": "United States",
        "relevance": 0.435659,
        "disambiguation": {
          "subtype": [
            "Region",
            "AdministrativeDivision",
            "GovernmentalJurisdiction",
            "FilmEditor",
            "Country"
          ],
          "name": "United States",
          "dbpedia_resource": "http://dbpedia.org/resource/United_States"
        },
        "count": 1
      },
      {
        "type": "Company",
        "text": "Boeing",
        "relevance": 0.428357,
        "disambiguation": {
          "subtype": [
            "AircraftManufacturer"
          ],
          "name": "Spirit AeroSystems",
          "dbpedia_resource": "http://dbpedia.org/resource/Spirit_AeroSystems"
        },
        "count": 1
      }
    ],
    "emotion": {
      "document": {
        "emotion": {
          "sadness": 0.481763,
          "joy": 0.283735,
          "fear": 0.174107,
          "disgust": 0.012213,
          "anger": 0.232548
        }
      }
    },
    "categories": [
      {
        "score": 0.58337,
        "label": "/finance/investing/stocks"
      },
      {
        "score": 0.421619,
        "label": "/technology and computing/consumer electronics/telephones/mobile phones/smart phones"
      },
      {
        "score": 0.281061,
        "label": "/technology and computing/internet technology/social network"
      }
    ]
  },
  "info": {
    "url": "https://www.nytimes.com/2018/03/22/business/dow-sp-trade.html",
    "source": "nytimes",
    "headline": "Stock Markets Tumble Amid Heightening Tensions Over Trade",
    "textLength": 1413,
    "text": "Global markets shuddered on Thursday as investors began to take seriously the prospect of a trade war between the world’s two largest economies.Stocks in the United States fell for a second straight day, as President Trump imposed $60 billion worth of annual tariffs on Chinese imports, and investors’ concerns about the growing trade tensions mounted.After wobbling throughout the day, the Standard & Poor’s 500 index turned decisively lower in the last hour of trading, closing down by 2.5 percent. That put the index into negative territory for the year.Large exporters, whose fortunes could be harmed by a trade war, were hit especially hard. Shares of Boeing, one of the country’s largest exporters, and Caterpillar, which counts China as an important market, both fell about 5 percent.The specter of a trade war also battered shares of large technology companies, which already have been reeling in anticipation of tougher government oversight. Facebook slumped by more than 2 percent, and Goog"
  },
  "tweets": [
    {
      "text": "RT @Lrihendry: PLEASE Mr President bring Eric on board!  You need loyal and capable people to help you realize the #MAGA agenda!  @ericboll…",
      "user": {
        "name": "neff630",
        "profilePic": "http://pbs.twimg.com/profile_images/855433361367728128/MHBQL6Lr_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:47 +0000 2018"
    },
    {
      "text": "RT @WhiteHouse: The omnibus budget fulfills key conservative principles held by President Trump and the American people. https://t.co/2VDoj…",
      "user": {
        "name": "mattdt1138",
        "profilePic": "http://pbs.twimg.com/profile_images/649348315637649408/4laGmoFD_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:47 +0000 2018"
    },
    {
      "text": "RT @ProudResister: John Dowd after resigning as Trump’s lawyer in Russia Probe: “I love the President and I wish him well.”\n\nWhat he wishes…",
      "user": {
        "name": "EdwinJoseph53",
        "profilePic": "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
      },
      "timeStamp": "Thu Mar 22 21:08:46 +0000 2018"
    },
    {
      "text": "RT @WhiteHouse: The omnibus budget fulfills key conservative principles held by President Trump and the American people. https://t.co/2VDoj…",
      "user": {
        "name": "Italians4Trump",
        "profilePic": "http://pbs.twimg.com/profile_images/877544767055429636/pDRBFpaq_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:46 +0000 2018"
    },
    {
      "text": "Our legal director @justingflorence wrote in @TIME about the Summer Zervos lawsuit against @realDonaldTrump. He say… https://t.co/NtBo8NgTlM",
      "user": {
        "name": "protctdemocracy",
        "profilePic": "http://pbs.twimg.com/profile_images/918866747540824068/Qd2NPOAy_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:46 +0000 2018"
    },
    {
      "text": "RT @JonLemire: Bannon on Dowd: “He got fired.”  He says Dowd and Cobb made mistakes being too cooperative with Mueller. \n\n“I think Presiden…",
      "user": {
        "name": "DuaneBratt",
        "profilePic": "http://pbs.twimg.com/profile_images/655930543045873664/NB6Sn9W3_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:46 +0000 2018"
    },
    {
      "text": "President Trump, your base has been betrayed by the RINOs!\n#VetoTheOmnibus https://t.co/s3XYIYJicm",
      "user": {
        "name": "Holly97701",
        "profilePic": "http://pbs.twimg.com/profile_images/912169984880603138/VYwXU6yH_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:46 +0000 2018"
    },
    {
      "text": "RT @funder: Trump is the most corrupt president in the history of the United States. Retweet if you agree. #ProtectMueller",
      "user": {
        "name": "lestampa3",
        "profilePic": "http://pbs.twimg.com/profile_images/921767218035281920/AigVvSaT_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:46 +0000 2018"
    },
    {
      "text": "Trump is “the least trigger happy president we’ve had in a long long time.”",
      "user": {
        "name": "pkafka",
        "profilePic": "http://pbs.twimg.com/profile_images/432503235/monkey_types_normal.png"
      },
      "timeStamp": "Thu Mar 22 21:08:46 +0000 2018"
    },
    {
      "text": "RT @EdKrassen: A Judge ruled that Trump is not immune from a defamation suit filed against him by former Apprentice contestant, Summer Zerv…",
      "user": {
        "name": "dpt7401",
        "profilePic": "http://pbs.twimg.com/profile_images/830029280277065728/ZYdVBcov_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:46 +0000 2018"
    },
    {
      "text": "RT @scottlincicome: 66% see trade as an opportunity\n20% see trade as a threat\n\nThank you, President Trump! 😉 https://t.co/ygaNAogtH8",
      "user": {
        "name": "rhcm123",
        "profilePic": "http://pbs.twimg.com/profile_images/937783371429830656/h187gaHn_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:45 +0000 2018"
    },
    {
      "text": "RT @Barnes_Law: Trump would have made a great defense lawyer: \"Trump wants to flip the script and investigate his investigators.\"  https://…",
      "user": {
        "name": "PennsylvaniaRed",
        "profilePic": "http://pbs.twimg.com/profile_images/70433192/Acron_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:44 +0000 2018"
    },
    {
      "text": "RT @Trumperland: #ThursdayThoughts\n\nVETO THE OMNIBUS \nSCRAP THE OMNIBUS\nDRAIN THE SWAMP\nON #WorldWaterDay\n#VetoTheBill #OmnibusBill\n#VetoTh…",
      "user": {
        "name": "PurpleBanana93",
        "profilePic": "http://pbs.twimg.com/profile_images/948651322399584256/N2l-Qmvh_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:44 +0000 2018"
    },
    {
      "text": "RT @WSBT: President Trump's proposed cuts to federal transportation funding could affect riders, jobs &amp; the economy. Not just in obvious wa…",
      "user": {
        "name": "suepermom1366",
        "profilePic": "http://pbs.twimg.com/profile_images/898697759250944000/b6LdmihT_normal.jpg"
      },
      "timeStamp": "Thu Mar 22 21:08:44 +0000 2018"
    },
    {
      "text": "RT @MatthewWolfff: Trump congratulates Putin on another sham election, Xi Jinping for becoming President for life. Erdogan, Kim Jung Un, Du…",
      "user": {
        "name": "kzoo_onica",
        "profilePic": "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
      },
      "timeStamp": "Thu Mar 22 21:08:44 +0000 2018"
    }
  ]
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

export default connect (mapState, mapDispatch)(BubbleChart)
