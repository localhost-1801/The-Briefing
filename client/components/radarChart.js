import React, { Component } from 'react';
import {VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel} from 'victory';
import ReactDOM from 'react-dom'

 let tones = {"tones": [
  {
    "score": 0.545415,
    "tone_id": "anger",
    "tone_name": "Anger"
  },
  {
    "score": 0.491538,
    "tone_id": "disgust",
    "tone_name": "Disgust"
  },
  {
    "score": 0.581808,
    "tone_id": "fear",
    "tone_name": "Fear"
  },
  {
    "score": 0.140619,
    "tone_id": "joy",
    "tone_name": "Joy"
  },
  {
    "score": 0.607815,
    "tone_id": "sadness",
    "tone_name": "Sadness"
  }
]}

let tones2 = {"tones": [
          {
            "score": 0.469454,
            "tone_id": "openness_big5",
            "tone_name": "Openness"
          },
          {
            "score": 0.916085,
            "tone_id": "conscientiousness_big5",
            "tone_name": "Conscientiousness"
          },
          {
            "score": 0.778731,
            "tone_id": "extraversion_big5",
            "tone_name": "Extraversion"
          },
          {
            "score": 0.587288,
            "tone_id": "agreeableness_big5",
            "tone_name": "Agreeableness"
          },
          {
            "score": 0.878792,
            "tone_id": "emotional_range_big5",
            "tone_name": "Emotional Range"
          }
        ]}

//replace these with tone data, radar chart will swap in between the two
const characterData = [
  { anger: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
  { anger: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 },
  { anger: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 }
];
const characterData2 = [
  { sloth: 3, supertest: 120, luck: 2, stealth: 80, charisma: 60 },
  { sloth: 1, supertest: 450, luck: 4, stealth: 60, charisma: 30 },
  { sloth: 2, supertest: 320, luck: 1, stealth: 50, charisma: 20 }
];

export default class RadarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.processData(tones),
      maxima: this.getMaxima(tones),
      bool: true
    };
  }
  componentDidMount() {
    setInterval(()=> {
      this.setState({
        bool: !this.state.bool,
        data: this.processData(this.state.bool ? tones2 : tones),
        maxima: this.getMaxima(this.state.bool ? tones2 : tones)
      })
    }, 2000)
  }

  parseData(data){
    console.log('data',data)
    let dataArr = []
    data.forEach( group => {
      console.log(group)
      let parsedData = {}
      group.forEach(dataObj => {
        let descriptor = dataObj.tone_name;
        parsedData[descriptor] = (Math.floor(dataObj.score * 100))
      })
      console.log('parsed data',parsedData)
      dataArr.push(parsedData);
    })
    console.log('dataArr',dataArr);
    return dataArr;
  }

  //returns 100 for each data values maximum on the axis
  getMaxima(data) {
    data = this.parseData(data.tones);
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
    console.log(data);
    // data = this.parseData(data.tones);
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.tones.map((datum) => makeDataArray(datum));
  }

  render() {

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
