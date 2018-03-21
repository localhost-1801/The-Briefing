import React, { Component } from 'react';
// import { VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryBar, VictoryPolarAxis, VictoryLabel } from 'victory';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchArticleData } from '../store/singleArticle'
import { Feed } from 'semantic-ui-react'


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
                    {tweets.slice(0, 5).map((tweet) => {
                        return <Feed.Event key={tweet.user.name} image={tweet.user.profilePic} date={tweet.timeStamp} summary={tweet.text} />
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
