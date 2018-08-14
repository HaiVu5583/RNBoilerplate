import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '~/src/store/reducers';

let middleware = [];

if (__DEV__) {
    // const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
    middleware = [...middleware, logger];
} else {
    middleware = [...middleware];
}

export default function configureStore(initialState={}) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
}