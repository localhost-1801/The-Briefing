import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { ArticleAnalyzer, RadarChart, Tweets, StackedBar, SingleBarChart, OverallSentimentAnalysisWithProps, KeywordBoxWProps, RadarChartWProps, Categories, BarChart } from '../components'
import ReactLoading from 'react-loading';
import history from '../history';
import { Header, Icon, Image, Table, Grid, Button, Checkbox, Form, Segment } from 'semantic-ui-react'
import { makeRelatedArticles, fetchRelatedArticles } from '../store/relatedArticles'

class singleArticleData extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount(){
        console.log(window.location.href)
        if (window.location.href.indexOf('=') > 0) {
            const url = window.location.href.slice(window.location.href.indexOf('=') + 1)
            console.log('url from extension: ', url)
            this.props.singleArticleAnalysis(url)
        }

        if (this.props.singleArticle.info === undefined) {
            console.log('fetching with localstorage info')
            this.props.fetchingArticleInfo(JSON.parse(window.localStorage.getItem('singleArticle')).info.url);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps) {
            return true;
        }
    }

    render() {
        if (this.props.singleArticle.message){
            return <div>{this.props.singleArticle.message}</div>
        }
        if (this.props.singleArticle.info === undefined){
            return (
                <div>
                    <br />
                    <Grid centered columns={4}>
                        <Grid.Column>
                        </Grid.Column>
                        <Grid.Column>
                            <div className="loading">
                                <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid>
                </div>
            )
        } else {
            // singleArticleData={this.props.singleArticle.tone.document_tone.tone_categories}
            // const singleArticle = Object.keys(this.props.singleArticle).length === 0 ? JSON.parse(window.localStorage.getItem('singleArticle')) : this.props.singleArticle
            return (
                <div>
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='newspaper' circular />
                            <Header.Content>{this.props.singleArticle.info.headline}
                            </Header.Content>
                        </Header>
<br />
                    <Grid columns={3}>
                        <Grid.Row stretched>
                            <Grid.Column>
                            <Table color={'blue'} size='small'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>KEYWORDS</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell><KeywordBoxWProps /></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                                <Table color={'blue'} size='small'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>OVERALL SENTIMENT ANALYSIS</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell><OverallSentimentAnalysisWithProps /></Table.Cell>
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
                                    <Table.Cell><RadarChartWProps /></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                            </Grid.Column>
                            <Grid.Column>

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

                            <Table color={'blue'} size='small'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>BAR CHART</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell><SingleBarChart /></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                            </Grid.Column>
                            <Grid.Column>
                                <Table color={'blue'} size='small'>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>RELATED TWEETS</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell><Tweets /></Table.Cell>
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
}


const mapState = ({ singleArticle }) => ({ singleArticle })
const mapDispatch = (dispatch, ownProps) => ({
    fetchingArticleInfo(url) {
        dispatch(fetchArticleData(url))
        dispatch(fetchRelatedArticles(url))
    },

    singleArticleAnalysis(articleUrl) {
      dispatch(makeArticle(articleUrl)).then((res) => {
        if (!res.message) {
          const keywords = res.nlu.entities[0].text
          dispatch(makeRelatedArticles(keywords, articleUrl))
        }
        // console.log('in dispatch then', res);
        // const keywords = res.nlu.keywords.map(obj => obj.text)
        // console.log(keywords)
      }).catch(err => console.log(err))
      history.push('/singleArticleData')
    }
  })

export default connect(mapState, mapDispatch)(singleArticleData)
