import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from 'victory';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import { fetchlandingArticles } from '../store/landingPageArticles'


class SingleBarChartLanding extends Component {
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
        if (this.props.landingPageArticles.length === 0) {
            return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
        }
        let aggregateAnalyticalToneValue = this.props.landingPageArticles.data.map(article => {
            return article.tone.document_tone.tone_categories[1].tones[0].score
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        let aggregateConfidentToneValue = this.props.landingPageArticles.data.map(article => {
            return article.tone.document_tone.tone_categories[1].tones[1].score
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        let aggregateTentativeToneValue = this.props.landingPageArticles.data.map(article => {
            return article.tone.document_tone.tone_categories[1].tones[2].score
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        let averageData = [aggregateAnalyticalToneValue, aggregateConfidentToneValue, aggregateTentativeToneValue].map(el => {
            return (Math.floor(el / this.props.landingPageArticles.data.length * 100))
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

const mapState = ({ landingPageArticles }) => ({ landingPageArticles })
export default connect(mapState)(SingleBarChartLanding)