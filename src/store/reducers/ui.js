import { THEMES } from '~/src/themes/common.js'
import { LANGUAGES } from '~/src/constants'

const initialState = {
    theme: THEMES.light,
    language: LANGUAGES.VI 
}
export const ui = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'ui/changeTheme': {
            return {
                ...state,
                theme: payload
            }
        }
        case 'ui/changeLanguage': {
            return {
                ...state,
                language: payload
            }
        }
        default:
            return state
    }
}
