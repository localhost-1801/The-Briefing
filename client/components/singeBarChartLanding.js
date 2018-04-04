import React, { Component } from 'react';
import { VictoryChart, VictoryBar } from 'victory';
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import { Segment, Header } from 'semantic-ui-react'
import descriptions from '../../descriptions'



class SingleBarChartLanding extends Component {
    constructor() {
        super();
        this.state = {
            clicked: false,
            style: {
                data: { fill: "#61cdbb" }
            },
            activeDescription: 'Analytical'
        };
    }

    render() {
        if (this.props.landingPageArticles.length === 0) {
            return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
        }
        let aggregateAnalyticalToneValue = this.props.landingPageArticles.map(article => {
            return article.tone.document_tone.tone_categories[1].tones[0].score
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        let aggregateConfidentToneValue = this.props.landingPageArticles.map(article => {
            return article.tone.document_tone.tone_categories[1].tones[1].score
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        let aggregateTentativeToneValue = this.props.landingPageArticles.map(article => {
            return article.tone.document_tone.tone_categories[1].tones[2].score
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        let averageData = [aggregateAnalyticalToneValue, aggregateConfidentToneValue, aggregateTentativeToneValue].map(el => {
            return (Math.floor(el / this.props.landingPageArticles.length * 100))
        })
        let setData = [
            { x: 'Analytical', y: averageData[0] },
            { x: 'Confident', y: averageData[1] },
            { x: 'Tentative', y: averageData[2] }

        ];

        const handleMouseOver = () => {
            const fillColor = this.state.clicked ? "blue" : "tomato";
            const clicked = !this.state.clicked;
            this.setState({
                clicked,
                style: {
                    data: { fill: fillColor }
                }
            });
        };
        return (
            <div>
                <VictoryChart color='#61cdbb' height={400} width={400}
                    domainPadding={{ x: 100, y: [0, 100] }}
                >
                    <VictoryBar
                        color='#61cdbb'
                        alignment="middle"
                        labels={(d) => `${d.y}%`}
                        style={this.state.style}
                        data={setData}
                        events={[
                            {
                              target: "data",
                              eventHandlers: {
                                onMouseOver: () => {
                                  return [{
                                    mutation: (props) => {
                                      this.setState({ activeDescription: props.datum.x })
                                      return {
                                        style: Object.assign({}, props.style, { fill: 'tomato' })
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
                    />
                </VictoryChart>
                <Segment textAlign={'center'} compact={true} attached='bottom'>
                    <Header size='tiny'>{this.state.activeDescription}</Header>
                    {descriptions[this.state.activeDescription.toLowerCase()]}
                </Segment>
            </div>
        );
    }
}

const mapState = ({ landingPageArticles }) => ({ landingPageArticles })
export default connect(mapState)(SingleBarChartLanding)
