import { takeLatest, takeEvery, all } from 'redux-saga/effects'

import api from '~/src/store/api'
import { createRequestSaga } from '~/src/store/sagas/common'
import { noop } from '~/src/store/actions/common'

export const requestTest = createRequestSaga({
    request: api.home.testData,
    key: 'home/testRequest',
})


// root saga reducer
export default function* fetchWatcher() {
    yield all([
        takeLatest('home/testRequest', requestTest),
    ])
}


