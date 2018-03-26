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
            aggregate: true,
        }
        this.parseData = this.parseData.bind(this)
        this.parseDataMultiple = this.parseDataMultiple.bind(this)
    }

    handleClick(){
      this.setState({
        aggregate: !this.state.aggregate
      })
    }

    parseData(data){
      let score = data.nlu.sentiment.document.score
      let percent = Math.abs(Math.floor(score * 100)) || 50
      let sum = Math.floor(score * 100) > 0 ?
      return [{x:1, y: percent}, {x: 2, y: 100 - percent}, {isPositive: }]
    }

    parseDataMultiple(dataArr){
      let avgPercent = 0;
      let iterated = false;
      dataArr.forEach( (dataObj, index) => {
        let score = dataObj.nlu.sentiment.document.score;
        positiveNegative += score;
        let denom = iterated ? 2 : 1;
        avgPercent += (Math.abs(Math.floor(score * 100)) || 0) / denom;
      })
      let newArr = [{x:1, y: avgPercent }, {x:2, y: 100 - avgPercent}];
      return newArr
    }

    getData(percent) {
        return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    }

    render() {
        if(this.props.relatedArticles.length === 0){
          return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
        }
        let data = this.state.aggregate ? this.parseDataMultiple(this.props.relatedArticles) : this.parseData(this.props.singleArticle)
        let positive =
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
                                    const color = positive ? 'green' : 'red'; // might want to reformat this to say if 'positive' from watson ? 'green' : 'red'
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
                                    text={`${Math.round(data.percent)}% ${this.props.singleArticle.nlu.sentiment.document.label}`}
                                   // ${positive ? 'Positive' : 'Negative'}`}
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
