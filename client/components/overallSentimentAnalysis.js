import React, { Component } from 'react';
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';
import { connect } from 'react-redux'
import { getLandingArticles, createLandingArticles } from '../store/landingPageArticles'
import ReactLoading from 'react-loading';

class OverallSentimentAnalysisWithProps extends Component {
  constructor() {
    super();
    this.state = {
      bool: true
    }
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    if (this.props.landingPageArticles.length === 0) {
      return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
    }
    let label;
    let aggregateNumber = this.props.landingPageArticles.map(article => {
      return article.nlu.sentiment.document.score * 100
    }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    let average = (aggregateNumber / this.props.landingPageArticles.length);
    let isPositiveInt = average > 0 ? true : false;
    let data = {
      percent: Math.abs(Math.floor(average)) || 50,
      data: this.getData(Math.abs(Math.floor(average))) || 50
    }
    if ( average > 0 ){
      label = 'Positive'
    } else if ( average < 0 ){
      label = 'Negative'
    } else {
      label = 'Neutral'
    }
    return (
      <div className="chartBackground">
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1500 }}
            width={400} height={400}
            data={data.data}
            innerRadius={120}
            labels={() => null}
            style={{
              data: {
                fill: (d) => {
                  const color = isPositiveInt ? 'green' : 'red';
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
                  style={{ fontSize: 30 }}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
      </div>
    );

  }
}


const mapState = ({ landingPageArticles }) => ({ landingPageArticles })
const mapDispatch = null;

export default connect(mapState, mapDispatch)(OverallSentimentAnalysisWithProps)
