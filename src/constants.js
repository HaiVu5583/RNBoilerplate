export const BOTTOM_TABS = [
    {
        icon: 'home-active',
        name: 'Home',
        component: 'gigabankclient.HomeScreen',
        id: 'tab1',
    },
    {
        icon: 'camera',
        name: 'Camera',
        component: 'gigabankclient.SplashScreen',
        id: 'tab2',
    },
    {
        icon: 'ring-active',
        name: 'Notification',
        component: 'gigabankclient.AnimatedScreen',
        id: 'tab3',
    },
    {
        icon: 'user-active',
        name: 'Account',
        component: 'gigabankclient.FeedScreen',
        id: 'tab4',
    }
]

export const BUILD_INFO = {
    'X-DATA-VERSION': 1,
    'X-VERSION': 1,
}

export const TIMEOUT_TIME = 30000
export const TIMEOUT = 'REQUEST_TIME_OUT'