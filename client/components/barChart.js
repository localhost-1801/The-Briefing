import React, { Component } from 'react';
import { VictoryBar, VictoryStack, VictoryTooltip, VictoryLegend, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import { connect } from 'react-redux'
import { fetchArticleData } from '../store/singleArticle'
import { fetchRelatedArticles } from '../store/relatedArticles'
import ReactLoading from 'react-loading';
import descriptions from '../../descriptions'
import { Header, Table, Segment } from 'semantic-ui-react'

class BarChart extends Component {
  constructor() {
    super();
    this.state = {
      activeDescription: 'Emotional Range'
    }
    this.parseData = this.parseData.bind(this);
    this.parseDataMultiple = this.parseDataMultiple.bind(this);
    this.resizeSegment =  this.resizeSegment.bind(this);
  }


  parseData(data) {
    let resultArr = [];

    data.tone_categories.forEach(category => {
      if (category.category_id === 'emotion_tone' || category.category_id === 'social_tone') {
        category.tones.forEach(tone => {
          let resultObj = {}
          resultObj.x = tone.tone_name;
          resultObj.y = Math.floor(tone.score * 100);
          resultArr.push(resultObj)
        })
      }
    })
    return resultArr;
  }

  parseDataMultiple(dataArr) {
    let transitionArr = [];
    let resultArr = [];
    dataArr.forEach(article => {
      let singleArticleInfo = this.parseData(article.tone.document_tone)
      transitionArr.push(singleArticleInfo)
    })
    let resultObj = {}
    transitionArr.forEach(articleArr => {
      articleArr.forEach(emotion => {
        pushIntoResultObj(emotion.x, emotion.y)
      })
    })
    function pushIntoResultObj(name, score) {
      if (!resultObj.hasOwnProperty(name)) {
        resultObj[name] = score;
      } else {
        resultObj[name] = ((resultObj[name] + score) / 2);
      }
    }
    Object.keys(resultObj).forEach(key => resultArr.push({
      x: key,
      y: Math.floor(resultObj[key])
    }))
    return resultArr;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeSegment);
  }

  componentDidUpdate() {
    this.resizeSegment();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeSegment);
  }

  resizeSegment(){
    if(this.segmentWrapper){
      let computedWidth = 0.26 * +window.innerWidth
      this.segmentWrapper.style.width = computedWidth + 'px'
    }
  }

  render() {
    if (this.props.relatedArticles.length === 0 || this.props.singleArticle.tone === undefined) {
      return (<div></div>) //No Related Articles
    }

    let singleArticle = this.props.singleArticle.tone
    let relatedArticles = this.props.relatedArticles

    let singleArticleData = this.parseData(singleArticle.document_tone)
    let aggregateData = this.parseDataMultiple(relatedArticles)

    return (
        <Table.Cell>
          <div className="barChartWrapper" ref={(node) => { this.barChartWrapper = node; }}>
            <svg viewBox={"0 0 350 350"} width="100%" height="auto">
        <VictoryStack horizontal
                standalone={false}
                domain={{ x: [-70, 70] }}
                padding={{ top: 10, bottom: 10, left: 170}}
                height={350}
                width={300}
                style={{ data: { width: 20 }, labels: { fontSize: 10 } }}
              >
                   
                <VictoryBar
                  events={[
                    {
                      target: "data",
                      eventHandlers: {
                        onMouseOver: () => {
                          return [{
                            mutation: (props) => {
                              this.setState({ activeDescription: props.datum.x })
                              return {
                                style: Object.assign({}, props.style, { fill: '#61cdbb' })
                              }
                            }
                          }]
                        },
                        onMouseOut: () => {
                          return [{
                            mutation: (props) => {
                              return null
                            }
                          }]
                        }
                      }
                    }
                  ]}
                  style={{ data: { fill: "#f5755f" } }}
                  data={singleArticleData}
                  y={(data) => (-Math.abs(data.y))}
                  labels={(data) => (`${data.x}: ${Math.abs(data.y)}%`)}
                />
                <VictoryBar
                  events={[
                    {
                      target: "data",
                      eventHandlers: {
                        onMouseOver: () => {
                          return [{
                            mutation: (props) => {
                              this.setState({ activeDescription: props.datum.x })
                              return {
                                style: Object.assign({}, props.style, { fill: '#61cdbb' })
                              }
                            }
                          }]
                        },
                        onMouseOut: () => {
                          return [{
                            mutation: (props) => {
                              return null
                            }
                          }]
                        }
                      }
                    }
                  ]}
                  style={{ data: { fill: "#e8a838"} }}
                  data={aggregateData}
                  labels={(data) => (`${Math.abs(data.y)}%`)}
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
                tickLabelComponent={<VictoryLabel x={250} textAnchor="middle" />}
                tickValues={singleArticleData.map((point) => point.x).reverse()}
              />

            </svg>
            <div ref={(node) => { this.segmentWrapper = node; }}>
              <Segment flo textAlign={'center'} compact={false} attached='bottom'>
              <Header size='tiny'>{this.state.activeDescription}</Header>
              {descriptions[this.state.activeDescription.toLowerCase()]}
              </Segment>
            </div>
            </div>
        </Table.Cell>


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
