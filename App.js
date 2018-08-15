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
    _getBottomTabIcon(['home-active', 'ring-active', 'camera', 'ring-active']).then(bottomTabs => {
        console.log('Bottom Tabs', bottomTabs)
    })

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
        Navigation.setRoot({
            root: {
                stack: {
                    id: 'mainStack',
                    options: {
                        topBar: {
                            visible: false,
                            animate: false
                        }
                    },
                    children: [
                        {
                            component: {
                                name: 'gigabankclient.SplashScreen',
                            }
                        },
                    ]
                },
            }
        })
    })
    
}