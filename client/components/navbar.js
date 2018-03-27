import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Header, Form, Button, Icon, Segment } from 'semantic-ui-react'
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { makeRelatedArticles } from '../store/relatedArticles'
import { Link, NavLink } from "react-router-dom";
import history from '../history';

// TODO: Update <Search> usage after its will be implemented

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
    this.setState({ articleUrl: ''})
  }

  render() {
    console.log(this.props)

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
          <Menu.Item fitted header className="logo">{date} </Menu.Item>
          <Menu.Item fitted header className="logo" href='/'>The Briefing.</Menu.Item>
          <Menu.Item fitted position='right'>
            <Form>
              <Form.Field className="searchBar" >
                <input
                  placeholder='Search via Article URL'
                  onChange={this.onChangeHandler}
                  value={this.state.articleUrl}
                />
              </Form.Field>
              <NavLink to='/singleArticleData'>
                  <Button type='submit' onClick={this.onSubmitHandler} >Submit</Button>
              </NavLink>
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
      // console.log('in dispatch then', res);
      // const keywords = res.nlu.keywords.map(obj => obj.text)
      // console.log(keywords)
    }).catch(err => console.log(err))
    // dispatch(makeRelatedArticles(articleUrl))
    history.push('/singleArticleData')
  }
})

export default connect(mapState, mapDispatch)(Navbar)



// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {logout} from '../store'

// const Navbar = ({ handleClick, isLoggedIn }) => (
//   <div>
//     <h1>BOILERMAKER</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
