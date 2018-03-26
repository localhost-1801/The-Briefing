import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from 'victory';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import { fetchArticleData, makeArticle } from '../store/singleArticle'


class SingleBarChart extends Component {
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
        this.transformData = this.transformData.bind(this)
    }
    /*
    DATAFORMAT
    [
      [
        {x: Analytical y: 69}
        {x: Confident y: 33}
        {x: Tentative y: 104}
      ],
      [
        {x: Analytical y: 22}
        {x: Confident y: 129}
        {x: Tentative y: 5}
      ],
    ]
    */

    parseDataSingle(data){
      let resultArr = []
      let dataArr = data.tone.document_tone.tone_categories[1].tones
      dataArr.forEach(tone => {
        resultArr.push({x: tone.tone_name, y: Math.floor(tone.score *100)})
      })
      return resultArr;
    }

    parseDataMultiple(data){
      let resultArr = []
      data.forEach(relatedArticle =>
        resultArr.push(parseDataSingle(data))
      )
      return resultArr;
    }

    transformData(dataset) {
      console.log(dataset)
      const totals = dataset[0].map((data, i) => {
        return dataset.reduce((memo, curr) => {
          return memo + curr[i].y;
        }, 0);
      });
      return dataset.map((data) => {
        return data.map((datum, i) => {
          return { x: datum.x, y: (datum.y / totals[i]) * 100 };
        });
      });
    }

    render() {
        let dataset = []
        if (dataset.length === 0) {
            return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
        }
        let dataParsed;
        if (this.state.aggregate){
          dataParsed = this.parseDataMultiple(this.props.relatedArticles)
        } else {
          dataParsed = this.parseDataSingle(this.props.singleArticle)
        }
        dataset = this.transformData(dataParsed);
        // let grabData = this.props.singleArticle.tone.document_tone.tone_categories[1].tones
        // let setData = []
        // grabData.forEach(tone => {
        //     setData.push({ x: tone.tone_name, y: Math.floor(tone.score *100)})
        // })
        // const handleMouseOver = () => {
        //     const fillColor = this.state.clicked ? "blue" : "tomato";
        //     const clicked = !this.state.clicked;
        //     this.setState({
        //         clicked,
        //         style: {
        //             data: { fill: fillColor }
        //         }
        //     });
        // };
        return (
            <div>
              <button onClick={this.handleClick}>
                {this.state.aggregate ? 'Your Article' : 'Aggregate'}
              </button>
                <strong>Language Tone Analysis</strong>
                <VictoryChart height={400} width={400}
                    domainPadding={{ x: 100, y: [0, 100] }}
                >
                  <VictoryStack
                    colorScale={["black", "blue", "tomato"]}
                  >
                  {dataset.map((data, i) => {
                    return <VictoryBar data={data} key={i}/>;
                  })}
                  //change these to 3 tones
                  </VictoryStack>
                  <VictoryAxis dependentAxis
                    tickFormat={(tick) => `${tick}%`}
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
export default connect(mapState)(SingleBarChart)
