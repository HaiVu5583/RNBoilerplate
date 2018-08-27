// import { Navigation } from 'react-native-navigation'
// import registerScreens from '~/src/containers'
// import configStore from '~/src/store/configStore'
// import Icon from '~/src/components/FontIcon'
// import { YellowBox } from 'react-native'
// const store = configStore()
// import { BOTTOM_TABS } from '~/src/constants'
// import { persistStore } from 'redux-persist'
// import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION } from '~/src/themes/common'
// import { languageSelector } from '~/src/store/selectors/ui'
// import I18n from '~/src/I18n'

// const _getBottomTabIcon = (tabs, size, color) => {
//     const promiseList = []
//     for (let tab of tabs) {
//         promiseList.push(Icon.getImageSource(tab.icon, size, color))
//     }
//     return Promise.all(promiseList)
// }

// const _getBottomTabs = (bottomTabs) => {
//     return BOTTOM_TABS.map((tab, index) => ({
//         component: {
//             name: tab.component,
//             id: tab.id,
//             options: {
//                 bottomTab: {
//                     text: tab.name,
//                     icon: bottomTabs[index],
//                     iconColor: 'gray',
//                     selectedIconColor: '#F16654',
//                 }
//             },
//         }
//     }))
// }


// const _persist = (store) => {
//     return new Promise(resolve => {
//         persistStore(store, undefined, () => {
//             resolve();
//         });
//     })
// }

// const _setRoot = (bottomTabs) => {
//     Navigation.setRoot({
//         root: {
//             stack: {
//                 id: 'mainStack',
//                 children: [
//                     // {
//                     //     sideMenu: {
//                     //         id: 'sideMenu',
//                     //         left: {
//                     //             component: {
//                     //                 name: 'gigabankclient.SplashScreen',
//                     //             }
//                     //         },
//                     //         center: {
//                     //             bottomTabs: {
//                     //                 id: 'bottomTabs',
//                     //                 children: _getBottomTabs(bottomTabs)
//                     //             }
//                     //         },
//                     //     }
//                     // },
//                     {
//                         component: {
//                             name: 'gigabankclient.Authentication'
//                         }
//                     }
//                 ]
//             },
//         }
//     })
// }

// YellowBox.ignoreWarnings([
//     'Warning: Module SafeAreaManager requires',
// ]);


// export const run = () => {
//     registerScreens(store)
//     Navigation.events().registerAppLaunchedListener(() => {
//         Navigation.setDefaultOptions({
//             animations: {
//                 push: DEFAULT_PUSH_ANIMATION,
//                 pop: DEFAULT_POP_ANIMATION,
//             },
//             topBar: {
//                 visible: false,
//                 animate: false,
//                 drawBehind: false,
//                 elevation: 2,
//             },
//             layout: {
//             },
//             statusBar: {
//                 drawBehind: false,
//                 visible: true
//             },
//             bottomTabs: {
//                 titleDisplayMode: 'alwaysShow'
//             }
//         })
//         console.log('Before Promise', new Date().getTime())
//         Promise.all([
//             _getBottomTabIcon(BOTTOM_TABS, 24, '#F16654'),
//             _persist(store)
//         ]).then((values) => {
//             // Apply language after restore store
//             const state = store.getState()
//             const language = languageSelector(state)
//             I18n.locale = language.toLowerCase()

//             const bottomTabs = values[0]
//             _setRoot(bottomTabs)
//         })
//     })
// }



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
import { Animated, Easing, ActivityIndicator, View, Platform } from 'react-native'
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
    console.log('Store State', store.getState())
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
                    <AppWithNavigationState />
                </PersistGate>
            </Provider>
        );
    }
}