import React, { Component } from 'react';
// import { VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryBar, VictoryPolarAxis, VictoryLabel } from 'victory';
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
                    <Feed.Event>
                        <Feed.Label image='https://www.fillmurray.com/200/200' />
                        <Feed.Content>
                            <Feed.Date>3 days ago</Feed.Date>
                            <Feed.Summary>
                                <a>Laura Faucet</a> created a post
        </Feed.Summary>
                            <Feed.Extra text>
                                Have you seen what's going on in Israel? Can you believe it.
        </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
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
// const mapDispatch = (dispatch) => {
//     return {
//         loadData(url) {
//             dispatch(fetchArticleData(url))
//         }
//     }
// }
const mapDispatch = null
export default connect(mapState, mapDispatch)(Tweets)
