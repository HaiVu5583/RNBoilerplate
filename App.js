import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { AppStackRouteConfig } from '~/src/containers'
import {
    createStore,
    applyMiddleware,
    combineReducers,
} from 'redux'
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
import { Provider, connect } from 'react-redux'
import logger from 'redux-logger';
import rootReducer from '~/src/store/reducers';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '~/src/store/sagas'
import { Animated, Easing, ActivityIndicator, View, Platform, StatusBar } from 'react-native'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import I18n from '~/src/I18n'
import { languageSelector } from '~/src/store/selectors/ui'



const AppNavigator = createStackNavigator(
    AppStackRouteConfig,
    {
        initialRouteName: 'Authentication',
        navigationOptions: {
            header: null
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;
                const width = layout.initWidth
                const translateX = position.interpolate({
                    inputRange: [index - 1, index],
                    outputRange: [width, 0],
                })
                return { transform: [{ translateX }] };
            },
        }),
    }
)
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Authentication'));

const navReducer = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
}

const appReducer = combineReducers({
    nav: navReducer,
    ...rootReducer
})

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
)

const App = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = (state) => ({
    state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App)


const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, appReducer)
const sagaMiddleware = createSagaMiddleware()
let middlewares
if (__DEV__) {
    middlewares = applyMiddleware(middleware, sagaMiddleware, logger)
} else {
    middlewares = applyMiddleware(middleware, sagaMiddleware)
}

const store = createStore(
    persistedReducer,
    middlewares
)
sagaMiddleware.run(rootSaga)
const persistor = persistStore(store, undefined, () => {
    const state = store.getState()
    const language = languageSelector(state)
    I18n.locale = language.toLowerCase()
})

export default class Root extends React.Component {
    _renderLoadingPersist = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={Platform.OS == 'ios' ? 'large' : 80} color={'black'} />
            </View>
        )
    }
    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    loading={this._renderLoadingPersist()}
                    persistor={persistor}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="#1F73B6"
                    />
                    <AppWithNavigationState />
                </PersistGate>
            </Provider>
        );
    }
}