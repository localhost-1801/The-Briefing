import axios from 'axios';
//const masterScrapper = require('../../scrappers/masterScrapper.js');

const GET_RELATED_ARTICLES = 'GET_RELATED_ARTICLES'
const CREATE_RELATED_ARTICLES = 'CREATE_RELATED_ARTICLES'
const defaultArticles = [];

const getRelatedArticles = articles => ({ type: GET_RELATED_ARTICLES, articles })
const createRelatedArticles = articles => ({ type: CREATE_RELATED_ARTICLES, articles })


export const fetchRelatedArticles = (url) => dispatch => {
 
}
export const makeRelatedArticles = (keywords, url) => dispatch => {
    console.log('nothing?')
    axios.post('api/article/related', {keywords, url})
    .then(response => {
        // dispatch(createRelatedArticles(response))
        console.log('progress', response);
    })
}

export default function (state = defaultArticles, action) {
    switch (action.type) {
        case CREATE_RELATED_ARTICLES:
            return action.articles
        default:
            return state
    }
}