import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { makeArticle } from '../store/singleArticle'
import history from '../history';
import { NavLink } from 'react-router-dom'

class ArticleAnalyzer extends Component {
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
    }
    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Analyze Your News Article!</label>
                    <input
                        placeholder='Article URL Here'
                        onChange={this.onChangeHandler}
                        value={this.state.articleUrl}
                    />
                </Form.Field>
                <NavLink to='/singleArticleData'>
                    <Button type='submit' onClick={this.onSubmitHandler}>Submit</Button>
                </NavLink>
            </Form>
        )
    }
}

const mapState = ({ singleArticle }) => ({ singleArticle })
const mapDispatch = (dispatch, ownProps) => ({
    singleArticleAnalysis(articleUrl) {
        dispatch(makeArticle(articleUrl))
        history.push('/singleArticleData')
    }
})

export default connect(mapState, mapDispatch)(ArticleAnalyzer)
