import { fork, takeLatest, takeEvery, all } from 'redux-saga/effects'
import homeSaga from './home'
import testSaga from './test'


// saga must be a function like generator of other functions
export default function* () {
    yield all([
        fork(homeSaga),
        fork(testSaga)
    ])
}
