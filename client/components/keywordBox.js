import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

export default class KeywordBox extends Component {
  constructor(){
    super()
    this.state ={
      emotionKeyWords: [],
    }
  }

  componentWillMount(){
    this.setState({
      emotionKeyWords: this.parseData(DummyData)
    })
  }

  parseData(data){
    let resultArr = []
    for(var i =0; i < 5; i++){
      console.log(data.keywords[i].emotion);
      let greatestEmotionScore = 0;
      let greatestEmotionTitle = '';
        Object.keys(data.keywords[i].emotion).forEach(emotionKey => {
          if(data.keywords[i].emotion[emotionKey] > greatestEmotionScore){
            greatestEmotionScore = data.keywords[i].emotion[emotionKey];
            greatestEmotionTitle = emotionKey;
          }
        })
        resultArr.push({
          word: data.keywords[i].text,
          emotion: greatestEmotionTitle
        })
    }
    console.log(resultArr)
    return resultArr;
  }

  render(){
    return(
      <div>
      <div className="chartBackground" >
        {this.state.emotionKeyWords.map(emotionAndWord => {
          return(<div key={emotionAndWord.word}>{emotionAndWord.word + ' | ' + emotionAndWord.emotion}</div>)
        })}
      </div>
      <div id='keywordTable'>
        <Table basic='very' celled unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Keyword</Table.HeaderCell>
              <Table.HeaderCell>Dominant Emotion</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        <Table.Body>
          {this.state.emotionKeyWords.map(emotionAndWord => {
            return(
            <Table.Row>
              <Table.Cell unstackable>
                {emotionAndWord.word}
              </Table.Cell>
              <Table.Cell>
                {emotionAndWord.emotion}
              </Table.Cell>
            </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
</div>
    )
  }
}

let DummyData =
  {"keywords": [
    {
      "text": "White House",
      "sentiment": {
        "score": 0.441798,
        "label": "positive"
      },
      "relevance": 0.943152,
      "emotion": {
        "sadness": 0.431599,
        "joy": 0.151194,
        "fear": 0.114763,
        "disgust": 0.226857,
        "anger": 0.243481
      }
    },
    {
      "text": "High School",
      "sentiment": {
        "score": -0.309269,
        "label": "negative"
      },
      "relevance": 0.900451,
      "emotion": {
        "sadness": 0.449967,
        "joy": 0.036634,
        "fear": 0.138146,
        "disgust": 0.293744,
        "anger": 0.442835
      }
    },
    {
      "text": "gun violence",
      "sentiment": {
        "score": -0.134909,
        "label": "negative"
      },
      "relevance": 0.817771,
      "emotion": {
        "sadness": 0.298115,
        "joy": 0.005206,
        "fear": 0.158663,
        "disgust": 0.264098,
        "anger": 0.647644
      }
    },
    {
      "text": "Douglas High School",
      "sentiment": {
        "score": -0.308495,
        "label": "negative"
      },
      "relevance": 0.764381,
      "emotion": {
        "sadness": 0.627595,
        "joy": 0.040646,
        "fear": 0.176499,
        "disgust": 0.135596,
        "anger": 0.33955
      }
    },
    {
      "text": "Florida school shooting",
      "sentiment": {
        "score": 0,
        "label": "neutral"
      },
      "relevance": 0.763269,
      "emotion": {
        "sadness": 0.377876,
        "joy": 0.072196,
        "fear": 0.268289,
        "disgust": 0.342497,
        "anger": 0.226906
      }
    },
    {
      "text": "National School Walkout",
      "sentiment": {
        "score": 0,
        "label": "neutral"
      },
      "relevance": 0.747525,
      "emotion": {
        "sadness": 0.409403,
        "joy": 0.185457,
        "fear": 0.178228,
        "disgust": 0.325708,
        "anger": 0.094622
      }
    },
    {
      "text": "Columbine High School",
      "sentiment": {
        "score": -0.347704,
        "label": "negative"
      },
      "relevance": 0.746049,
      "emotion": {
        "sadness": 0.526264,
        "joy": 0.05347,
        "fear": 0.142673,
        "disgust": 0.242677,
        "anger": 0.308122
      }
    },
    {
      "text": "Stoneman Douglas school",
      "sentiment": {
        "score": 0,
        "label": "neutral"
      },
      "relevance": 0.743,
      "emotion": {
        "sadness": 0.478878,
        "joy": 0.24559,
        "fear": 0.023356,
        "disgust": 0.338821,
        "anger": 0.089466
      }
    },
    {
      "text": "LaGuardia High School",
      "sentiment": {
        "score": 0,
        "label": "neutral"
      },
    }
  ]}
