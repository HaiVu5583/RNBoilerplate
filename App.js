import { Navigation } from 'react-native-navigation'
import registerScreens from '~/src/containers'
import configStore from '~/src/store/configStore'
import Icon from '~/src/components/FontIcon'
const store = configStore()

const _getBottomTabIcon = (iconList, size, color) => {
    const promiseList = []
    for (let icon of iconList) {
        console.log('Bottom Tab Icon', icon)
        promiseList.push(Icon.getImageSource(icon, size, color))
    }
    return Promise.all(promiseList)
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
                drawBehind: true,
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
            // console.log('Bottom Tabs', bottomTabs[0])

            // Navigation.setRoot({
            //     root: {
            //         stack: {
            //             id: 'mainStack',
            //             options: {
            //                 topBar: {
            //                     visible: false,
            //                     animate: false
            //                 }
            //             },
            //             children: [
            //                 {
            //                     component: {
            //                         name: 'gigabankclient.SplashScreen',
            //                     }
            //                 },
            //             ]
            //         },
            //     }
            // })

            Navigation.setRoot({
                root: {
                    bottomTabs: {
                        children: [
                            {
                                component: {
                                    name: 'gigabankclient.SplashScreen',
                                    options: {
                                        bottomTab: {
                                            text: 'Splash',
                                            icon: bottomTabs[0],
                                            iconColor: 'green',
                                        }
                                    },                                    
                                },
                            },
                            {
                                component: {
                                    name: 'gigabankclient.HomeScreen',
                                    options: {
                                        bottomTab: {
                                            text: 'Home',
                                            icon: bottomTabs[1]
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
                                            icon: bottomTabs[2]
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
                                            icon: bottomTabs[3]
                                        }
                                    },
                                },
                            },
                        ],
                    },
                }
            })

        })


    })

}