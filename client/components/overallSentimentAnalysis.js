import React, { Component } from 'react';
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';
import { connect } from 'react-redux'
import { getLandingArticles, createLandingArticles } from '../store/landingPageArticles'
import ReactLoading from 'react-loading';


// https://formidable.com/open-source/victory/gallery/animating-circular-progress-bar/

class OverallSentimentAnalysisWithProps extends Component {
  constructor() {
    super();
    this.state = {
      bool: true
    }
    // this.state = {
    //     percent: 0, data: this.getData(0) //percentage should always start at zero
    // };
  }

  // componentDidMount() {
  //     this.props.loadData();
  //     this.setState({ bool: !this.state.bool })
  // }

  //   componentDidMount() {
  //     let percent = 70 // this would feed from Watson
  //       this.setState({
  //         percent, data: this.getData(percent)
  //       });
  //   }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    if (this.props.landingPageArticles.length === 0) {
      return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
    }
    let aggregateNumber = this.props.landingPageArticles.data.map(article => {
      return article.nlu.sentiment.document.score * 100
    }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    let average = (aggregateNumber / this.props.landingPageArticles.data.length)
    let isPositiveInt = average > 0 ? true : false;

    // let isPositiveInt = (this.props.singleArticle.nlu.sentiment.document.score * 100) > 0 ? true : false;
    let data;
    // if (this.state.bool) {
    // data = { percent: 0, data: [{ x: 1, y: 0 }, { x: 2, y: 100 }] }
    // } else {
    data = {
      percent: Math.abs(Math.floor(average)) || 50,
      data: this.getData(Math.abs(Math.floor(average))) || 50
      // }
    }
    //[{x:1, y:79}, {x:2, y:21}]

    //    [{x:1, y:0}, {x:2, y:100}]
    // {percent: 70, data: [{x:1, y:70}, {x:2, y:30}]}
    return (
      <div className="chartBackground">
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
                  const color = isPositiveInt ? 'green' : 'red'; // might want to reformat this to say if 'positive' from watson ? 'green' : 'red'
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
                  text={`${Math.round(data.percent)}% ${this.props.landingPageArticles.data[0].nlu.sentiment.document.label}`}
                  // ${isPositiveInt ? 'Positive' : 'Negative'}`} // should upate 'Positive' with the info from Watson
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


const mapState = ({ landingPageArticles }) => ({ landingPageArticles })
const mapDispatch = null;
//  (dispatch) => {
//   return {
//     loadData(url) {
//       dispatch(getLandingArticles(url))
//     }
//   }
// }

export default connect(mapState, mapDispatch)(OverallSentimentAnalysisWithProps)
