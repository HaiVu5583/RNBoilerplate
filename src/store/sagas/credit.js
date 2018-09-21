import { takeLatest, takeEvery, all } from 'redux-saga/effects'

import api from '~/src/store/api'
import { createRequestSaga } from '~/src/store/sagas/common'
import { noop } from '~/src/store/actions/common'
import { setBankList } from '~/src/store/actions/credit'

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
            console.log('Rest Get BankList', rest)
            if (rest && rest[0]) {
                return setBankList(Object.values(rest))
            }
            return noop('')
        }
    ]
})

// root saga reducer
export default function* fetchWatcher() {
    yield all([
        takeLatest('credit/addCreditCard', requestAddCreditCard),
        takeLatest('credit/getBankList', requestGetBankList)
    ])
}


