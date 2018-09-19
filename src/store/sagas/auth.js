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
            if (data && data.accessToken) {
                const { args, ...rest } = data
                return saveUserData(rest)
            }
            return noop('')
        }
    ]
})

export const requestSignUp = createRequestSaga({
    request: api.auth.signUp,
    key: 'auth/signUp',
    success: [
        (data) => {
            console.log('Data SignIn Saga', data)
            if (data && data.accessToken) {
                const { args, ...rest } = data
                return saveUserData(rest)
            }
            return noop('')
        }
    ]
})

export const requestCreateOTPToken = createRequestSaga({
    request: api.auth.createOTPToken,
    key: 'auth/createOTPToken',
})

export const requestVerifyOTPToken = createRequestSaga({
    request: api.auth.verifyOTPToken,
    key: 'auth/verifyOTPToken',
})

export const requestCheckExistUser = createRequestSaga({
    request: api.auth.checkExistUser,
    key: 'auth/checkExistUser',
})

export const requestChangePassword = createRequestSaga({
    request: api.auth.changePassword,
    key: 'auth/changePassword',
})

// root saga reducer
export default function* fetchWatcher() {
    yield all([
        takeLatest('auth/signIn', requestSignIn),
        takeLatest('auth/signUp', requestSignUp),
        takeLatest('auth/createOTPToken', requestCreateOTPToken),
        takeLatest('auth/verifyOTPToken', requestVerifyOTPToken),
        takeLatest('auth/checkExistUser', requestCheckExistUser),
        takeLatest('auth/changePassword', requestChangePassword)
    ])
}


