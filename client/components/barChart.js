import React, { Component } from 'react';
import { VictoryBar, VictoryStack, VictoryAxis, VictoryLabel } from 'victory';
import { connect } from 'react-redux'
import { fetchArticleData } from '../store/singleArticle'
import { fetchRelatedArticles } from '../store/relatedArticles'

// https://formidable.com/open-source/victory/gallery/stacked-bars-central-axis/

class BarChart extends Component {
    constructor() {
      super();
      this.state = {
        dataA: [
          { x: "Anger", y: 27 },
          { x: "Disgust", y: 40 },
          { x: "Fear", y: 38 },
          { x: "Joy", y: 37 },
          { x: "Sadness", y: 25 },
          { x: "Emotion Tone", y: 19 },
          { x: "Openness", y: 15 },
          { x: "Conscientousness", y: 13 },
          { x: "Extraversion", y: 12 },
          { x: "Agreeableness", y: 15 },
          { x: "Emotional Range", y: 13 }
        ],
        dataB: [
          { x: "Anger", y: 30 },
          { x: "Disgust", y: 4 },
          { x: "Fear", y: 22 },
          { x: "Joy", y: 43 },
          { x: "Sadness", y: 12 },
          { x: "Emotion Tone", y: 44 },
          { x: "Openness", y: 35 },
          { x: "Conscientousness", y: 23 },
          { x: "Extraversion", y: 2 },
          { x: "Agreeableness", y: 40 },
          { x: "Emotional Range", y: 25 }
        ]
      };
      this.parseData = this.parseData.bind(this);
    }
    
  shouldComponentUpdate(nextProps, nextState){
    console.log('nextProps',nextProps)
    if(this.props !== nextProps){
      return true
    }
  }
  //change singleArticle to this.props.whatever
  //change aggregateData to this.props.whatever
  componentDidMount(){
    // this.props.loadData('https://www.nytimes.com/2018/03/15/world/europe/corbyn-labour-russian-spy-poisoning.html')
    // console.log('props',this.props)
    
  }
  
  parseData(data){
    console.log(data)
    let dataArr = [];
  }
  
  parseDataMultiple(dataArr){
    console.log('hello again', dataArr)
    return 2;
  }

  render(){
    let singleArticleData = this.parseData(this.props.singleArticle)
    let aggregateData = this.parseDataMultiple(this.props.relatedArticles)
    
    return(
      <div className="chartBackground">
        <svg viewBox="0 0 500 500" width="100%" height="100%">
      >
        <VictoryStack horizontal
          standalone={false}
          /* setting a symmetric domain makes it much easier to center the axis  */
          domain={{ x: [-60, 60] }}
          padding={{ top: 20, bottom: 30, left: 20, right: 20 }}
          height={500}
          width={500}
          style={{ data: { width: 20 }, labels: { fontSize: 11 } }}
        >
          <VictoryBar
            style={{ data: { fill: "tomato" } }}
            data={this.state.dataA}
            y={(data) => (-Math.abs(data.y))} // tomato numbers
            labels={(data) => (`${data.x}: ${Math.abs(data.y)}%`)} // number label
          />
          <VictoryBar
            style={{ data: { fill: "orange" } }}
            data={this.state.dataB}
            labels={(data) => (`${Math.abs(data.y)}%`)} // number
          />
        </VictoryStack>
        <VictoryAxis dependentAxis
        height={500}
        width={500}
        padding={{ top: 30, bottom: 30, left: 20, right: 20 }}
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
        tickValues={this.state.dataA.map((point) => point.x).reverse()}
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

