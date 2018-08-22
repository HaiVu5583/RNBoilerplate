import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Platform, PixelRatio, Dimensions } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { BOTTOM_TABS } from '~/src/constants'
import I18n from '~/src/I18n'

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
    const { width } = Dimensions.get('window');
    let pixelRatio = PixelRatio.get()
    // Design Dimension: width 720, pixelRatio 2
    // Assume device this case will have pixelRatio 2
    if (width * pixelRatio < 720) {
        return (width / 360) * input
    }
    return input
}

export const isValidEmail = (str) => {
    if (!str) return false

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let result = emailRegex.test(str);

    if (result == true) {

        if (str[str.indexOf('@') + 1] == '-' || str[str.length - 1] == '-') {
            return false;
        }
    }

    return result;
}

export const isValidPhoneNumer = (str) => {
    if (!str) return false
    if (str.length < 9 || str.length > 13) return false
    if (str[0] == 0 && str.length < 10) return false
    const START_VALID_PHONE_NUMBER = I18n.t('START_VALID_PHONE_NUMBER')
    let validStart = [
        ...START_VALID_PHONE_NUMBER,
        ...START_VALID_PHONE_NUMBER.map(number => '0' + number),
        ...START_VALID_PHONE_NUMBER.map(number => '84' + number),
        ...START_VALID_PHONE_NUMBER.map(number => '\\+84' + number)
    ]

    let joinCondition = validStart.join('|')
    let phoneRegexStr = '^(' + joinCondition + ')\\\d{7}$'
    let phoneRegex = new RegExp(phoneRegexStr)
    return phoneRegex.test(str)
}

export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    let newPhoneNumber = phoneNumber.toString().replace(/ /g, '')
    if (newPhoneNumber.startsWith('84') && isValidPhoneNumerWithCountryCode(newPhoneNumber)) {
        newPhoneNumber = newPhoneNumber.replace('84', '0') // replace only first occurred
    } else if (newPhoneNumber.startsWith('+84') && isValidPhoneNumerWithCountryCode(newPhoneNumber)) {
        newPhoneNumber = newPhoneNumber.replace('+84', '0') // replace only first occurred
    } else if (!newPhoneNumber.startsWith('0') && isValidPhoneNumerWithoutZero(newPhoneNumber)) {
        newPhoneNumber = '0' + newPhoneNumber
    }

    if (newPhoneNumber.length == 10) {
        newPhoneNumber = insertSpace(newPhoneNumber, 6);
        newPhoneNumber = insertSpace(newPhoneNumber, 3);
        return newPhoneNumber;
    } else if (newPhoneNumber.length == 11) {
        newPhoneNumber = insertSpace(newPhoneNumber, 7);
        newPhoneNumber = insertSpace(newPhoneNumber, 3);
        return newPhoneNumber;
    } else if (newPhoneNumber.length < 10 || newPhoneNumber.length > 11) {
        if (newPhoneNumber.length >= 10) {
            newPhoneNumber = insertSpace(newPhoneNumber, 9);
        }
        if (newPhoneNumber.length >= 7) {
            newPhoneNumber = insertSpace(newPhoneNumber, 6);
        }
        if (newPhoneNumber.length >= 4) {
            newPhoneNumber = insertSpace(newPhoneNumber, 3);
        }
        return newPhoneNumber;
    }

    return newPhoneNumber;
}

export const toNormalCharacter = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

export const isFunction = (obj) => {
    return !!(obj && obj.constructor && obj.call && obj.apply)
}