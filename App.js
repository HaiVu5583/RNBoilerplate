import { Navigation } from 'react-native-navigation'
import registerScreens from '~/src/containers'
import configStore from '~/src/store/configStore'
import Icon from '~/src/components/FontIcon'
import { YellowBox } from 'react-native'
import { BOTTOM_TABS } from '~/src/constants'
import { persistStore } from 'redux-persist'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, COLORS } from '~/src/themes/common'
import { languageSelector } from '~/src/store/selectors/ui'
import I18n from '~/src/I18n'
import { chainParse } from '~/src/utils'
export const store = configStore()
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
    if (chainParse(state, ['auth', 'accessToken'])){
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
            // _getBottomTabIcon(BOTTOM_TABS, 24, '#F16654'),
            _persist(store)
        ]).then((values) => {
            // Apply language after restore store
            const state = store.getState()
            const language = languageSelector(state)
            I18n.locale = language.toLowerCase()

            const bottomTabs = values[0]
            _setRoot(bottomTabs)
        })
    })
}