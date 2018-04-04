import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { LandingPage, singleArticleData } from './components'


class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/singleArticleData" component={singleArticleData} />
      </Switch>
    )
  }
}

const mapState = (state, { singleArticle, relatedArticles, landingPageArticles }) => {
  return {
    singleArticle, relatedArticles, landingPageArticles
  }
}
const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(Routes))
