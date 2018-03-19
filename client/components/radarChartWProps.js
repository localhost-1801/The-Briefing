import React, { Component } from 'react';
import { VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from 'victory';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchArticleData } from '../store/singleArticle'


//replace these with tone data, radar chart will swap in between the two
class RadarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            maxima: [],
            bool: true,
            url: this.props.singleArticle.info.url
        };
    }
    componentWillMount() {
        this.props.loadData();
        let emotionalTones = this.parseData(this.props.singleArticle.tone.document_tone.tone_categories[0].tones)
        let socialTones = this.parseData(this.props.singleArticle.tone.document_tone.tone_categories[2].tones)
        this.setState({
            bool: !this.state.bool,
            data: this.processData(this.state.bool ? emotionalTones : socialTones),
            maxima: this.getMaxima(this.state.bool ? emotionalTones : socialTones)
        })
    }

    parseData(data) {
        let parsedData = {}
        data.forEach(emotionData => {
            parsedData[emotionData['tone_name']] = Math.floor(emotionData['score'] * 100)
        })
        console.log([parsedData])
        return [parsedData]

    }

    //returns 100 for each data values maximum on the axis
    getMaxima(data) {
        const groupedData = Object.keys(data[0]).reduce((memo, key) => {
            memo[key] = data.map((d) => d[key]);
            return memo;
        }, {});
        return Object.keys(groupedData).reduce((memo, key) => {
            memo[key] = 100;
            return memo;
        }, {});
    }

    //change data[tones] if not passsing an object tones with an array
    //make data array also modified, expects object with 'score' and 'tone_name'
    processData(data) {
        const maxByGroup = this.getMaxima(data);
        // console.log(maxByGroup)
        const makeDataArray = (d) => {
            return Object.keys(d).map((key) => {
                return { x: key, y: d[key] / maxByGroup[key] };
            });
        };
        //console.log(data.map((datum) => makeDataArray(datum)))
        return data.map((datum) => makeDataArray(datum));
    }

    render() {
        if (this.props.singleArticle === undefined) {
            return <div />
        }
        return (
            <VictoryChart polar
                theme={VictoryTheme.material}
                domain={{ y: [0, 1] }}
                animate={{ duration: 1000 }}
            >
                <VictoryGroup colorScale={["gold", "orange", "tomato"]}
                    style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                >
                    {this.state.data.map((data, i) => {
                        return <VictoryArea key={i} data={data} />;
                    })}
                </VictoryGroup>
                {
                    Object.keys(this.state.maxima).map((key, i) => {
                        return (
                            <VictoryPolarAxis key={i} dependentAxis
                                style={{
                                    axisLabel: { padding: 10 },
                                    axis: { stroke: "none" },
                                    grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
                                }}
                                tickLabelComponent={
                                    <VictoryLabel labelPlacement="vertical" />
                                }
                                labelPlacement="perpendicular"
                                axisValue={i + 1} label={key}
                                tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                                tickValues={[0.25, 0.5, 0.75]}
                            />
                        );
                    })
                }
                <VictoryPolarAxis
                    labelPlacement="parallel"
                    tickFormat={() => ""}
                    style={{
                        axis: { stroke: "none" },
                        grid: { stroke: "grey", opacity: 0.5 }
                    }}
                />

            </VictoryChart>
        );
    }
}
const mapState = ({ singleArticle }) => ({ singleArticle })
const mapDispatch = (dispatch) => {
    return {
        loadData(url) {
            dispatch(fetchArticleData(url))
        }
    }
}
export default connect(mapState, mapDispatch)(RadarChart)
