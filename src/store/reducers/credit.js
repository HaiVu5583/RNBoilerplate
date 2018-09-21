const initialState = {
    bankCardList: [],
    listCard: []
}
export const credit = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'credit/setBankList': {
            console.log('Payload Save BankList', payload)
            return {
                ...state,
                bankCardList: payload
            }
        }
        case 'credit/setListCard': {
            console.log('Payload setListCard', payload)
            return {
                ...state,
                listCard: payload
            }
        }
        case 'auth/updateAccessToken': {
            return {
                ...state,
                accessToken: payload
            }
        }
        case 'app/logout': {
            return initialState
        }
        default:
            return state
    }
}
