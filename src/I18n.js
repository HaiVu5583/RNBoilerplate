import I18n from 'react-native-i18n'
import vi from '~/src/locales/vi'
import en from '~/src/locales/en'
import { AsyncStorage } from 'react-native'
const lang = 'vi'
I18n.fallbacks = true
I18n.defaultLocale = lang
I18n.translations = { vi, en }

class I18nCustomize {
    constructor() {
        AsyncStorage.getItem('language', (err, result) => {
            if (result){
                this.data = JSON.parse(result)
            }
        })
    }

    t = (key) => {
        if (this.data && this.data[key]){
            return this.data[key]
        }
        return I18n.t(key)
    }

    update = (newData) => {
        this.data = newData
    }
}

const i18nInstance = new I18nCustomize()
export default i18nInstance