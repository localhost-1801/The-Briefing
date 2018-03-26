import React, { Component } from 'react';
import { KeywordBox, RadarChart, OverallSentimentAnalysis, BarChart, MapIndex, ArticleAnalyzer, RelatedArticles } from '../components';
import { connect } from 'react-redux'
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { makeRelatedArticles } from '../store/relatedArticles'
import { Grid, Image, Table, Icon, Label, Button, Segment, Form, Header } from 'semantic-ui-react'
import { makelandingArticles } from '../store/landingPageArticles.js'
import { Link, NavLink } from "react-router-dom";
import history from '../history';


class LandingPage extends Component {
  constructor() {
    super()
    this.state = {
      articleUrl: ''
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    e.preventDefault();
    this.setState({ articleUrl: e.target.value })
  }


  componentWillMount() {
    // console.log(this.props)
    // this.props.loadData()
  }
  onSubmitHandler(e) {
    e.preventDefault();
    this.props.singleArticleAnalysis(this.state.articleUrl);
    this.setState({ articleUrl: '' })
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
      <div className="articleBackground">
        <div className="landingPageSearch">
          <br />
          <Header as='h2' icon textAlign='center'>
            <Icon name='search' circular />
            <Header.Content>Search News Article</Header.Content>
          </Header>
          <br />
          <p className="date spacing">Paste a news article URL below to do a comparative analysis</p>
          <Form className="spacing">
            <Form.Group unstackable>
              <input
                className="inputBar"
                placeholder='Search via Article URL'
                onChange={this.onChangeHandler}
                value={this.state.articleUrl}
              />
              <NavLink to="/singleArticleData">
                <Button type="submit" onClick={this.onSubmitHandler}>Submit</Button>
              </NavLink>
            </Form.Group>
          </Form>
          <br />
          <br />
          <div className="extension">
          <Button as='div' labelPosition='right'>
          <Button icon color='blue'>
            <Icon name='newspaper' />
          </Button>
          <Label as='a' basic color='blue' pointing='left'>Download Our Chrome Extension</Label>
        </Button>
        </div>
          <a href='#todaysBriefing'>
          <Image
            centered
            className="animated bounce arrow"
            src="img/arrow.png"
            size="tiny"
             />
            </a>

        </div>
        <div className="todaysBriefing articleBackground">
        <Header as="h2" icon textAlign="center" id="todaysBriefing">
          <Icon name="newspaper" circular />
          <Header.Content>Today's Briefing
                            </Header.Content>
          <p className="date spacing">{date.toUpperCase()}</p>
        </Header>

        <Grid columns={3}>
          <Grid.Row stretched>
            <Grid.Column>
              <Table color={'blue'} size="small">
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
      </div>
    )
  }
}

const mapState = ({ singleArticle, relatedArticles, landingPageArticles }) => ({ singleArticle, relatedArticles, landingPageArticles })


//const mapDispatch = ({ makeArticle, makeRelatedArticles })
const mapDispatch = (dispatch) => ({
  loadData() {
    dispatch(makelandingArticles())
  },

  singleArticleAnalysis(articleUrl) {
    dispatch(makeArticle(articleUrl)).then((res) => {
      if (!res.message) {
        const keywords = res.nlu.entities[0].text
        dispatch(makeRelatedArticles(keywords, articleUrl))
      }
    }).catch(err => console.log(err))
    history.push('/singleArticleData')
  }
})

export default connect(mapState, mapDispatch)(LandingPage)
