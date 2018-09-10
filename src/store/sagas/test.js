import { take, put, select, takeLatest, takeEvery, all, call } from 'redux-saga/effects'

asyncCall = (timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(timeout)
        }, timeout)
    })
}

function* asynFunc1(action) {
    console.log('Action Function 1', action)
    const data = yield call(asyncCall, action.payload)
    console.log('Data Func 1', data, new Date().getTime())
}

function* asynFunc2(action) {
    console.log('Action Function 2', action)
    const data = yield call(asyncCall, action.payload)
    console.log('Data Func 2', data, new Date().getTime())
}


// root saga reducer
export default function* fetchWatcher() {
    // yield all([
    //     takeEvery('home/testFunc1', asynFunc1),
    //     takeEvery('home/testFunc2', asynFunc2),
    // ])

    while (true) {
        const action1 = yield take('home/testFunc1')
        console.log('Action 1', action1)
        console.log('Call 1')
        yield call(asynFunc1, action1.payload)
        const action2 = yield take('home/testFunc2')
        console.log('Call 2')
        console.log('Action 2', action2)
        yield call(asynFunc2, action2.payload)

    }

}


