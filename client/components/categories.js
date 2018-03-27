import React, { Component } from 'react'
import { Icon, Step } from 'semantic-ui-react'
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { fetchArticleData } from '../store/singleArticle'

class Categories extends Component {
  constructor() {
    super()
  }

  componentWillMount(){
    this.props.loadData();
  }


  render() {
    const singleArticle = this.props.singleArticle;

    if (singleArticle.info === undefined) {
      return (
        <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
      )
    } else {
      return (
        <div id="categories">
        <Step.Group size='mini'>
        {singleArticle.nlu.categories.map(category =>
        <Step key={category.label}>
          <Step.Content>
            <Step.Title>{category.label.slice(category.label.lastIndexOf('/')+ 1).toUpperCase()}
            </Step.Title>
          </Step.Content>
        </Step>
      )}
      </Step.Group>
        </div>
      )
    }
  }
}


const mapState = ({ singleArticle }) => ({ singleArticle })
const mapDispatch = dispatch => {
  return {
    loadData(url){
      dispatch(fetchArticleData(url))
    }
  }
}

export default connect(mapState, mapDispatch)(Categories)
