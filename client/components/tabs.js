import _ from 'lodash'
import React, { Component } from 'react'
import { Divider, Tab } from 'semantic-ui-react'
import { ArticleAnalyzer, RadarChart, Tweets, StackedBar, SingleBarChart, OverallSentimentAnalysisWithProps, KeywordBoxWProps, RadarChartWProps, Categories, BarChart, BubbleChart, RelatedArticlesSingle } from '../components'


const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey',
]

const panes = [
  { menuItem: 'Radar', render: () => <Tab.Pane attached={false}><RadarChartWProps /></Tab.Pane> },
  { menuItem: 'Bar', render: () => <Tab.Pane attached={false}><BarChart /></Tab.Pane> },
]

class Tabs extends Component {
  state = { color: colors[0] }

  handleColorChange = e => this.setState({ color: e.target.value })

  render() {
    const { color } = this.state

    return (
      <div>
        <select onChange={this.handleColorChange}>
          {_.map(colors, c => <option key={c} value={c}>{_.startCase(c)}</option>)}
        </select>

        <Divider hidden />

        <Tab
          menu={{ color, attached: false, tabular: false }}
          panes={panes}
        />
      </div>
    )
  }
}

export default Tabs