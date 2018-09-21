export const addCreditCard = (...args) => ({
    type: 'credit/addCreditCard',
    args
})

export const getBankList = (...args) => ({
    type: 'credit/getBankList',
    args
})

export const setBankList = (data) => ({
    type: 'credit/setBankList',
    payload: data
})