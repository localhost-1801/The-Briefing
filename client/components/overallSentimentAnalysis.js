import React, { Component } from 'react';
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';

// https://formidable.com/open-source/victory/gallery/animating-circular-progress-bar/

export default class OverallSentimentAnalysis extends Component {
  constructor() {
    super();
    this.state = {
      percent: 0, data: this.getData(0) //percentage should always start at zero
    };
  }

  componentDidMount() {
    let percent = 70 // this would feed from Watson
    this.setState({
      percent, data: this.getData(percent)
    });
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    // console.log('this.state.data', this.state.data)
    //[{x:1, y:0}, {x:2, y:100}]
    //[{x:1, y:70}, {x:2, y:30}]
    // console.log('this.state', this.state)
    //{percent: 0, data: [{x:1, y:0}, {x:2, y:100}]}
    //{percent: 70, data: [{x:1, y:70}, {x:2, y:30}]}
    return (
      <div className="chartBackground">
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie // can update the height and width on the line above
            standalone={false}
            animate={{ duration: 1000 }}
            width={400} height={400}
            data={this.state.data}
            innerRadius={120}
            // cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: (d) => {
                  const color = d.y > 30 ? 'green' : 'red'; // might want to reformat this to say if 'positive' from watson ? 'green' : 'red'
                  return d.x === 1 ? color : 'gray';
                }
              }
            }}
          />
          <VictoryAnimation duration={1000} data={this.state}>
            {(newProps) => {
              return (
                <VictoryLabel
                  textAnchor="middle" verticalAnchor="middle"
                  x={200} y={200}
                  text={`${Math.round(newProps.percent)}%
                  Positive`} // should upate 'Positive' with the info from Watson
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
