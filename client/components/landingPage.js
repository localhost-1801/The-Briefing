import React, { Component } from 'react';
import { KeywordBox, RadarChart, OverallSentimentAnalysis, BarChart, MapIndex, ArticleAnalyzer } from '../components';
import { connect } from 'react-redux'
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { makeRelatedArticles } from '../store/relatedArticles'

class LandingPage extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    let url = 'https://www.nytimes.com/2018/03/18/world/middleeast/afrin-turkey-syria.html'
    this.props.makeArticle('https://www.nytimes.com/2018/03/18/world/middleeast/afrin-turkey-syria.html')
    .then(res => {
        let keywords = res.emotion.keywords.map(obj => {
          return obj.text
        })
        this.props.makeRelatedArticles(keywords, this.props.singleArticle.info.url)
    })
  }
  render() {

    return (
      <div>
        <MapIndex />
        <BarChart />
        <OverallSentimentAnalysis />
        <KeywordBox />
        <ArticleAnalyzer />
        <RadarChart />
      </div>
    )
  }
}

const mapState = ({ singleArticle }) => ({ singleArticle })

const mapDispatch = ({ makeArticle, makeRelatedArticles })
// const mapDispatch = (dispatch) => {
//   return {
//     makeAndRelate(url){
//       dispatch(makeArticle(url))
//       // console.log('this is props',this.props.singleArticle)
//     }
//   }
// }



export default connect(mapState, mapDispatch)(LandingPage)
