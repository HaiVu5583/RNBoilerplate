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
export const OTP_COUNTDOWN_TIME = 60
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
export const MONEY_SOURCE_TYPE = {
    BANK: 'BANK',
    CREDIT_CARD: 'CREDIT_CARD'
}
export const MONEY_SOURCE_MODE = {
    MANAGE: 'MANAGE',
    SELECT: 'SELECT'
}

export const SCREENS = {
    ALERT: {
        id: 'Alert',
        name: 'gigabankclient.AlertScreen'
    },
    CHARGE_PHONE: {
        id: 'ChargePhone',
        name: 'gigabankclient.ChargePhone'
    },
    CHARGE_PHONE_AUTHEN: {
        id: 'ChargePhoneAuthen',
        name: 'gigabankclient.ChargePhoneAuthen'
    },
    MONEY_SOURCE: {
        id: 'MoneySource',
        name: 'gigabankclient.MoneySource'
    },
    ENTER_PASSWORD: {
        id: 'EnterPassword',
        name: 'gigabankclient.EnterPassword'
    },
    WITH_DRAW: {
        id: 'WithDraw',
        name: 'gigabankclient.WithDraw'
    },
    WITH_DRAW_ADD_CARD: {
        id: 'WithDrawAddCard',
        name: 'gigabankclient.WithDrawAddCard'
    },
    WITH_DRAW_SEARCH: {
        id: 'WithDrawSearch',
        name: 'gigabankclient.WithDrawSearch'
    },
    WITH_DRAW_INFO: {
        id: 'WithDrawInfo',
        name: 'gigabankclient.WithDrawInfo'
    },
    WITH_DRAW_AUTHEN: {
        id: 'WithDrawAuthen',
        name: 'gigabankclient.WithDrawAuthen'
    },
}