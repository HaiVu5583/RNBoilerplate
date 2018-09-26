import { Navigation } from 'react-native-navigation'
import registerScreens from '~/src/containers'
import configStore from '~/src/store/configStore'
import { YellowBox, NetInfo } from 'react-native'
import { persistStore } from 'redux-persist'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, COLORS } from '~/src/themes/common'
import { languageSelector } from '~/src/store/selectors/ui'
import I18n from '~/src/I18n'
import { chainParse, showNoConnection, hideNoConnection } from '~/src/utils'
export const store = configStore()

const _persist = (store) => {
    return new Promise(resolve => {
        persistStore(store, undefined, () => {
            resolve();
        });
    })
}

const _setRoot = (bottomTabs) => {
    const state = store.getState()
    let rootScreen = 'gigabankclient.Authentication'
    if (chainParse(state, ['auth', 'accessToken'])) {
        rootScreen = 'gigabankclient.HomeScreen'
    }
    Navigation.setRoot({
        root: {
            stack: {
                id: 'mainStack',
                children: [
                    {
                        component: {
                            name: rootScreen,
                        }
                    }
                ]
            },

        }
    })
}

YellowBox.ignoreWarnings([
    'Warning: Module SafeAreaManager requires',
]);

_checkShowConnectionWarning = (connectionInfo) => {
    if (connectionInfo.type == "none") {
        showNoConnection()
    } else {
        hideNoConnection()
    }
}

_listenNetworkConnection = () => {
    console.log('Call Connection')
    NetInfo.getConnectionInfo().then((connectionInfo) => {
        console.log('Connection: ', connectionInfo);
        this._checkShowConnectionWarning(connectionInfo)
    })
    NetInfo.addEventListener(
        'connectionChange',
        (connectionInfo) => {
            console.log('Connection Change', connectionInfo)
            this._checkShowConnectionWarning(connectionInfo)
        }
    )
}

export const run = () => {
    registerScreens(store)
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setDefaultOptions({
            animations: {
                push: DEFAULT_PUSH_ANIMATION,
                pop: DEFAULT_POP_ANIMATION,
            },
            topBar: {
                visible: false,
                animate: false,
                drawBehind: false,
                elevation: 2,
            },
            layout: {
            },
            statusBar: {
                drawBehind: false,
                backgroundColor: 'transparent',
                visible: true
            },
            bottomTabs: {
                titleDisplayMode: 'alwaysShow'
            }
        })
        console.log('Before Promise', new Date().getTime())
        Promise.all([
            _persist(store)
        ]).then((values) => {
            // Apply language after restore store
            const state = store.getState()
            const language = languageSelector(state)
            I18n.locale = language.toLowerCase()

            const bottomTabs = values[0]
            _setRoot(bottomTabs)
            _listenNetworkConnection()
        })
    })
}