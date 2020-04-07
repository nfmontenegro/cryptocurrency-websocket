import {createStore, applyMiddleware, compose} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import reducer from '../reducers'

const persistConfig = {
  key: 'user',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = [thunk]

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose) : ''

const enhancer = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(persistedReducer, enhancer)
const persistor = persistStore(store)

export {store, persistor}
