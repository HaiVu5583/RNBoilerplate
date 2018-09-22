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

export const getListCard = (...args) => ({
    type: 'credit/getListCard',
    args
})

export const setListCard = (data) => ({
    type: 'credit/setListCard',
    payload: data
})

export const deleteCard = (...args) => ({
    type: 'credit/deleteCard',
    args
})