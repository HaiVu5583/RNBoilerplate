import { Navigation } from 'react-native-navigation'
import registerScreens from '~/src/containers'
import configStore from '~/src/store/configStore'
import Icon from '~/src/components/FontIcon'
import { YellowBox } from 'react-native'
const store = configStore()
import { BOTTOM_TABS } from '~/src/constants'
import { persistStore } from 'redux-persist'

const _getBottomTabIcon = (tabs, size, color) => {
    const promiseList = []
    for (let tab of tabs) {
        promiseList.push(Icon.getImageSource(tab.icon, size, color))
    }
    return Promise.all(promiseList)
}

const _getBottomTabs = (bottomTabs) => {
    return BOTTOM_TABS.map((tab, index) => ({
        component: {
            name: tab.component,
            id: tab.id,
            options: {
                bottomTab: {
                    text: tab.name,
                    icon: bottomTabs[index],
                    iconColor: 'gray',
                    selectedIconColor: '#F16654',
                }
            },
        }
    }))
}


const persist = (store) => {
    return new Promise(resolve => {
        persistStore(store, undefined, () => {
            resolve();
        });
    })
}

YellowBox.ignoreWarnings([
    'Warning: Module SafeAreaManager requires',
]);

export const run = () => {
    console.log('Run Store', store)
    persist(store)
    registerScreens(store)
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setDefaultOptions({
            animations: {
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
                visible: true
            },
            bottomTabs: {
                titleDisplayMode: 'alwaysShow'
            }
        })

        _getBottomTabIcon(BOTTOM_TABS, 24, '#F16654').then(bottomTabs => {
            Navigation.setRoot({
                root: {
                    stack: {
                        id: 'mainStack',
                        children: [
                            {
                                sideMenu: {
                                    id: 'sideMenu',
                                    left: {
                                        component: {
                                            name: 'gigabankclient.SplashScreen',
                                        }
                                    },
                                    center: {
                                        bottomTabs: {
                                            id: 'bottomTabs',
                                            children: _getBottomTabs(bottomTabs)
                                        }
                                    },
                                }
                            }
                        ]
                    },
                }
            })

        })


    })

}