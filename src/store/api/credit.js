import { get, post } from './common'
export default {
    addCreditCard: (cardType) => {
        return get('/credit/add-credit-card', { cardType })
    },
    getBankList: () => {
        return get('/bank/list')
    },
    getListCard: () => {
        return get('/credit/list-card')
    }
}