import { takeLatest, takeEvery, all } from 'redux-saga/effects'

import api from '~/src/store/api'
import { createRequestSaga } from '~/src/store/sagas/common'
import { noop } from '~/src/store/actions/common'
import { saveUserData } from '~/src/store/actions/auth'

export const requestSignIn = createRequestSaga({
    request: api.auth.signIn,
    key: 'auth/signIn',
    success: [
        (data) => {
            console.log('Data SignIn Saga', data)
            return noop('')
        }
    ]
})


// root saga reducer
export default function* fetchWatcher() {
    yield all([
        takeLatest('auth/signIn', requestSignIn),
    ])
}


