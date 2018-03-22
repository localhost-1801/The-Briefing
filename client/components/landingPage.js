import React, { Component } from 'react';
import { KeywordBox, RadarChart, OverallSentimentAnalysis, BarChart, MapIndex, ArticleAnalyzer, RelatedArticles } from '../components';
import { connect } from 'react-redux'
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { makeRelatedArticles } from '../store/relatedArticles'
import { Grid, Image, Table, Icon, Segment, Header } from 'semantic-ui-react'

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
    function formatDate(date) {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    let date = formatDate(new Date());

    return (
      <div>
      <br />
        <Header as='h2' icon textAlign='center'>
                            <Icon name='newspaper' circular />
                            <Header.Content>Today's Briefing
                            </Header.Content>
                            <p className="date spacing">{date.toUpperCase()}</p>
                        </Header>

        <Grid columns={3}>
          <Grid.Row stretched>
            <Grid.Column>
            <Table color={'blue'} size='small'>
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


          <Table color={'blue'} size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>RADAR CHART</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell><RadarChart /></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

            </Grid.Column>
            <Grid.Column>
            <MapIndex />

            <Table color={'blue'} size='small'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>BAR CHART</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell><BarChart /></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>


            </Grid.Column>
            <Grid.Column>
              <Table color={'blue'} size='small'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>TRENDING ARTICLES</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell><RelatedArticles /></Table.Cell>
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


const mapState = ({ singleArticle, relatedArticles }) => ({ singleArticle, relatedArticles })

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
