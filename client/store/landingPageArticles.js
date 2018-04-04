import axios from 'axios';

const GET_LANDING_ARTICLES = 'GET_LANDING_ARTICLES'
const CREATE_LANDING_ARTICLES = 'CREATE_LANDING_ARTICLES'
const defaultArticles = [];

const getLandingArticles = articles => ({ type: GET_LANDING_ARTICLES, articles })
const createLandingArticles = articles => ({ type: CREATE_LANDING_ARTICLES, articles })

export const fetchlandingArticles = () => dispatch => {
    return axios.get(`api/article/landing`)
        .then(response => {
            dispatch(getLandingArticles(response.data))
            return response.data
        })
}

export const makelandingArticles = () => dispatch => {
    return axios.post(`api/article/landing`)
        .then(response => {
            dispatch(createLandingArticles(response.data))
            return response.data
        })
}


export default function (state = defaultArticles, action) {
    switch (action.type) {
        case GET_LANDING_ARTICLES:
            return action.articles
        case CREATE_LANDING_ARTICLES:
            return action.articles
        default:
            return state
    }
}
