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
            style: {
                data: { fill: "tomato" }
            }
        };
    }

    render() {
        if (this.props.singleArticle === undefined) {
            return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
        }
        let grabData = this.props.singleArticle.tone.document_tone.tone_categories[1].tones
        let setData = []
        console.log('grabData', grabData)
        grabData.forEach(tone => {
            setData.push({ x: tone.tone_name, y: Math.floor(tone.score * 100) })
        })
        console.log('setData', setData)
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
                <strong>Language Tone Analysis</strong>
                <VictoryChart height={400} width={400}
                    domainPadding={{ x: 100, y: [0, 100] }}
                >
                    <VictoryBar
                        alignment="middle"
                        labels={(d) => `${d.y}/100`}
                        style={this.state.style}
                        data={setData}
                    />
                </VictoryChart>
            </div>
        );
    }
}

const mapState = ({ singleArticle }) => ({ singleArticle })
export default connect(mapState)(SingleBarChart)