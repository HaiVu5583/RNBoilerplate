import dark from './dark'
import light from './light'
import { THEMES } from '~/src/themes/common.js'
export const getTheme = (themeName) => {
    if (themeName == THEMES.light) {
        return light
    } else if (themeName == THEMES.dark) {
        return dark
    }
}