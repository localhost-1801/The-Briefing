import React, { Component } from 'react';
import { KeywordBox, RadarChart, OverallSentimentAnalysis, BarChart, MapIndex } from '../components';

export default class LandingPage extends Component {
  constructor(){
    super()
  }
  render(){
    return (
      <div>
        <MapIndex />
        <BarChart />
        <KeywordBox />
        <OverallSentimentAnalysis />
      </div>
    )
  }
}
