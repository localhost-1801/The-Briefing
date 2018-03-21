import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { ArticleAnalyzer, RadarChart, Tweets, StackedBar, SingleBarChart, OverallSentimentAnalysisWithProps, KeywordBoxWProps, RadarChartWProps } from '../components'
import ReactLoading from 'react-loading';
import history from '../history';
import { Header, Icon, Image, Table, Grid, Button, Checkbox, Form } from 'semantic-ui-react'

class singleArticleData extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps) {
            return true;
        }
    }

    render() {
        if (Object.keys(this.props.singleArticle).length === 0) {
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
            //singleArticleData={this.props.singleArticle.tone.document_tone.tone_categories}
            return (
                <div>
                    <div>
                        <br />
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='newspaper' circular />
                            <Header.Content>
                                {this.props.singleArticle.info.headline}
                            </Header.Content>
                        </Header>
                    </div>

                    <div>
                        <br />
                        <Grid>
                            <Grid.Row centered columns={3} className="spacing">
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
                                </Grid.Column>
                                <Grid.Column>

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
                                                <Table.Cell><Tweets /></Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>


                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row centered columns={2} className="spacing">
                                <Grid.Column>

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
                            </Grid.Row>
                        </Grid>
                    </div>


                </div>
            )
        }
    }
}


const mapState = ({ singleArticle }) => ({ singleArticle })
const mapDispatch = (dispatch, ownProps) => {
    return {
        loadData(url) {
            dispatch(fetchArticleData(url))
        }
    }
}

export default connect(mapState, mapDispatch)(singleArticleData)
