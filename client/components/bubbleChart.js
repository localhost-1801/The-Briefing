import React from 'react';
import { connect } from 'react-redux';
import { ResponsiveBubble } from '@nivo/circle-packing';
import { Menu } from 'semantic-ui-react'


class BubbleChart extends React.Component {
  constructor() {
    super()

    this.state = {
      aggregate: false
    }
    this.parseData = this.parseData.bind(this);
    this.parseDataMultiple = this.parseDataMultiple.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.resizeChart = this.resizeChart.bind(this);
  }

  handleClick() {
    this.setState({
      aggregate: !this.state.aggregate
    })
  }

  parseData(data) {
    let resultArr = [];
    data.nlu.keywords.forEach(keyword => {
      let resultObj = {};
      resultObj.name = keyword.text;
      resultObj.color = 'hsl(' + Math.floor(Math.random() * 366) + ', 70%, 50%)';
      resultObj.loc = Math.floor(keyword.relevance * 100);
      resultArr.push(resultObj);
    })
    return resultArr
  }

  parseDataMultiple(data) {
    let resultObj = {};
    let resultArr = [];
    data.forEach(dataObj => {
      let parsedObj = this.parseData(dataObj)
      parsedObj.forEach(obj => {
        pushIntoResultObj(obj)
      })
    })
    function pushIntoResultObj(singleDataObj) {
      if (!resultObj.hasOwnProperty(singleDataObj.name)) {
        resultObj[singleDataObj.name] = singleDataObj.loc
      } else {
        resultObj[singleDataObj.name] = Math.floor(((resultObj[singleDataObj.name] + singleDataObj.loc) / 2));
      }
    }
    Object.keys(resultObj).forEach(key => resultArr.push({
      name: key,
      color: 'hsl(' + Math.floor(Math.random() * 366) + ', 70%, 50%)',
      loc: resultObj[key]
    }))
    return resultArr;
  }

  componentDidMount() {
    this.resizeChart();
    window.addEventListener('resize', this.resizeChart);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeChart);
  }

  resizeChart() {
    let computedHeight = 0.28 * +window.innerWidth
    this.bubbleWrapper.style.height = computedHeight + 'px'
    this.bubbleWrapper.style.width = computedHeight + 'px'
  }

  render() {
    let bubbleData = [];
    if (this.state.aggregate) {
      bubbleData = this.parseDataMultiple(this.props.relatedArticles)
    } else {
      bubbleData = this.parseData(this.props.singleArticle)
    }
    if (bubbleData.length === 0) {
      return (
        <div>
          <Menu size={'mini'} attached tabular>
            <Menu.Item name='single' active={!this.state.aggregate} onClick={this.handleClick} />
            <Menu.Item name='aggregate' active={this.state.aggregate} onClick={this.handleClick} />
          </Menu>
          <div>loading</div>
        </div>
      )
    }

    return (
      <div id='bubbleWrapperWrapper'>
        <div className='bubbleWrapper' ref={(node) => { this.bubbleWrapper = node; }}>
          <div id='toggleBubble'>
            <Menu size={'mini'} attached tabular>
              <Menu.Item name='single' active={!this.state.aggregate} onClick={this.handleClick} />
              <Menu.Item name='aggregate' active={this.state.aggregate} onClick={this.handleClick} />
            </Menu>
          </div>
          <ResponsiveBubble
            root={
              {
                "name": "pie",
                "color": "hsl(284, 70%, 50%)",
                "children": bubbleData
              }
            }
            margin={{
              "top": 20,
              "right": 20,
              "bottom": 20,
              "left": 20
            }}
            identity="name"
            value="loc"
            colors="nivo"
            colorBy="name"
            leavesOnly={true}
            padding={6}
            labelSkipRadius={32}
            labelTextColor="inherit:darker(0.8)"
            borderWidth={2}
            fill={[
              {
                "match": {
                  "depth": 1
                },
                "id": "lines"
              }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={12}
          />
        </div>
      </div>
    )
  }
}

const mapState = ({ singleArticle, relatedArticles }) => ({ singleArticle, relatedArticles })
const mapDispatch = (dispatch) => {
  return {
    loadData(url) {
      dispatch(fetchArticleData(url))
      dispatch(fetchRelatedArticles(url))
    }
  }
}

export default connect(mapState, mapDispatch)(BubbleChart)
