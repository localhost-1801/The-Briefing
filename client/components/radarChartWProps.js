import React, { Component } from 'react';
import { VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from 'victory';
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { Table, Menu } from 'semantic-ui-react'


class RadarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            maxima: [],
            bool: true,
            active: 'emotion'
        };
    }

    componentDidMount() {
       this.setState({
            interval: setInterval(() => {
                this.setState({ bool: !this.state.bool, active: this.state.active === 'tone' ? 'emotion' : 'tone' })
            }, 5000)
       })

    }

    parseData(data) {
        let parsedData = {}
        data.forEach(emotionData => {
            parsedData[emotionData['tone_name']] = Math.floor(emotionData['score'] * 100)
        })
        return [parsedData]

    }

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
    handleItemClick = (e, { name }) => {
        clearInterval(this.state.interval)
        this.setState({ active: name, bool: !this.state.bool, interval: setInterval(() => {
            this.setState({ bool: !this.state.bool, active: this.state.active === 'tone' ? 'emotion' : 'tone' })
        }, 5000)  })
    }

    processData(data) {
        const maxByGroup = this.getMaxima(data);
        const makeDataArray = (d) => {
            return Object.keys(d).map((key) => {
                return { x: key, y: d[key] / maxByGroup[key] };
            });
        };
        return data.map((datum) => makeDataArray(datum));
    }

    render() {
        if (this.props.singleArticle.info === undefined) {
            return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
        }
        let emotionalTones = this.parseData(this.props.singleArticle.tone.document_tone.tone_categories[0].tones)
        let socialTones = this.parseData(this.props.singleArticle.tone.document_tone.tone_categories[2].tones)
        let processedEmo = this.processData(emotionalTones)
        let processedTones = this.processData(socialTones)
        let data = this.state.bool ? processedEmo : processedTones
        let maxima = this.state.bool ? this.getMaxima(emotionalTones) : this.getMaxima(socialTones)

        return (
            <div >
               <Menu attached size={'mini'} tabular>
                    <Menu.Item name='emotion' active={this.state.bool} onClick={this.handleItemClick} />
                    <Menu.Item name='tone' active={!this.state.bool} onClick={this.handleItemClick} />
                </Menu>
            <Table.Cell>
<div className="radarChart">
                <VictoryChart polar
                    theme={VictoryTheme.material}
                    domain={{ y: [0, 1] }}
                    animate={{ duration: 1000 }}
                >
                    <VictoryGroup
                        style={{ data: { fillOpacity: 0.2 } }}
                    >
                        {data.map((data, i) => {
                            return <VictoryArea color='#61cdbb' key={i} data={data} />;
                        })}
                    </VictoryGroup>
                    {
                        Object.keys(maxima).map((key, i) => {
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
                                    tickFormat={(t) => Math.ceil(t * maxima[key])}
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
                </div>
            </Table.Cell>
                        </div>
        );
    }
}
const mapState = ({ singleArticle }) => ({ singleArticle })
const mapDispatch = (dispatch) => {
    return {
        loadData(url) {
            dispatch(fetchArticleData(url))
        },
        newUrl(url) {
            dispatch(makeArticle(url))
        }
    }
}
export default connect(mapState, mapDispatch)(RadarChart)
