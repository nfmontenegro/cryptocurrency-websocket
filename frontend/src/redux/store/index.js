import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'

const middleware = [thunk]

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose) : ''

const enhancer = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(reducer, enhancer)

export default store
