import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { ArticleAnalyzer, RadarChart, Tweets, StackedBar, SingleBarChart, OverallSentimentAnalysisWithProps, KeywordBoxWProps, RadarChartWProps, Categories, Tabs, BarChart, BubbleChart, RelatedArticlesSingle, SingleBarChartBackPage } from '../components'
import ReactLoading from 'react-loading';
import history from '../history';
import { Header, Icon, Image, Table, Grid, Button, Checkbox, Form, Segment } from 'semantic-ui-react'
import { makeRelatedArticles, fetchRelatedArticles } from '../store/relatedArticles'

class singleArticleData extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (window.location.href.indexOf('=') > 0) {
            const url = window.location.href.slice(window.location.href.indexOf('=') + 1)
            this.props.singleArticleAnalysis(url)
        }

        if (this.props.singleArticle.info === undefined) {
            if (JSON.parse(window.localStorage.getItem('singleArticle')) !== null){
                this.props.fetchingArticleInfo(JSON.parse(window.localStorage.getItem('singleArticle')).info.url);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps) {
            return true;
        }
    }

    render() {
        if (this.props.singleArticle.message) {
            return <div>{this.props.singleArticle.message}</div>
        }
        if (this.props.singleArticle.info === undefined) {
            return (
                <div className="singleArticleBackground">
                    <br />
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
            return (
                <div className="articleBackground">
                    <br />
                    <div>
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='newspaper' circular />
                            <Header.Content>{this.props.singleArticle.info.headline}
                            </Header.Content>
                        </Header>
                    </div>

                    <div>
                        <br />
                        <Grid centered columns={3} className="spacing">
                            <Grid.Row stretched>
                                <Grid.Column>
                                    <Table color={'teal'} size='small'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>KEYWORDS BY RELEVANCE</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell><BubbleChart /></Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>

                                    <Table color={'teal'} size='small'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>LANGUAGE TONE ANALYSIS</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell><SingleBarChartBackPage /></Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>

                                </Grid.Column>

                                <Grid.Column>
                                    <Table color={'teal'} size='small'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>OVERALL ARTICLE SENTIMENT ANALYSIS</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell><OverallSentimentAnalysisWithProps /></Table.Cell>
                                                <br />
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>

                                    <Table color={'teal'} size='small'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>EMOTIONAL ANALYSIS</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell><BarChart /></Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell><RadarChartWProps /></Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>

                                </Grid.Column>

                                <Grid.Column>

                                <Table color={'teal'} size='small'>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>TOP CATEGORIES</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell><Categories /></Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>

                                    <Table color={'teal'} size='small'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell><Icon name='twitter'/>RELEVANT TWEETS</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>
                                                <div className="tweets">
                                                <Tweets />
                                                </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>

                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered columns={1} className="spacing">
                                <Grid.Column>
                                    <RelatedArticlesSingle />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
            )
        }
    }
}


const mapState = ({ singleArticle }) => ({ singleArticle })
const mapDispatch = (dispatch, ownProps) => ({
    fetchingArticleInfo(url) {
        dispatch(fetchArticleData(url)).then(() => {
            dispatch(fetchRelatedArticles(url))

        })
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

export default connect(mapState, mapDispatch)(singleArticleData)
