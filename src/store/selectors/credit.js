import { chainParse } from '~/src/utils'
import { CARD_TYPE } from '~/src/constants'

const emptyArray = []

export const internationalTokenCardSelector = (state) => {
    const bankList = chainParse(state, ['credit', 'bankCardList'])
    if (!bankList || bankList.length == 0) return emptyArray
    return bankList.filter(item => item.type == CARD_TYPE.VISA_MASTER && item.hasToken == 1)
}

export const domesticTokenCardSelector = (state) => {
    const bankList = chainParse(state, ['credit', 'bankCardList'])
    if (!bankList || bankList.length == 0) return emptyArray
    return bankList.filter(item => item.type == CARD_TYPE.ATM && item.hasToken == 1)
}

export const listCardSelector = (state) => {
    const listCard = chainParse(state, ['credit', 'listCard'])
    if (!listCard) return emptyArray
    return listCard
}