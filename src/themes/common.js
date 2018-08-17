import { getFontStyle } from '~/src/utils'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export const THEMES = {
    light: 'light',
    dark: 'dark'
}

export const FONT_WEIGHTS = {
    light: 'light',
    regular: 'regular',
    medium: 'medium',
    bold: 'bold'
}

export const TEXT_STYLES = {
    h5: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 24
    },
    h6: {
        ...getFontStyle(FONT_WEIGHTS.medium),
        fontSize: 20
    },
    overline: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 10
    },
    body1: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 16
    },
    body2: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 14
    },
    subtitle1: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 16
    },
    subtitle2: {
        ...getFontStyle(FONT_WEIGHTS.medium),
        fontSize: 14
    }
}

export const TOOLBAR_HEIGHT = 56

export default {
    button: {
        borderRadius: 2,
        backgroundColor: '#F16654',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
    },
    buttonIcon: {
        fontSize: 18,
        color: 'white',
        marginRight: 5
    },
    toolbar: {
        container: {
            height: TOOLBAR_HEIGHT,
            width: width,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 16
        },
        iconLeft: {
            fontSize: 24,
        },
        iconLeftContainer: {
            paddingRight: 32,
        },
        title: {
            fontSize: 20
        }

        
    }
}