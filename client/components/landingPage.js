import React, { Component } from 'react';
import { KeywordBox, RadarChart } from '../components';
import {connect} from 'react-redux'
import {fetchArticleData, makeArticle} from '../store/singleArticle'


class LandingPage extends Component {
  constructor(){
    super()
  }
  componentDidMount(){
    this.props.makeArticle('https://www.nytimes.com/2018/03/18/world/middleeast/afrin-turkey-syria.html')
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

const mapState = ({singleArticle}) => ({singleArticle})

const mapDispatch = ({makeArticle})
// const mapDispatch = (dispatch) => {
//   return {
//     fetchAndCreate(url){
//       dispatch(fetchArticleData(url))
//     }
//   }
// }



export default connect(mapState, mapDispatch)(LandingPage)
