import React, { Component } from 'react';
import { VictoryBar, VictoryStack, VictoryTooltip, VictoryAxis, VictoryLabel } from 'victory';
import { connect } from 'react-redux'
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { fetchRelatedArticles } from '../store/relatedArticles'
import ReactLoading from 'react-loading';
import descriptions from '../../descriptions'

// https://formidable.com/open-source/victory/gallery/stacked-bars-central-axis/

class BarChart extends Component {
    constructor() {
      super();

      this.parseData = this.parseData.bind(this);
      this.parseDataMultiple = this.parseDataMultiple.bind(this);
    }

  shouldComponentUpdate(nextProps, nextState){
    // console.log('nextProps',nextProps)
    if(this.props !== nextProps){
      return true
    }
  }
  // //change singleArticle to this.props.whatever
  // //change aggregateData to this.props.whatever
  // componentDidMount(){
  //   // this.props.loadData('https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html')
  //   // console.log('props',this.props)
  //
  // }

  parseData(data){
    let resultArr = [];

    data.tone_categories.forEach( category => {
      if(category.category_id === 'emotion_tone' || category.category_id === 'social_tone'){
        category.tones.forEach(tone => {
          let resultObj = {}
          resultObj.x = tone.tone_name;
          resultObj.y = Math.floor(tone.score * 100);
          resultObj.label = descriptions[tone.tone_name.toLowerCase()]
          resultArr.push(resultObj)
        })
      }
    })
    return resultArr;
  }

  parseDataMultiple(dataArr){
    // console.log(dataArr)
    let transitionArr = [];
    let resultArr = [];
    dataArr.forEach(article => {
      let singleArticleInfo = this.parseData(article.tone.document_tone)
      transitionArr.push(singleArticleInfo)
    })
    let resultObj = {}
    transitionArr.forEach( articleArr => {
      articleArr.forEach(emotion => {
        pushIntoResultObj(emotion.x, emotion.y)
      })
    })
    function pushIntoResultObj (name, score) {
      if(!resultObj.hasOwnProperty(name)){
        resultObj[name] = score;
      } else {
        resultObj[name] = ((resultObj[name] + score) / 2);
      }
    }
    Object.keys(resultObj).forEach( key => resultArr.push({
      x: key,
      // y: Math.floor(resultObj[key] * 100)
      y: Math.floor(resultObj[key])
    }))
    return resultArr;
  }

  render(){
    if ((this.props.relatedArticles.length === 0 || JSON.parse(localStorage.getItem('relatedArticles')).length === 0) || (this.props.singleArticle.tone === undefined || JSON.parse(localStorage.getItem('singleArticle')).tone === undefined)){
      return (<div>No Related Articles</div>)
    }

    let singleArticle = this.props.singleArticle.tone === undefined ? JSON.parse(localStorage.getItem('singleArticle')).tone : this.props.singleArticle.tone
    let relatedArticles = this.props.relatedArticles.length === 0 ? JSON.parse(localStorage.getItem('relatedArticles')) : this.props.relatedArticles

    let singleArticleData = this.parseData(singleArticle.document_tone)
    let aggregateData = this.parseDataMultiple(relatedArticles)

    return (
      <div className="chartBackground">
        <svg viewBox="0 0 500 500" width="100%" height="100%">
      >
        <VictoryStack horizontal
          standalone={false}
          /* setting a symmetric domain makes it much easier to center the axis  */
          domain={{ x: [-70, 70] }}
          padding={{ top: 10, bottom: 10, left: 210}}
          height={500}
          width={400}
          style={{ data: { width: 30, padding: 0, margin: 0 }, labels: { fontSize: 18 } }}
        >
          <VictoryBar
            labelComponent={<VictoryTooltip />}
            style={{ data: { fill: "tomato" } }}
            data={singleArticleData}
            y={(data) => (-Math.abs(data.y))} // tomato numbers
            labels={(data) => (`${data.x}: ${Math.abs(data.y)}%`)} // number label
          />
          <VictoryBar
            style={{ data: { fill: "orange" } }}
            data={aggregateData}
            labels={(data) => (`${Math.abs(data.y)}%`)} // number
          />
        </VictoryStack>
        <VictoryAxis dependentAxis
        height={400}
        width={500}
        padding={{ top: 0, bottom: 0, left: 100, right: 50 }}
        style={{
          axis: { stroke: "transparent" },
          ticks: { stroke: "transparent" },
          tickLabels: { fontSize: 11, fill: "black" }
        }}
        /*
          Use a custom tickLabelComponent with
          an absolutely positioned x value to position
          your tick labels in the center of the chart. The correct
          y values are still provided by VictoryAxis for each tick
        */
        tickLabelComponent={<VictoryLabel x={250} textAnchor="middle" />}
        tickValues={singleArticleData.map((point) => point.x).reverse()}
      />
      </svg>
      </div>
    );
  }
}

const mapState = ({ singleArticle, relatedArticles }) => ({ singleArticle, relatedArticles })
const mapDispatch = (dispatch) => {
    return {
        loadData(url) {
            dispatch(fetchArticleData(url))
            dispatch(fetchRelatedArticles(url))
        }
    }
}


export default connect (mapState, mapDispatch)(BarChart)

