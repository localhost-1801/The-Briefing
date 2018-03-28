import React, { Component } from 'react';
import { VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from 'victory';
import ReactDOM from 'react-dom'
import descriptions from '../../descriptions'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
// import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { fetchlandingArticles } from '../store/landingPageArticles'


//replace these with tone data, radar chart will swap in between the two
export default class Explainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDescription: 'Highlight a word to get a description'
    };
    this.showInfo = this.showInfo.bind(this)
  }

  showInfo(event){
    console.log(event.target.name)
    this.setState({
      currentDescription: descriptions[event.target.name]
    })
  }

  generateList(){
    let resultArr = [];
    Object.keys(descriptions).forEach(description =>{
      resultArr.push(
        <div onMouseOver={this.showInfo} value={description}>
          {description}
        </div>
      )
    })
    return resultArr;
  }

  render() {
    return (
      <div>
        {this.generateList()}
        <div>
          {this.state.currentDescription}
        </div>
      </div>
    )
  }
}
