import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchArticleData } from '../store/singleArticle'
import ReactLoading from 'react-loading';

class KeywordBox extends Component {
  constructor() {
    super()
    this.state = {
      emotionKeyWords: [],
    }
  }

  componentWillMount() {
    this.props.loadData();
  }

  parseData(data) {
    let resultArr = []
    for (var i = 0; i < data.keywords.length; i++) {
      let greatestEmotionScore = 0;
      let greatestEmotionTitle = '';
      Object.keys(data.keywords[i].emotion).forEach(emotionKey => {
        if (data.keywords[i].emotion[emotionKey] > greatestEmotionScore) {
          greatestEmotionScore = data.keywords[i].emotion[emotionKey];
          greatestEmotionTitle = emotionKey;
        }
      })
      resultArr.push({
        word: data.keywords[i].text,
        emotion: greatestEmotionTitle
      })
    }
    return resultArr;
  }

  render() {
    if (this.props.singleArticle === undefined) {
      return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
    }
    let data = this.parseData(this.props.singleArticle.nlu)
    return (
      <div>
        {data.map(emotionAndWord => {
          return (<div>{emotionAndWord.word + ' | ' + emotionAndWord.emotion}</div>)
        })}
      </div>
    )
  }
}

const mapState = ({ singleArticle }) => ({ singleArticle })
const mapDispatch = (dispatch) => {
  return {
    loadData(url) {
      dispatch(fetchArticleData(url))
    }
  }
}

export default connect(mapState, mapDispatch)(KeywordBox)