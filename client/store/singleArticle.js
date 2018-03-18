
import axios from 'axios';
//const masterScrapper = require('../../scrappers/masterScrapper.js');

const GET_ARTICLE_DATA = 'GET_ARTICLE_DATA'
const CREATE_ARTICLE = 'CREATE_ARTICLE'

const defaultArticle = {};

const getArticleData = article => ({ type: GET_ARTICLE_DATA, article })
const createArticle = article => ({ type: CREATE_ARTICLE, article })

export const makeArticle = (url) => dispatch => {
    axios.post(`/api/article/url/${url}`)
        .then(response => {
            axios.get(`/api/article/url/${url}`).then(response => {
                console.log('this log is a log', response.data)
            })
        })
        .catch(err => console.log(err))
}

export const fetchArticleData = (url) => dispatch => {
    axios.get(`/api/article/url/${url}`)
        .then(JSONData => {
            return dispatch(getArticleData(JSONData.data))
        })
        .catch(err => console.log(err))
}

export default function (state = defaultArticle, action) {
    switch (action.type) {
        case GET_ARTICLE_DATA:
            return action.article
        default:
            return state
    }
}