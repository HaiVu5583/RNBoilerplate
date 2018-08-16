import { Navigation } from 'react-native-navigation'
import registerScreens from '~/src/containers'
import configStore from '~/src/store/configStore'
import Icon from '~/src/components/FontIcon'
const store = configStore()
const BOTTOM_TABS = [
    {
        icon: 'home-active',
        name: 'Home',
        component: 'gigabankclient.HomeScreen'
    },
    {
        icon: 'camera',
        name: 'Camera',
        component: 'gigabankclient.SplashScreen'
    },
    {
        icon: 'ring-active',
        name: 'Notification',
        component: 'gigabankclient.AnimatedScreen'
    },
    {
        icon: 'user-active',
        name: 'Account',
        component: 'gigabankclient.FeedScreen'
    }
]

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


export const run = () => {
    registerScreens(store)
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setDefaultOptions({
            animations: {
            },
            topBar: {
                visible: false,
                animate: false,
                drawBehind: false,
                elevation: 2
            },
            layout: {
                // backgroundColor: 'red',
            },
            statusBar: {
                drawBehind: false,
                visible: true
            },
        })

        _getBottomTabIcon(BOTTOM_TABS, 24, '#F16654').then(bottomTabs => {
            Navigation.setRoot({
                root: {
                    stack: {
                        id: 'mainStack',
                        children: [
                            {
                                bottomTabs: {
                                    id: 'bottomTabs',
                                    children: _getBottomTabs(bottomTabs)
                                }
                            }
                        ]
                    },
                }
            })

        })


    })

}