import { Navigation } from 'react-native-navigation'
import registerScreens from '~/src/containers'
import configStore from '~/src/store/configStore'
import Icon from '~/src/components/FontIcon'
const store = configStore()

const _getBottomTabIcon = (iconList, size, color) => {
    const promiseList = []
    for (let icon of iconList) {
        promiseList.push(Icon.getImageSource(icon, size, color))
    }
    return Promise.all(promiseList)
}

const _getBottomTabs = (bottomTabs) => {
    return [
        {
            component: {
                name: 'gigabankclient.HomeScreen',
                options: {
                    bottomTab: {
                        text: 'Home',
                        icon: bottomTabs[0],
                        iconColor: 'gray',
                        selectedIconColor: '#F16654',
                    }
                },
            }
        },
        {
            component: {
                name: 'gigabankclient.SplashScreen',
                options: {
                    bottomTab: {
                        text: 'Splash',
                        icon: bottomTabs[1],
                        iconColor: 'gray',
                        selectedIconColor: '#F16654',
                    }
                },
            },
        },
        {
            component: {
                name: 'gigabankclient.AnimatedScreen',
                options: {
                    bottomTab: {
                        text: 'Animated',
                        icon: bottomTabs[2],
                        iconColor: 'gray',
                        selectedIconColor: '#F16654',
                    }
                },
            },
        },
        {
            component: {
                name: 'gigabankclient.FeedScreen',
                options: {
                    bottomTab: {
                        text: 'Feed',
                        icon: bottomTabs[3],
                        iconColor: 'gray',
                        selectedIconColor: '#F16654',
                    }
                },
            },
        },
    ]
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

        _getBottomTabIcon(['home-active', 'ring-active', 'camera', 'ring-active'], 24, '#F16654').then(bottomTabs => {
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