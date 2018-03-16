import React, { Component } from 'react';
import { KeywordBox, RadarChart } from '../components';

export default class LandingPage extends Component {
  constructor(){
    super()
  }
  render(){
    return (
      <div>
        <KeywordBox />
        <RadarChart />
      </div>
    )
  }
}
