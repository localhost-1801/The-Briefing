import React from 'react';
import { connect } from 'react-redux';
import { ResponsiveBubble } from '@nivo/circle-packing';


class BubbleChart extends React.Component {
  constructor(){
    super()

    this.state = {
      aggregate: false
    }
  }

  parseData(data){

  }
  parseDataMultiple(data){

  }

  render(){
    if(this.props.relatedArticles.length === 0 || this.props.singleArticle.tone === undefined){
      return (<div>no related articles</div>)
    }
    let bubbleData = [];
    if(this.state.aggregate){
      bubbleData = this.parseDataMultiple(this.props.relatedArticles)
    }else {
      bubbleData = this.parseData(this.props.singleArticle)
    }
    return(
      <div className='bubbleWrapper'>
      <ResponsiveBubble
        root={
          {
            "name": "pie",
            "color": "hsl(284, 70%, 50%)",
            "children": [
              {
                "name": "outline",
                "color": "hsl(335, 70%, 50%)",
                "loc": 1
              },
              {
                "name": "slices",
                "color": "hsl(86, 70%, 50%)",
                "loc": 2
              },
              {
                "name": "bbox",
                "color": "hsl(64, 70%, 50%)",
                "loc": 3
              }
            ]
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
        labelTextColor="inherit:darker(0.8)"
        borderWidth={2}
        defs={[
            {
                "id": "lines",
                "background": "none",
                "color": "inherit",
                "rotation": -45,
                "lineWidth": 5,
                "spacing": 8
            }
        ]}
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

export default connect (mapState, mapDispatch)(BubbleChart)
