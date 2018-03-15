import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Checkbox, Form } from 'semantic-ui-react'
const masterArticleScrapper = require('../../scrappers/masterScrapper.js');

export class ArticleAnalyzer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleUrl: ''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({ articleUrl: event.target.value })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        masterArticleScrapper(this.state.articleUrl);
    }

    render() {
        return (
            <Form onSubmit={this.onSubmitHandler}>
                <Form.Field>
                    <label>Analyze Your News Article!</label>
                    <input
                        placeholder='Article URL Here'
                        onChange={this.onChangeHandler}
                        value={this.state.articleUrl}
                    />
                </Form.Field>
                <Button type='submit' onSubmit={this.onSubmitHandler}>Submit</Button>
            </Form>
        )
    }
}

const mapState = null;

