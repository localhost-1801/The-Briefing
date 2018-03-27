import React, { Component } from 'react';
import { VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from 'victory';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
// import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { fetchlandingArticles } from '../store/landingPageArticles'


//replace these with tone data, radar chart will swap in between the two
class RadarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      maxima: [],
      bool: true
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ bool: !this.state.bool })
    }, 5000)
  }

  parseData(data) {
    let parsedData = {}
    data.forEach(emotionData => {
      parsedData[emotionData['tone_name']] = Math.floor(emotionData['score'] * 100)
    })
    return [parsedData]

  }

  //returns 100 for each data values maximum on the axis
  getMaxima(data) {
    data = [data];
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
    return [data].map((datum) => makeDataArray(datum));
  }

  render() {
    if (this.props.landingPageArticles.length === 0) {
      return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
    }
    let emotionalTones = this.props.landingPageArticles.data.map(article => {
      return article.tone.document_tone.tone_categories[0].tones
    })

    let emotionalValues = []
    for (var i = 0; i < emotionalTones.length; i++) {
      let singleEmotionalValue = []
      for (var j = 0; j < emotionalTones[i].length; j++) {
        singleEmotionalValue.push(emotionalTones[i][j].score)
      }
      emotionalValues.push(singleEmotionalValue)
    }
    let emotionsObject = { Anger: 0, Disgust: 0, Fear: 0, Joy: 0, Sadness: 0 }

    for (var i = 0; i < emotionalValues.length; i++) {
      emotionsObject.Anger += emotionalValues[i][0];
      emotionsObject.Disgust += emotionalValues[i][1];
      emotionsObject.Fear += emotionalValues[i][2];
      emotionsObject.Joy += emotionalValues[i][3];
      emotionsObject.Sadness += emotionalValues[i][4];
    }
    for (var key in emotionsObject) {
      emotionsObject[key] = Math.floor((emotionsObject[key] / emotionalTones.length) * 100)
    }
    //---------------------------------------------------------------------------------------
    let socialTones = this.props.landingPageArticles.data.map(article => {
      return article.tone.document_tone.tone_categories[2].tones
    })

    let socialValues = []
    for (var k = 0; k < socialTones.length; k++) {
      let singleSocialValue = [];
      for (var l = 0; l < socialTones[k].length; l++) {
        singleSocialValue.push(socialTones[k][l].score)
      }
      socialValues.push(singleSocialValue);
    }

    let socialObject = { Openness: 0, Conscientiousness: 0, Extraversion: 0, Agreeableness: 0, "Emotional Range": 0 }

    for (var k = 0; k < socialValues.length; k++) {
      socialObject.Openness += socialValues[k][0];
      socialObject.Conscientiousness += socialValues[k][1];
      socialObject.Extraversion += socialValues[k][2];
      socialObject.Agreeableness += socialValues[k][3];
      socialObject['Emotional Range'] += socialValues[k][4];
    }
    for (var key in socialObject) {
      socialObject[key] = Math.floor((socialObject[key] / socialTones.length) * 100)
    }

    let processedEmo = this.processData(emotionsObject)
    let processedTones = this.processData(socialObject)

    let data = this.state.bool ? processedEmo : processedTones;
    let maxima = this.state.bool ? this.getMaxima(emotionsObject) : this.getMaxima(socialObject)

    return (
      <VictoryChart polar
        theme={VictoryTheme.material}
        domain={{ y: [0, 1] }}
        animate={{ duration: 1000 }}
      >
        <VictoryGroup colorScale={["gold", "orange", "tomato"]}
          style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
        >
          {data.map((data, i) => {
            return <VictoryArea key={i} data={data} />;
          })}
        </VictoryGroup>
        {
          Object.keys(maxima).map((key, i) => {
            return (
              <VictoryPolarAxis key={i} dependentAxis
                style={{
                  axisLabel: { padding: 10 },
                  axis: { stroke: "none" },
                  grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
                }}
                tickLabelComponent={
                  <VictoryLabel labelPlacement="vertical" />
                }
                labelPlacement="perpendicular"
                axisValue={i + 1} label={key}
                tickFormat={(t) => Math.ceil(t * maxima[key])}
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
const mapState = ({ landingPageArticles }) => ({ landingPageArticles });
const mapDispatch = null;
export default connect(mapState, mapDispatch)(RadarChart)
