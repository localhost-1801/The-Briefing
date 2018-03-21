import React, { Component } from 'react';
import { KeywordBox, RadarChart, OverallSentimentAnalysis, BarChart, MapIndex, ArticleAnalyzer, Sunburst } from '../components';
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
  render(){
    return (
      <div className="chartBackground">
    <Grid divided='vertically'>


    <Grid.Row centered columns={1} className="spacing">
      <Grid.Column>
<br/>
    <MapIndex />

      </Grid.Column>
    </Grid.Row>

    <Grid.Row centered columns={3} className="spacing">
      <Grid.Column>
      <Table size='small'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>RADAR CHART</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell><RadarChart/></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
      </Grid.Column>
      <Grid.Column>

      <Table size='small'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>OVERALL SENTIMENT ANALYSIS</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell><OverallSentimentAnalysis /></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>


      </Grid.Column>
      <Grid.Column>

      <Table size='small'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>BAR CHART</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell><BarChart/></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>


      </Grid.Column>
    </Grid.Row>

    <Grid.Row centered columns={2} className="spacing">
    <Grid.Column>

    <Table size='small'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>KEYWORDS AND EMOTION</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell><KeywordBox /></Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>

    </Grid.Column>
    <Grid.Column>

    <Table size='small'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>SUNBURST</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell><Sunburst /></Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>


    </Grid.Column>
  </Grid.Row>
</Grid>
</div>
    )
  }
}


const mapState = ({singleArticle, relatedArticles}) => ({singleArticle, relatedArticles})

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
