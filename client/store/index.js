import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import singleArticle from './singleArticle'
import relatedArticles from './relatedArticles'
import landingPageArticles from './landingPageArticles'
import mapStore from './mapStore'

const reducer = combineReducers({ singleArticle, relatedArticles, landingPageArticles, mapStore })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
