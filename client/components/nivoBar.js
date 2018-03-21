import React, { Component } from 'react';
import {VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel} from 'victory';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import { ResponsiveBar } from '@nivo/bar'

class NivoBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
                <div>
                    Hello
                <ResponsiveBar
                    data={[{
                        "country": "AD",
                        "hot dog": 58,
                        "hot dogColor": "hsl(216, 70%, 50%)",
                        "burger": 169,
                        "burgerColor": "hsl(267, 70%, 50%)",
                        "sandwich": 15,
                        "sandwichColor": "hsl(107, 70%, 50%)",
                        "kebab": 10,
                        "kebabColor": "hsl(19, 70%, 50%)",
                        "fries": 119,
                        "friesColor": "hsl(220, 70%, 50%)",
                        "donut": 38,
                        "donutColor": "hsl(327, 70%, 50%)"
                      },
                      {
                        "country": "AE",
                        "hot dog": 4,
                        "hot dogColor": "hsl(163, 70%, 50%)",
                        "burger": 103,
                        "burgerColor": "hsl(301, 70%, 50%)",
                        "sandwich": 125,
                        "sandwichColor": "hsl(224, 70%, 50%)",
                        "kebab": 112,
                        "kebabColor": "hsl(102, 70%, 50%)",
                        "fries": 170,
                        "friesColor": "hsl(115, 70%, 50%)",
                        "donut": 135,
                        "donutColor": "hsl(220, 70%, 50%)"
                      }]}
                    keys={[
                        "hot dog",
                        "burger",
                        "sandwich",
                        "kebab",
                        "fries",
                        "donut"
                    ]}
                    indexBy="country"
                    margin={{
                        "top": 50,
                        "right": 130,
                        "bottom": 50,
                        "left": 60
                    }}
                    padding={0.3}
                    colors="nivo"
                    colorBy="id"
                    defs={[
                        {
                            "id": "dots",
                            "type": "patternDots",
                            "background": "inherit",
                            "color": "#38bcb2",
                            "size": 4,
                            "padding": 1,
                            "stagger": true
                        },
                        {
                            "id": "lines",
                            "type": "patternLines",
                            "background": "inherit",
                            "color": "#eed312",
                            "rotation": -45,
                            "lineWidth": 6,
                            "spacing": 10
                        }
                    ]}
                    fill={[
                        {
                            "match": {
                                "id": "fries"
                            },
                            "id": "dots"
                        },
                        {
                            "match": {
                                "id": "sandwich"
                            },
                            "id": "lines"
                        }
                    ]}
                    borderColor="inherit:darker(1.6)"
                    axisBottom={{
                        "orient": "bottom",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legend": "country",
                        "legendPosition": "center",
                        "legendOffset": 36
                    }}
                    axisLeft={{
                        "orient": "left",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legend": "food",
                        "legendPosition": "center",
                        "legendOffset": -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor="inherit:darker(1.6)"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={[
                        {
                            "dataFrom": "keys",
                            "anchor": "bottom-right",
                            "direction": "column",
                            "translateX": 120,
                            "itemWidth": 100,
                            "itemHeight": 20,
                            "itemsSpacing": 2,
                            "symbolSize": 20
                        }
                    ]}
                />
                </div>
            )
        
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
export default connect(mapState, mapDispatch)(NivoBar)
