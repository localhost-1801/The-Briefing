
import axios from 'axios';
//const masterScrapper = require('../../scrappers/masterScrapper.js');

const GET_ARTICLE_DATA = 'GET_ARTICLE_DATA'

const defaultArticle = {};

const getArticleData = article => ({ type: GET_ARTICLE_DATA, article })

export const fetchArticleData = (url) => dispatch => {
    axios.get(`/api/url/${url}`)
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