import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel, VictoryStack } from 'victory';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import { fetchArticleData, makeArticle } from '../store/singleArticle'


class SingleBarChartBackPage extends Component {
    constructor() {
        super();
        this.state = {
            clicked: false,
            aggregate: false,
            style: {
                data: { fill: "tomato" }
            }
        };
        this.parseDataSingle = this.parseDataSingle.bind(this)
        this.parseDataMultiple = this.parseDataMultiple.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
      this.setState({
        aggregate: !this.state.aggregate
      })
    }

    parseDataSingle(data){
      let resultArr = []
      let dataArr = data.tone.document_tone.tone_categories[1].tones
      let toneScore = 0
      dataArr.forEach(tone => {
        if(tone.score > 0){
          toneScore = Math.floor(tone.score * 100)
        }
        resultArr.push({x: tone.tone_name, y: toneScore })
        toneScore = 0
      })
      return [resultArr];
    }

    parseDataMultiple(data){
      let resultArr = []
      data.forEach(relatedArticle =>
        resultArr.push(...this.parseDataSingle(relatedArticle))
      )
      resultArr.map(arr => {
        return arr.map(obj =>{
          obj.y = Math.floor((obj.y / resultArr.length))
          return obj
        })
      })
      return resultArr;
    }

    render() {
        if (this.props.relatedArticles.length === 0) {
            return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
        }

        let dataParsed;
        if (this.state.aggregate){
          dataParsed = this.parseDataMultiple(this.props.relatedArticles)
        } else {
          dataParsed = this.parseDataSingle(this.props.singleArticle)
        }
        let dataset = dataParsed

        return (
            <div>
              <button onClick={this.handleClick}>
                {this.state.aggregate ? 'Your Article' : 'Aggregate'}
              </button>
                <VictoryChart height={400} width={400}
                    domainPadding={{ x: 100, y: [0, 100] }}
                    animate={{ duration: 1000 }}
                >
                  <VictoryStack
                    colorScale={["#61cdbb", "#e8a838", "#97e3d5", "e8c1a0", "#f5755f", "#f1e15b"]}
                  >
                    {dataset.map((data, i) => {
                      return <VictoryBar data={data} key={i}/>;
                    })}
                  </VictoryStack>
                  <VictoryAxis dependentAxis
                    tickFormat={(tick) => {return (tick < 101 ? `${tick}%` : null)}}
                  />
                  <VictoryAxis
                    tickFormat={["Analytical", "Confident", "Tentative"]}
                  />
                </VictoryChart>
            </div>
        );
    }
}

const mapState = ({ singleArticle, relatedArticles }) => ({ singleArticle, relatedArticles })
export default connect(mapState)(SingleBarChartBackPage)
