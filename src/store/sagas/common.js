import { call, put, take, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
    invokeCallback,
    logout
} from '~/src/store/actions/common'
import { TIMEOUT, TIMEOUT_TIME } from '~/src/constants'
import api from '~/src/store/api'
export const createRequestSaga = ({ request, key, start, stop, success, failure, cancelled, timeout = TIMEOUT_TIME, cancel }) => {

    // when we dispatch a function, redux-thunk will give it a dispatch
    // while redux-saga will give it an action instead, good for testing
    // we may not needs this if we use redux-saga, of course we can use both
    return function* (action) {
        // default is empty
        let args = action.args || []
        // check to see if we have success callback that pass as a param, so that it will be callback from where it was born
        // with this way we can make something like cleaning the messages
        let callback = typeof args[args.length - 1] === 'function' ? args[args.length - 1] : null
        if (callback) {
            args = args.slice(0, -1)
        }
        // error first callback
        let ret = null
        let err = null

        // store into redux
        const requestKey = (typeof key === 'function') ? key(...args) : key
        if (start) for (let actionCreator of start) {
            yield put(actionCreator())
        }

        try {

            // this is surely Error exception, assume as a request failed
            if (!request) {
                throw new Error("Api method not found!!!")
            }

            // we do not wait forever for whatever request !!!
            // timeout is 0 mean default timeout, so default is 0 in case user input 0
            let raceOptions = {
                data: call(request, ...args),
                isTimeout: call(delay, timeout)
            }

            if (cancel) {
                raceOptions.cancelRet = take(cancel)
            }
            let res = yield race(raceOptions)
            const { data, isTimeout, cancelRet } = res
            
            // Session Expire
            // if (data && data.code && (data.code == 1903 || data.code == 1000)) {
            //     console.log('session expired here:', action)

            //     let params = {
            //         screenName: 'Login',
            //         isSlided: true,
            //     }

            //     yield put(logout())

            //     ClingmeUtils.setUserData({
            //         cookie: '',
            //         userId: 0,
            //         nickName: '',
            //         referralCode: '',
            //         phoneNumber: '',
            //         email: ''
            //     })
            //         .then(success => {
            //             // ClingmeUtils.sendNotificationMessage(ClingmeUtils.MSG_PLAY_CLINGME_20_UNIVERSAL_VIEW_MEDIATOR, params)
            //             //ClingmeUtils.sendNotificationMessage(ClingmeUtils.MSG_PLAY_CLINGME_20_STARTSCREEN_MEDIATOR)
            //             ClingmeUtils.sendNotificationMessage(ClingmeUtils.CMD_USER_INVALID_SESSION, data)
            //         })

            //     return
            // }


            // Append Argument
            if (data) {
                data.args = args
            }

            if (isTimeout) {
                throw TIMEOUT
            } else if (cancelRet) {
                // callback on success
                if (cancelled) for (let actionCreator of cancelled) {
                    yield put(actionCreator(cancelRet, action))
                }
            } else {
                // callback on success
                if (success) for (let actionCreator of success) {
                    yield put(actionCreator(data, action))
                }

                // assign data, for cancel both ret and err is null
                ret = data

            }

        } catch (reason) {
            // anyway, we should treat this as error to log
            if (failure) for (let actionCreator of failure) {
                yield put(actionCreator(reason, action))
            }

            // mark error
            err = reason

        } finally {
            if (stop) for (let actionCreator of stop) {
                yield put(actionCreator(ret, action))
            }
            if (callback) {
                yield put(invokeCallback(callback, err, ret))
            }
        }
    }
}
