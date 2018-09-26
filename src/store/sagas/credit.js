import { takeLatest, takeEvery, all } from 'redux-saga/effects'

import api from '~/src/store/api'
import { createRequestSaga } from '~/src/store/sagas/common'
import { noop } from '~/src/store/actions/common'
import { setBankList, setListCard } from '~/src/store/actions/credit'

export const requestAddCreditCard = createRequestSaga({
    request: api.credit.addCreditCard,
    key: 'credit/addCreditCard',
})

export const requestGetBankList = createRequestSaga({
    request: api.credit.getBankList,
    key: 'credit/getBankList',
    success: [
        (data) => {
            const { args, ...rest } = data
            if (data && data.result) {
                return setBankList(data.result)
            }
            return noop('')
        }
    ]
})

export const requestListCard = createRequestSaga({
    request: api.credit.getListCard,
    key: 'credit/getListCard',
    success: [
        (data) => {
            if (data && data.result) {
                return setListCard(data.result)
            }
            return noop('')
        }
    ]
})

export const requestDeleteCard = createRequestSaga({
    request: api.credit.deleteCard,
    key: 'credit/deleteCard',
})

// root saga reducer
export default function* fetchWatcher() {
    yield all([
        takeLatest('credit/addCreditCard', requestAddCreditCard),
        takeLatest('credit/getBankList', requestGetBankList),
        takeLatest('credit/getListCard', requestListCard),
        takeLatest('credit/deleteCard', requestDeleteCard)
    ])
}


