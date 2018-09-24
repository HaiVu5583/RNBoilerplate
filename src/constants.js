// export const BOTTOM_TABS = [
//     {
//         icon: 'home-active',
//         name: 'Home',
//         component: 'gigabankclient.HomeScreen',
//         id: 'tab1',
//     },
//     {
//         icon: 'camera',
//         name: 'Camera',
//         component: 'gigabankclient.SplashScreen',
//         id: 'tab2',
//     },
//     {
//         icon: 'ring-active',
//         name: 'Notification',
//         component: 'gigabankclient.AnimatedScreen',
//         id: 'tab3',
//     },
//     {
//         icon: 'user-active',
//         name: 'Account',
//         component: 'gigabankclient.FeedScreen',
//         id: 'tab4',
//     }
// ]

export const BOTTOM_TABS = [
    {
        id: 1,
        icon: 'home',
    },
    {
        id: 2,
        icon: 'Clingmepay-line',
    },
    {
        id: 3,
        icon: 'user-info-line',
    }
]

export const BUILD_INFO = {
    'X-DATA-VERSION': 1,
    'X-VERSION': 1,
}

export const TIMEOUT_TIME = 30000
export const TIMEOUT = 'REQUEST_TIME_OUT'
export const LANGUAGES = {
    VI: 'VI',
    EN: 'EN'
}

export const DIALOG_MODE = {
    NEUTRAL: 'NEUTRAL',
    YES_NO: 'YES_NO'
}

export const PERMISSION_RESPONSE = {
    DENIED: 'denied',
    UNDEFINED: 'undefined',
    AUTHORIZED: 'authorized',
    RESTRICTED: 'restricted',
    UNDETERMINED: 'undetermined'
}

export const CARD_TYPE = {
    VISA_MASTER: 2,
    ATM: 3
}

export const ADDED_CARD_TYPE = {
    GIGABANK: 1,
    ADDED: 2
}

export const ERR_NETWORK = 'TypeError: Network request failed'
