import React, { Component } from 'react';
import {connect} from 'react-redux';

class KeywordBox extends Component {
  constructor(){
    super()
    this.state ={
      emotionKeyWords: [],
    }
  }

  componentWillMount(){
    console.log('single',this.props.singleArticle)
    this.setState({
      emotionKeyWords: this.parseData(this.props.singleArticle.nlu)
    })
  }

  parseData(data){
    console.log('data', data)
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

const mapState = ({singleArticle}) => ({singleArticle})
const mapDispatch = null;

export default connect(mapState, mapDispatch)(KeywordBox)

