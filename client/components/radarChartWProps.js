import React, { Component } from 'react';
import { VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from 'victory';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import { fetchArticleData, makeArticle } from '../store/singleArticle'


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

    // componentWillReceiveProps(nextProps) {
    //     if (this.props !== nextProps) {
    //         // this.props.loadData();
    //         console.log(this.props)
    //         console.log(nextProps)
    //         this.setState({
    //             data: this.processData(this.parseData(nextProps.singleArticle.tone.document_tone.tone_categories[0].tones)),
    //             maxima: this.getMaxima(this.parseData(nextProps.singleArticle.tone.document_tone.tone_categories[0].tones)),
    //             url: nextProps.singleArticle.info.url
    //         })
    //             // this.props.newUrl(nextProps.singleArticle.info.url)
    //     }
    // }
    
    // componentWillMount() {
    //     this.props.loadData();

    // }

    componentDidMount() {
        // let emotionalTones = this.parseData(this.props.singleArticle.tone.document_tone.tone_categories[0].tones)
        // let socialTones = this.parseData(this.props.singleArticle.tone.document_tone.tone_categories[2].tones)
    //     setInterval(()=> {
    //     this.setState({
    //         bool: !this.state.bool,
    //         data: this.processData(this.state.bool ? emotionalTones : socialTones),
    //         maxima: this.getMaxima(this.state.bool ? emotionalTones : socialTones)
    //     })
    // }, 5000)
        setInterval(()=>{
            this.setState({bool: !this.state.bool})
        }, 3000)
    }

    parseData(data) {
        let parsedData = {}
        data.forEach(emotionData => {
            parsedData[emotionData['tone_name']] = Math.floor(emotionData['score'] * 100)
        })
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
        const makeDataArray = (d) => {
            return Object.keys(d).map((key) => {
                return { x: key, y: d[key] / maxByGroup[key] };
            });
        };
        return data.map((datum) => makeDataArray(datum));
    }

    render() {
        if (this.props.singleArticle === undefined ) {
            // console.log(this.props.tone)
            return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
        }
        let emotionalTones = this.parseData(this.props.singleArticle.tone.document_tone.tone_categories[0].tones)
        let socialTones = this.parseData(this.props.singleArticle.tone.document_tone.tone_categories[2].tones)
        let processedEmo = this.processData(emotionalTones)
        let processedTones = this.processData(socialTones)
        let data = this.state.bool ? processedEmo : processedTones
        let maxima = this.state.bool ? this.getMaxima(emotionalTones): this.getMaxima(socialTones)
        // console.log(maxima)
        // let emotionalTones = this.parseData(this.props.singleArticle.tone.document_tone.tone_categories[0].tones)
        // let socialTones = this.parseData(this.props.singleArticle.tone.document_tone.tone_categories[2].tones)

        // let dataObj = {
        //     data: this.processData(emotionalTones),
        //     maxima: this.getMaxima(emotionalTones)
        // }

        // setInterval(() => {
        //     console.log(dataObj.data[0][0].x)
        //     if (dataObj.data[0][0].x === 'Anger') {
        //         dataObj = {
        //             data: this.processData(socialTones),
        //             maxima: this.getMaxima(socialTones)
        //         }
        //         dataObj = Object.assign({}, dataObj)
        //     } else {
        //         dataObj = {
        //             data: this.processData(emotionalTones),
        //             maxima: this.getMaxima(emotionalTones)
        //         }
        //         dataObj = Object.assign({}, dataObj)
        //     }
        // }, 5000)

        return (
            <VictoryChart polar
                theme={VictoryTheme.material}
                domain={{ y: [0, 1] }}
                animate={{ duration: 1000 }}
            >
                <VictoryGroup colorScale={["gold", "orange", "tomato"]}
                    style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                >
                    {data.map((data, i) => {
                        return <VictoryArea key={i} data={data} />;
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
