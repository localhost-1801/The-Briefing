import d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React from 'react';
import ReactDOM from 'react-dom';
import statesDefaults from './states-defaults';
import collection from './states-data';
import { Header, Grid, Image, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import { getStateArticleData } from '../../store/mapStore'

// https://caspg.github.io/simple-data-table-map/
//https://github.com/caspg/simple-data-table-map/blob/master/app/components/DataMap.jsx

class MapIndex extends React.Component {
    constructor(props) {
        super(props);
        this.datamap = null;
        // this.renderMap = this.renderMap.bind(this)
    }

    linearPalleteScale(value) {
        //console.log('linearPalleteScale')
        const dataValues = this.props.mapStore.map(function (data) { return data.value });
        const minVal = Math.min(...dataValues);
        const maxVal = Math.max(...dataValues);
        const fraction = (maxVal - minVal) / 4;
        const first = minVal + fraction;
        const second = first + fraction;
        const third = second + fraction;
        const fourth = third + fraction;

        if (value < 5) return "#dee3f6"
        else if (value >= 5 && value < 10) return '#9aafcd'
        else if (value >= 10 & value < 15) return '#5778a2'
        else if (value >= 15 & value < 20) return '#325c8b'
        else if (value >= 20) return "#06386e"
    }

    redducedData() {
        //console.log('redducedData')
        const newData = this.props.mapStore.reduce((object, data) => {
            object[data.code] = { value: data.value, fillColor: this.linearPalleteScale(data.value) };
            return object;
        }, {});
        //console.log('newData', newData)
        return Object.assign({}, statesDefaults, newData);
    }

    renderMap() {
        //console.log('renderMap')
        return new Datamap({
            element: ReactDOM.findDOMNode(this),
            //   fills: { defaultFill: '#bbe4f9' },
            scope: 'usa',
            data: this.redducedData(),
            geographyConfig: {
                borderWidth: 0.5,
                highlightFillColor: '#f5c006',
                popupTemplate: function (geography, data) {
                    if (data && data.value) {
                        return '<div class="hoverinfo"><strong>' + geography.properties.name + ', ' + data.value + '</strong></div>';
                    } else {
                        return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
                    }
                }
            }
        });
    }

    componentWillMount() {
        var load = async () => {
            var stored = await this.props.loadData()
        }
        load()
    }

    componentDidUpdate() {
        this.datamap = this.renderMap();
        this.datamap.updateChoropleth(this.redducedData());
    }

    render() {
        if (!this.props.mapStore.length) {
            return <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
        } else {
            return (
                <Table color={'blue'} size='small'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>NUMBER OF TRENDING STORIES AROUND THE US</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell><div id="datamap-container" /></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            );
        }
    }
}

const mapState = ({ mapStore }) => ({ mapStore })
const mapDispatch = (dispatch) => {
    return {
        loadData() {
            return dispatch(getStateArticleData())
        }
    }
}

export default connect(mapState, mapDispatch)(MapIndex)
