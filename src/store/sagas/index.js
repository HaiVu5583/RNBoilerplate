import { fork, takeLatest, takeEvery, all } from 'redux-saga/effects'
import homeSaga from './home'


// saga must be a function like generator of other functions
export default function* () {
    yield all([
        fork(homeSaga),
    ])
}
