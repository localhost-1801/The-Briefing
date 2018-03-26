import React, { Component } from 'react';
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import { fetchArticleData, makeArticle } from '../store/singleArticle'

// https://formidable.com/open-source/victory/gallery/animating-circular-progress-bar/

class OverallSentimentAnalysisWithProps extends Component {
    constructor() {
        super();
        this.state = {
            aggregate: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
      this.setState({
        aggregate: !this.state.aggregate
      })
    }


    getData(percent) {
        return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    }

    render() {
        if(this.props.relatedArticles.length === 0){
          return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
        }
        let data;
        let isPositiveInt;
        let label;
        if(this.state.aggregate){
          let aggregateNumber = this.props.relatedArticles.map(article => {
            return article.nlu.sentiment.document.score * 100
          }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          let average = (aggregateNumber / this.props.relatedArticles.length)
          isPositiveInt = average > 0 ? true : false;
          data = {
            percent: Math.abs(Math.floor(average)) || 0,
            data: this.getData(Math.abs(Math.floor(average))) || 0
            // }
          }
          if(average > 0){
            label = 'Positive'
          } else if(average < 0){
            label = 'Negative'
          } else {
            label = 'Neutral'
          }
        } else {
          isPositiveInt = (this.props.singleArticle.nlu.sentiment.document.score * 100) > 0 ? true : false;
          data = {
              percent: Math.abs(Math.floor(this.props.singleArticle.nlu.sentiment.document.score  * 100)) || 0,
              data: this.getData(Math.abs(Math.floor(this.props.singleArticle.nlu.sentiment.document.score * 100))) || 0
          }
          let evalScore = this.props.singleArticle.nlu.sentiment.document.score
          if(evalScore > 0){
            label = 'Positive'
          } else if(evalScore < 0){
            label = 'Negative'
          } else {
            label = 'Neutral'
          }
        }
                // if (this.state.bool) {
            // data = { percent: 0, data: [{ x: 1, y: 0 }, { x: 2, y: 100 }] }
        // } else {
        //     data = {
        //         percent: Math.abs(Math.floor(this.props.singleArticle.nlu.sentiment.document.score  * 100)) || 50,
        //         data: this.getData(Math.abs(Math.floor(this.props.singleArticle.nlu.sentiment.document.score * 100))) || 50
        //     // }
        // }
        //[{x:1, y:79}, {x:2, y:21}]

        //    [{x:1, y:0}, {x:2, y:100}]
        // {percent: 70, data: [{x:1, y:70}, {x:2, y:30}]}
        return (
            <div className="chartBackground">
              <button onClick={this.handleClick}>
                {this.state.aggregate ? 'Your Article' : 'Aggregate'}
              </button>
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <VictoryPie // can update the height and width on the line above
                        standalone={false}
                        animate={{ duration: 1500 }}
                        width={400} height={400}
                        data={data.data}
                        innerRadius={120}
                        // cornerRadius={25}
                        labels={() => null}
                        style={{
                            data: {
                                fill: (d) => {
                                    const color = isPositiveInt? 'green' : 'red'; // might want to reformat this to say if 'positive' from watson ? 'green' : 'red'
                                    return d.x === 1 ? color : 'gray';
                                }
                            }
                        }}
                    />
                    <VictoryAnimation duration={1000} data={data}>
                        {(data) => {
                            return (
                                <VictoryLabel
                                    textAnchor="middle" verticalAnchor="middle"
                                    x={200} y={200}
                                    text={`${Math.round(data.percent)}% ${label}`}
                                   // ${isPositiveInt ? 'Positive' : 'Negative'}`}
                                    style={{ fontSize: 45 }}
                                />
                            );
                        }}
                    </VictoryAnimation>
                </svg>
            </div>
        );
    }
}


const mapState = ({ singleArticle, relatedArticles }) => ({ singleArticle, relatedArticles })
const mapDispatch = (dispatch) => {
    return {
        loadData(url) {
            dispatch(fetchArticleData(url))
        }
    }
}

export default connect(mapState, mapDispatch)(OverallSentimentAnalysisWithProps)
