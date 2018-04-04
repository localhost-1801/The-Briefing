import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Form, Button } from 'semantic-ui-react'
import { makeArticle } from '../store/singleArticle'
import { makeRelatedArticles } from '../store/relatedArticles'
import { NavLink } from "react-router-dom";
import history from '../history';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleUrl: ''
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    e.preventDefault();
    this.setState({ articleUrl: e.target.value })
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.props.singleArticleAnalysis(this.state.articleUrl);
    this.setState({ articleUrl: '' })
  }

  render() {
    function formatDate(date) {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    let date = formatDate(new Date());

    return (
      <div>
        <Menu inverted borderless widths={3}>
          <Menu.Item fitted header>
          </Menu.Item>

          <Menu.Item fitted header className="logo" href='/'>The Briefing.</Menu.Item>

          <Menu.Item className="searchBar">

          <Form>
          <Form.Group unstackable>
            <input
            className="inputBar"
            placeholder='Search via Article URL'
            onChange={this.onChangeHandler}
            value={this.state.articleUrl}
            />
            <NavLink to='/singleArticleData'>
            <Button type='submit' onClick={this.onSubmitHandler}>Submit</Button>
          </NavLink>
          </Form.Group>
          </Form>

          </Menu.Item>
        </Menu>
      </div>
    )
  }
}


const mapState = ({ singleArticle, relatedArticles, landingPageArticle }) => ({ singleArticle, relatedArticles, landingPageArticle })
const mapDispatch = (dispatch, ownProps) => ({
  singleArticleAnalysis(articleUrl) {
    dispatch(makeArticle(articleUrl)).then((res) => {
      if (!res.message) {
        const keywords = res.nlu.entities[0].text
        dispatch(makeRelatedArticles(keywords, articleUrl))
      }
    }).catch(err => console.log(err))
    history.push('/singleArticleData')
  }
})

export default connect(mapState, mapDispatch)(Navbar)
