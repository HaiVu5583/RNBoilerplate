import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Platform, PixelRatio, Dimensions } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { BOTTOM_TABS } from '~/src/constants'

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

export const chainParse = (obj, attrArr) => {
    if (!obj || typeof (obj) != 'object') {
        return null
    }

    let cloneObj = Object.assign({}, obj);

    for (let i = 0; i < attrArr.length; i++) {
        cloneObj = cloneObj[attrArr[i]]
        if (typeof (cloneObj) == 'undefined' || cloneObj == null) return null;
    }

    return cloneObj;
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

export const getElevation = (number) => {
    if (Platform.OS == 'android') return { elevation: number }
    if (number == 0) return {
        shadowColor: "black",
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0
        }
    }
    return {
        shadowColor: "black",
        shadowOpacity: 0.22,
        shadowRadius: 1.5,
        shadowOffset: {
            height: number,
            width: 0
        },
    }
}

export const changeBottomTabColor = (color) => {
    BOTTOM_TABS.forEach(item => {
        Navigation.mergeOptions(item.id, {
            bottomTabs: {
                backgroundColor: color,
            },
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
            }
        })
    })
}

export const toElevation = (number) => {
    if (Platform.OS == 'android') return { elevation: number }

    return {
        shadowColor: "black",
        shadowOpacity: number > 0 ? 0.22 : 0,
        shadowRadius: 1.5,
        shadowOffset: {
            height: number,
            width: 0
        }
    }
}

export const getWidth = (input) => {
    const {width} = Dimensions.get('window');

    let pixelRatio = PixelRatio.get()
    // Design Dimension: width 720, pixelRatio 2
    // Assume device this case will have pixelRatio 2
    if (width * pixelRatio < 720) {
        return (width / 360) * input
    }
    return input
}