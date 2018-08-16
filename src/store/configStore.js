import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '~/src/store/reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

let middleware = [];

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

    return store
}