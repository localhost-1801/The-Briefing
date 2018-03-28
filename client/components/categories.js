import React, { Component } from 'react'
import { Icon, Breadcrumb, List } from 'semantic-ui-react'
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { fetchArticleData } from '../store/singleArticle'

class Categories extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
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
          <List>
            {singleArticle.nlu.categories.map(category =>
              <List.Item key={category.label}>
                <Icon name='chevron right' color='teal' />
                <List.Content>
                  <List.Header>{category.label.slice(category.label.lastIndexOf('/') + 1).toUpperCase()}</List.Header>
                </List.Content>
              </List.Item>
            )}
          </List>
      )
    }
  }
}

const mapState = ({ singleArticle }) => ({ singleArticle })
const mapDispatch = dispatch => {
  return {
    loadData(url) {
      dispatch(fetchArticleData(url))
    }
  }
}

export default connect(mapState, mapDispatch)(Categories)
