import React, { Component } from 'react'
import { Provider } from 'react-redux'

export const getHOCScreen = (Component, store) => {
    return class ScreenWrapper extends Component {
        static options = Component.options ? { ...Component.options } : {}
        render() {
            return (
                <Provider store={store}>
                    <Component {...this.props}/>
                </Provider>
            )
        }
    }
}

export const chainParse = (obj, attrArr) => {
    if (!obj || typeof (obj) != 'object') {
        return null
    }
    let cloneObj = Object.assign({}, obj)
    for (let i = 0; i < attrArr.length; i++) {
        cloneObj = cloneObj[attrArr[i]]
        if (typeof (cloneObj) == 'undefined' || cloneObj == null) return null
    }
    return cloneObj
}