import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '~/src/store/reducers';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['ui']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware()
let middleware = [sagaMiddleware];
if (__DEV__) {
    middleware = [...middleware, logger];
} else {
    middleware = [...middleware];
}
// const enhancer = [autoRehydrate(), applyMiddleware(...middleware)]

export default function configureStore(initialState = {}) {
    let store = createStore(
        persistedReducer,
        initialState,
        applyMiddleware(...middleware)
    )
    sagaMiddleware.run(rootSaga)
    return store
}