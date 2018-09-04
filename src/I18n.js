import I18n, { getLanguages } from 'react-native-i18n'
import vi from '~/src/locales/vi'
import en from '~/src/locales/en'
import { AsyncStorage } from 'react-native'
const lang = 'vi'
I18n.fallbacks = true
I18n.defaultLocale = lang
I18n.locale = lang
I18n.translations = {
    'vi': vi,
    'vi-VN': vi,
    'en-GB': en,
    'en': en
}
// getLanguages().then(languages => {
//     console.log('Device Language', languages); // ['en-US', 'en']
// })
// console.log('Vi', vi)
// console.log('En', en)

// class I18nCustomize {
//     constructor() {
//         // AsyncStorage.getItem('language', (err, result) => {
//         //     if (result){
//         //         this.data = JSON.parse(result)
//         //     }
//         // })
//     }

//     t = (key) => {
//         // if (this.data && this.data[key]){
//         //     return this.data[key]
//         // }
//         return I18n.t(key)
//     }

//     // update = (newData) => {
//     //     this.data = newData
//     // }
// }

// const i18nInstance = new I18nCustomize()
// export default i18nInstance

export default I18n