import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { fetchArticleData, makeArticle } from '../store/singleArticle'

class ArticleAnalyzer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleUrl: ''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler (e) {
        e.preventDefault();
        this.setState({ articleUrl: e.target.value })
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.props.makeArticle(this.state.articleUrl);
    }
    render() {
        console.log(this.props)
        console.log(this.state.articleUrl)
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
                <Button type='submit' onClick={this.onSubmitHandler}>Submit</Button>
            </Form>
        )
    }
}

const mapState = null;
const mapDispatch = { makeArticle }

export default connect(mapState, mapDispatch)(ArticleAnalyzer)


