import { takeLatest, takeEvery, all } from 'redux-saga/effects'

import api from '~/src/store/api'
import { createRequestSaga } from '~/src/store/sagas/common'
import { noop } from '~/src/store/actions/common'

export const requestAddCreditCard = createRequestSaga({
    request: api.credit.addCreditCard,
    key: 'credit/addCreditCard',
})

// root saga reducer
export default function* fetchWatcher() {
    yield all([
        takeLatest('credit/addCreditCard', requestAddCreditCard),
    ])
}


