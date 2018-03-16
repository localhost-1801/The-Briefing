// doesn't work!

import React, { Component } from 'react';
import { VictoryChart, VictoryBar, range } from 'victory';

// http://formidable.com/open-source/victory/guides/animations/

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData()
    };
  }

  componentDidMount() {
      this.setState({
        data: this.getData()
      });
  }

  getData() {
    const bars = [6, 8, 9, 10];
    return bars.map((bar) => {
      return {x: bar + 1, y: [2, 4, 5, 6, 10]};
    });
  }

  render() {
    return (
      <VictoryChart
        domainPadding={{ x: 20 }}
        animate={{duration: 500}}
      >
        <VictoryBar
          data={this.state.data}
          style={{
            data: { fill: 'tomato', width: 12 }
          }}
          animate={{
            onExit: {
              duration: 500,
              before: () => ({
                _y: 0,
                fill: 'orange',
                label: 'BYE'
              })
            }
          }}
        />
      </VictoryChart>
    );
  }
}
