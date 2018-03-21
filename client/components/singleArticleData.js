import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { ArticleAnalyzer, RadarChart } from '../components'
import KeywordBoxWProps from './keywordBoxWProps'
import RadarChartWProps from './radarChartWProps'
import ReactLoading from 'react-loading';
import history from '../history';
import StackedBar from './stackedBar'
import { Grid } from 'semantic-ui-react'
import SingleBarChart from './singleBarChart'
import OverallSentimentAnalysisWithProps from './overallSentimentAnalysisWithProps'

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
                        <ArticleAnalyzer />
                    </div>
                    <div><strong>Title: {this.props.singleArticle.info.headline}</strong>
                        <KeywordBoxWProps />
                        <OverallSentimentAnalysisWithProps/>
                        <StackedBar />
                        <SingleBarChart/>
                        {/* <KeywordBoxWProps singleArticle={this.props.singleArticle.emotion} /> */}
                        <RadarChartWProps />
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
