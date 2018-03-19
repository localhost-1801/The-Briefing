import React, { Component } from 'react';
import {VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel} from 'victory';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'


//replace these with tone data, radar chart will swap in between the two
const characterData = [
  { anger: 10, intelligence: 60, luck: 30, stealth: 40, charisma: 50 },
  { anger: 20, intelligence: 30, luck: 80, stealth: 80, charisma: 90 },
  { anger: 50, intelligence: 50, luck: 90, stealth: 60, charisma: 10 }
];
let characterData2 = [
  { anger: 10, intelligence: 60, luck: 30, stealth: 40, charisma: 50 },
  { anger: 20, intelligence: 30, luck: 80, stealth: 80, charisma: 90 },
  { anger: 50, intelligence: 50, luck: 90, stealth: 60, charisma: 10 }
];

class RadarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.processData(characterData),
      maxima: this.getMaxima(characterData),
      bool: true
    };
  }
  componentDidMount() {
    setInterval(()=> {
      this.setState({
        bool: !this.state.bool,
        data: this.processData(this.state.bool ? characterData2 : characterData),
        maxima: this.getMaxima(this.state.bool ? characterData2 : characterData)
      })
    }, 2000)
    console.log('hello',this.props.singleArticle.tone)
  }

//   parseData(data){
//     data.forEach( group => {
//       console.log(group)
//       let parsedData = {}
//       group.forEach(dataObj => {
//         let descriptor = dataObj.tone_name;
//         parsedData[descriptor] = (Math.floor(dataObj.score * 100))
//       })
//       console.log('parsed data',parsedData)
//       return [parsedData]
//   })
// }

  //returns 100 for each data values maximum on the axis
  getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = 100;
      return memo;
    }, {});
  }

  //change data[tones] if not passsing an object tones with an array
  //make data array also modified, expects object with 'score' and 'tone_name'
  processData(data) {
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  }

  render() {
    if(this.props.singleArticle === undefined){
      return <div />
    }
    console.log('toooone',this.props.singleArticle.tone)
    return (
      <VictoryChart polar
        theme={VictoryTheme.material}
        domain={{ y: [ 0, 1 ] }}
        animate={{ duration: 1000 }}
      >
        <VictoryGroup colorScale={["gold", "orange", "tomato"]}
          style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
        >
          {this.state.data.map((data, i) => {
            return <VictoryArea key={i} data={data}/>;
          })}
        </VictoryGroup>
      {
        Object.keys(this.state.maxima).map((key, i) => {
          return (
            <VictoryPolarAxis key={i} dependentAxis
              style={{
                axisLabel: { padding: 10 },
                axis: { stroke: "none" },
                grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
              }}
              tickLabelComponent={
                <VictoryLabel labelPlacement="vertical"/>
              }
              labelPlacement="perpendicular"
              axisValue={i + 1} label={key}
              tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
              tickValues={[0.25, 0.5, 0.75]}
            />
          );
        })
      }
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickFormat={() => ""}
          style={{
            axis: { stroke: "none" },
            grid: { stroke: "grey", opacity: 0.5 }
          }}
        />

      </VictoryChart>
    );
  }
}
const mapState = ({singleArticle}) => ({singleArticle})
const mapDispatch = null;

export default connect(mapState, mapDispatch)(RadarChart)
