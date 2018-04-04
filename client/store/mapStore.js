import axios from 'axios';

const GET_STATE_DATA = 'GET_STATE_DATA'

const defaultArticles = [];

const getStateData = data => ({ type: GET_STATE_DATA, data })

export const getStateArticleData = () => dispatch => {
    axios.get('api/article/stateData')
        .then(response => {
            dispatch(getStateData(response.data))
        })
}


export default function (state = defaultArticles, action) {
    switch (action.type) {
        case GET_STATE_DATA:
            return action.data
        default:
            return state
    }
}
