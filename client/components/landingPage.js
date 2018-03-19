import React, { Component } from 'react';
import { KeywordBox, RadarChart, OverallSentimentAnalysis, BarChart, MapIndex, ArticleAnalyzer } from '../components';
import { connect } from 'react-redux'
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { makeRelatedArticles } from '../store/relatedArticles'
import { Grid, Image, Advertisement, Table } from 'semantic-ui-react'

class LandingPage extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    // let url = 'https://www.nytimes.com/2018/03/18/world/middleeast/afrin-turkey-syria.html'
    // this.props.makeArticle('https://www.nytimes.com/2018/03/18/world/middleeast/afrin-turkey-syria.html')
    // .then(res => {
    //     let keywords = res.emotion.keywords.map(obj => {
    //       return obj.text
    //     })
    //     this.props.makeRelatedArticles(keywords, this.props.singleArticle.info.url)
    // })
  }
  render() {
    return (
      <div className="landingPageBackground">
    <Grid divided='vertically'>


    <Grid.Row centered columns={1} className="spacing">
      <Grid.Column>
      <MapIndex/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row centered columns={3} className="spacing">
      <Grid.Column>
        <RadarChart/>
      </Grid.Column>
      <Grid.Column>
        <OverallSentimentAnalysis />
      </Grid.Column>
      <Grid.Column>
        <BarChart/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row centered columns={1} className="spacing">
    <Grid.Column>
    <KeywordBox />
    </Grid.Column>
  </Grid.Row>
</Grid>
</div>
    )
  }
}


// return (
//   <div>
//     <MapIndex />
//     <BarChart />
//     <OverallSentimentAnalysis />
//     <KeywordBox />
//     <ArticleAnalyzer />
//     <RadarChart />
//   </div>
// )


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
