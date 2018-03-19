import d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React from 'react';
import ReactDOM from 'react-dom';
import statesDefaults from './states-defaults';
import collection from './states-data';

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
    if (value < 100) return "#dee3f6"
    else if (value >= 100 && value < 111) return '#9aafcd'
    else if (value >= 111 & value < 122) return '#5778a2'
    else if (value >= 122 & value < 133) return '#325c8b'
    else if (value >= 133) return "#06386e"
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
    this.datamap = this.renderMap();
  }

  componentDidUpdate(){
    this.datamap.updateChoropleth(this.redducedData());
  }

  render(){
    return (
      <div id="datamap-container" />
    );
  }
}
