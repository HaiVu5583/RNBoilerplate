import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Platform } from 'react-native'

export const getHOCScreen = (Component, store) => {
    return class ScreenWrapper extends Component {
        static options = Component.options ? { ...Component.options } : {}
        render() {
            return (
                <Provider store={store}>
                    <Component {...this.props} />
                </Provider>
            )
        }
    }
}

export const getFontStyle = (style = 'regular') => {
    let iOSFontWeight = '400'
    let androidFontFamily = 'sans-serif'
    switch (style) {
        case 'light':
            {
                iOSFontWeight = '300'
                androidFontFamily = 'sans-serif-light'
                break;
            }

        case 'medium':
            {
                iOSFontWeight = '600'
                androidFontFamily = 'sans-serif-medium'
                break;
            }
        case 'bold':
            {
                return { fontWeight: 'bold' }
            }

        case 'regular':
        default:
            {
                iOSFontWeight = '400'
                androidFontFamily = 'sans-serif'
                break;
            }

    }
    if (Platform.OS == 'android') {
        return { fontFamily: androidFontFamily }
    }
    return { fontWeight: iOSFontWeight }
}

