var Twitter = require('twitter');
const secrets = require('../../../secrets')


var client = new Twitter({
 consumer_key: process.env.TWITTER_KEY,
 consumer_secret: process.env.TWITTER_SECRET,
 access_token_key: process.env.TWITTER_TOKEN,
 access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

function Tweet () {
    return {
        params: {
            q: ''
        },
        query: async function (queryString) {
            this.params.q = queryString
            this.params.lang = 'en'
            const tweets = await client.get('search/tweets', this.params)
            const prunedTweets = tweets.statuses.map((tweet) => {
                let pruned = {}
                pruned.text = tweet.text
                pruned.user = {
                    name: tweet.user.screen_name,
                    profilePic: tweet.user.profile_image_url
                }
                pruned.timeStamp = tweet.created_at
                return pruned
            })
            return prunedTweets
        }
    }
}

module.exports = Tweet
