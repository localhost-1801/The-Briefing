
import axios from 'axios';

const GET_ARTICLE_DATA = 'GET_ARTICLE_DATA'
const CREATE_ARTICLE = 'CREATE_ARTICLE'

const defaultArticle = {};

const getArticleData = article => ({ type: GET_ARTICLE_DATA, article })
const createArticle = article => ({ type: CREATE_ARTICLE, article })

export const makeArticle = (url) => dispatch => {
    return axios.post(`/api/article/url/${url}`)
        .then(response => {
            window.localStorage.setItem('singleArticle', JSON.stringify(response.data))
            dispatch(createArticle(response.data))
            return response.data
        })
        .catch(err => console.log(err))
}

export const fetchArticleData = (url) => dispatch => {
    const obj = JSON.stringify({info: { url: url}})
    return axios.get(`/api/article/url/${url}`)
        .then(JSONData => {
            window.localStorage.setItem('singleArticle', obj)
            dispatch(getArticleData(JSONData.data))
            return JSONData.data
        })
        .catch(err => console.log(err))
}

export default function (state = defaultArticle, action) {
    switch (action.type) {
        case GET_ARTICLE_DATA:
            return action.article
        case CREATE_ARTICLE:
            return action.article
        default:
            return state
    }
}
