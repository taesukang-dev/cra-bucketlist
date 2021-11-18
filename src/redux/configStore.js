import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import bucketReducer from './modules/bucket'

const middlewares = [thunk]
const rootReducer = combineReducers({ bucketReducer })
const enhancer = applyMiddleware(...middlewares)
const store = createStore(rootReducer, enhancer)

export default store
