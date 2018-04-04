import React, { Component } from 'react';
import { VictoryChart, VictoryTheme, VictoryGroup, VictoryBar } from 'victory';
import { connect } from 'react-redux'


class StackedBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSet1: true,
        }
    }
    componentDidMount(){
        setInterval(() => {
            this.setState({dataSet1: !this.state.dataSet1})
        }, 4000)
    }

    render() {
        if (this.props.singleArticle.info === undefined || this.props.relatedArticles.length === 0){
            return <div/>
        }
        const data1 = this.props.singleArticle.tone.document_tone.tone_categories[0].tones.map((obj, index )=> {
            return {
                x: obj.tone_name,
                y: obj.score * 100
            }
        })
        const data2 = this.props.singleArticle.tone.document_tone.tone_categories[2].tones.map((obj, index) => {
            return {
                x: obj.tone_name,
                y: obj.score * 100
            }
        })
        const data3 = this.props.relatedArticles[0].tone.document_tone.tone_categories[0].tones.map((obj, index )=> {
            return {
                x: obj.tone_name,
                y: obj.score * 100
            }
        })
        const data4 = this.props.relatedArticles[0].tone.document_tone.tone_categories[2].tones.map((obj, index) => {
            return {
                x: obj.tone_name,
                y: obj.score * 100
            }
        })
        const useThis = this.state.dataSet1 ? [data1, data2] : [data3, data4]
        return (
          <div>
            <VictoryChart
              animate={{duration: 1000}}
              theme={VictoryTheme.material}
            >
                <VictoryGroup
                  offset={10}
                  style={{ data: { width: 6 } }}
                  colorScale={["brown", "tomato", "gold"]}
                >
                  <VictoryBar
                    data={useThis[0]}
                  />
                  <VictoryBar
                    data={useThis[1]}
                  />
              </VictoryGroup>

            </VictoryChart>
          </div>
        );
      }
}

const mapState = ({ singleArticle, relatedArticles }) => ({ singleArticle, relatedArticles })
const mapDispatch = null
export default connect(mapState, mapDispatch)(StackedBar)
