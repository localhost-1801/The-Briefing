import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchArticleData } from '../store/singleArticle'
import { Feed, Divider } from 'semantic-ui-react'


class Tweets extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        if (this.props.singleArticle.info === undefined) {
            return <div>Loading...</div>
        }
        const tweets = this.props.singleArticle.tweets
        return (
            <div>
                <Feed>

                    {tweets.slice(0, 15).map((tweet) => {
                        return (


                                <Feed.Event>
                                    <Feed.Label key={tweet.user.name} image={tweet.user.profilePic} />
                                    <Feed.Content>
                                        <Feed.Date>{tweet.timeStamp}</Feed.Date>
                                        <Feed.Summary>
                                            {tweet.user.name}
                                        </Feed.Summary>
                                        <Feed.Extra text>
                                            {tweet.text}
                                        </Feed.Extra>
                                    <Divider />
                                    </Feed.Content>
                                </Feed.Event>
                        )
                    })}
                </Feed>

            </div>
        );
    }
}

const mapState = ({ singleArticle, relatedArticles }) => ({ singleArticle, relatedArticles })
const mapDispatch = null
export default connect(mapState, mapDispatch)(Tweets)
