import { fork, takeLatest, takeEvery, all } from 'redux-saga/effects'
import homeSaga from './home'
import testSaga from './test'
import authSaga from './auth'
import creditSaga from './credit'



// saga must be a function like generator of other functions
export default function* () {
    yield all([
        fork(homeSaga),
        fork(testSaga),
        fork(authSaga),
        fork(creditSaga)
    ])
}
