import SHA256 from 'crypto-js/sha256'
import CryptoJS from 'crypto-js'
import { BUILD_INFO } from '~/src/constants'
import { API_URL, SECRET_KEY } from './constants'
import { store } from '~/App'
import { chainParse } from '~/src/utils'

const convertParamToPath = (data, encode = false) => data ? Object.keys(data).map((key) => key + '=' + (encode ? encodeURIComponent(data[key]) : data[key])).join('&') : ''

const hashSHA256 = (strData) => {
    return SHA256(strData).toString(CryptoJS.enc.Hex)
}

const resolveResponse = async (res, extractHeaders) => {
    console.log('Res', res)
    let headerObj = {}
    if (extractHeaders) {
        for (let i = 0; i < extractHeaders.length; i++) {
            headerObj[extractHeaders[i]] = res.headers.get(extractHeaders[i])
        }
    }
    let responseText = await res.text()
    try {
        let jsonBody = JSON.parse(responseText)
        if (jsonBody && typeof (jsonBody) == 'object') {
            if (headerObj && Object.keys(headerObj).length > 0) {
                return {
                    ...headerObj,
                    ...jsonBody
                }
            }
            return jsonBody
        }

    } catch (e) {
        return responseText
    }
    return responseText
}

export const get = (url, params, api, extractHeaders) => {
    const state = store.getState()
    const accessToken = chainParse(state, ['auth', 'accessToken'])
    let sendHeader = {
        'X-DATA-VERSION': BUILD_INFO['X-DATA-VERSION'],
        'X-VERSION': BUILD_INFO['X-VERSION'],
        'X-UNIQUE-DEVICE': 'FAKE_DEVICE',
        'Authorization': `Bearer ${accessToken}`
    }

    if (!api) {
        api = API_URL
    }
    let tailUrl = convertParamToPath(params) ? url + '?' + convertParamToPath(params, true) : url
    let tailUrlDecode = convertParamToPath(params) ? url + '?' + convertParamToPath(params) : url
    api += tailUrl
    let timeStamp = Math.floor((new Date().getTime()) / 1000)
    let xAuthStr = (tailUrlDecode) + sendHeader['X-UNIQUE-DEVICE'] + sendHeader['X-DATA-VERSION'] + sendHeader['X-VERSION']
        + timeStamp + SECRET_KEY
    let xAuth = hashSHA256(xAuthStr)
    return fetch(api, {
        method: 'GET',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-AUTH': xAuth,
            'X-TIMESTAMP': timeStamp,
            ...sendHeader
        }
    }
    ).then(res => resolveResponse(res, extractHeaders))
}

export const post = (url, body, api, extractHeaders) => {
    const state = store.getState()
    const accessToken = chainParse(state, ['auth', 'accessToken'])

    // SHA256(X-DATA-VERSION + X-VERSION+ X-TIMESTAMP+SecretKey+Json body)
    let stringifyBody = JSON.stringify(body)
    let sendHeader = {
        'X-DATA-VERSION': BUILD_INFO['X-DATA-VERSION'],
        'X-VERSION': BUILD_INFO['X-VERSION'],
        'X-UNIQUE-DEVICE': 'FAKE_DEVICE',
        'X-LANGUAGE': 'vi',
        'Authorization': `Bearer ${accessToken}`
    }
    let timeStamp = Math.floor((new Date().getTime()) / 1000)
    let xAuthStr = (url) + sendHeader['X-UNIQUE-DEVICE'] + sendHeader['X-DATA-VERSION'] + sendHeader['X-VERSION']
        + timeStamp + SECRET_KEY + stringifyBody
    let xAuth = hashSHA256(xAuthStr) //SHA256(xAuthStr).toString(CryptoJS.enc.Hex)
    if (!api) {
        api = API_URL
    }
    console.log('API Post', api + url)
    console.log('Post body', body)
    return fetch(api + url, {
        method: 'POST',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-AUTH': xAuth,
            'X-TIMESTAMP': timeStamp,
            // 'X-NO-SESSION': getSessiauthonFromCookie(sendHeader['Cookie']),
            ...sendHeader
        },
        body: stringifyBody
    })
        .then(res => resolveResponse(res, extractHeaders))
        .catch(error => { console.log('request failed', error); });
}