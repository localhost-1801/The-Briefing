import React, { Component } from 'react';

export default class KeywordBox extends Component {
  constructor(){
    super()
    this.state ={
      emotionKeyWords: [],
    }
  }

  componentWillMount(){
    this.setState({
      emotionKeyWords: this.parseData(this.props.singleArticle)
    })
  }

  parseData(data){
    let resultArr = []
    for(var i =0; i < 5; i++){
      // console.log(data.keywords[i].emotion);
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
    // console.log(resultArr)
    return resultArr;
  }

  render(){
    return(
      <div>
        {this.state.emotionKeyWords.map(emotionAndWord => {
          return(<div>{emotionAndWord.word + ' | ' + emotionAndWord.emotion}</div>)
        })}
      </div>
    )
  }
}
