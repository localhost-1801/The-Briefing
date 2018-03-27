import d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React from 'react';
import ReactDOM from 'react-dom';
import statesDefaults from './states-defaults';
import collection from './states-data';
import { Grid, Image, Table } from 'semantic-ui-react'

// https://caspg.github.io/simple-data-table-map/
//https://github.com/caspg/simple-data-table-map/blob/master/app/components/DataMap.jsx

export default class MapIndex extends React.Component {
  constructor(props){
    super(props);
    this.datamap = null;
    this.state = {
      regionData: collection
    }
  }

  linearPalleteScale(value){
    const dataValues = this.state.regionData.map(function(data) { return data.value });
    const minVal = Math.min(...dataValues);
    const maxVal = Math.max(...dataValues);
    const fraction = (maxVal - minVal) / 4;
    const first = minVal + fraction;
    const second = first + fraction;
    const third = second + fraction;
    const fourth = third + fraction;

    if (value < first) return "#dee3f6"
    else if (value >= first && value < second) return '#9aafcd'
    else if (value >= second & value < third) return '#5778a2'
    else if (value >= third & value < fourth) return '#325c8b'
    else if (value >= fourth) return "#06386e"
  }

  redducedData(){
    const newData = this.state.regionData.reduce((object, data) => {
      object[data.code] = { value: data.value, fillColor: this.linearPalleteScale(data.value) };
      return object;
    }, {});
    return Object.assign({}, statesDefaults, newData);
  }

  renderMap(){
    return new Datamap({
      element: ReactDOM.findDOMNode(this),
    //   fills: { defaultFill: '#bbe4f9' },
      scope: 'usa',
      data: this.redducedData(),
      height: 400,
      geographyConfig: {
        borderWidth: 0.5,
        highlightFillColor: '#f5c006',
        popupTemplate: function(geography, data) {
          if (data && data.value) {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + ', ' + data.value + '</strong></div>';
          } else {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
          }
        }
      }
    });
  }

  componentDidMount(){
    //this.datamap = this.renderMap();
  }

  // componentDidUpdate(){
  //   this.datamap.updateChoropleth(this.redducedData());
  // }

  //<div id="datamap-container" className="chartBackground" ><h1>Noodles</h1></div>
  render(){
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

