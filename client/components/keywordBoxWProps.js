import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchArticleData } from '../store/singleArticle'
import ReactLoading from 'react-loading';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

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
    // console.log(data)
    let resultArr = []
    for (var i = 0; i < data.keywords.length; i++) {
      let greatestEmotionScore = 0;
      let greatestEmotionTitle = '';
      if (!data.keywords[i].emotion) {
        data.keywords[i].emotion = { sadness: 0, joy: 0, fear: 0, disgust: 0, anger: 0, neutral: 1 }
      }
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
    if (this.props.singleArticle.info === undefined) {
      return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
    } else {
      let data = this.parseData(this.props.singleArticle.nlu).filter(word => {
        return word.word.includes('.') === false
      })
      // data = data.filter(word => {
      //   return word.word[0] === word.word[0].toUpperCase();
      // })
      return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Keyword</Table.HeaderCell>
              <Table.HeaderCell>Dominant Emotion</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(emotionAndWord => {
              return (
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
      )
    }
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