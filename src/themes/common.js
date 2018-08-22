import { getFontStyle } from '~/src/utils'
import { Dimensions, PixelRatio } from 'react-native'
const window = Dimensions.get('window')
import { getElevation } from '~/src/utils'
export const LINE_HEIGHT = PixelRatio.roundToNearestPixel(0.5)
export const DEVICE_WIDTH = window.width
export const DEVICE_HEIGHT = window.height

export const COLORS = {
    WHITE: 'rgba(255, 255, 255, 1)',
    LIGHT_WHITE: 'rgba(255, 255, 255, 0.7)',
    ERROR: 'rgba(255, 0, 0, 0.7)',
    BLUE: '#1F73B6',
    DARK_BLUE: '#43597B'
}

export const ASSETS = {
    MAIN_BACKGROUND: require('~/src/assets/background.jpg')
}

export const DEFAULT_PUSH_ANIMATION = {
    content: {
        x: {
            from: 1000,
            to: 0,
            duration: 300,
            interpolation: 'accelerate',
        },
    }
}

export const DEFAULT_POP_ANIMATION = {
    content: {
        x: {
            from: 0,
            to: 1000,
            duration: 300,
            interpolation: 'accelerate',
        },
    }

}


export const THEMES = {
    light: 'light',
    dark: 'dark'
}

export const FONT_WEIGHTS = {
    light: 'light',
    regular: 'regular',
    medium: 'medium',
    bold: 'bold',
    thin: 'thin'
}

export const TEXT_STYLES = {
    sologan: {
        ...getFontStyle(FONT_WEIGHTS.medium),
        fontSize: 30,
        color: COLORS.LIGHT_WHITE
    },

    h4: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 34
    },
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
    },
    white: {
        color: COLORS.WHITE
    },
    lightWhite: {
        color: COLORS.LIGHT_WHITE
    },
    center: {
        textAlign: 'center'
    },
    error: {
        color: COLORS.ERROR
    },
    thin: {
        ...getFontStyle(FONT_WEIGHTS.thin),
    },
    light: {
        ...getFontStyle(FONT_WEIGHTS.light),
    },
    medium: {
        ...getFontStyle(FONT_WEIGHTS.medium),
    },
    bold: {
        ...getFontStyle(FONT_WEIGHTS.bold),
    }
}

export const TEXT_INPUT_STYLES = {
    white: {
        color: COLORS.WHITE,
        placeholderTextColor: COLORS.LIGHT_WHITE,
        borderBottomWidth: LINE_HEIGHT,
        borderBottomColor: COLORS.WHITE
    }
}

export const BUTTON_STYLES = {
    round: {
        borderRadius: 25
    },
    flat: {
        backgroundColor: 'transparent',
        ...getElevation(0)
    },
    full: {
        width: '100%'
    }
}

export const SURFACE_STYLES = {
    fullWidth: {
        width: '100%'
    },
    flex: {
        flex: 1
    },
    expand: {
        flex: 1
    },
    columnCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    columnStart: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    columnEnd: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rowEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rowSpacebetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mb20: {
        marginBottom: 20
    },
    pd20: {
        padding: 20
    },
    white: {
        backgroundColor: COLORS.WHITE
    },
    lightWhite: {
        backgroundColor: COLORS.LIGHT_WHITE
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    transparent: {
        backgroundColor: 'transparent',
    }
}

export const TOOLBAR_HEIGHT = 56

export default {
    button: {
        borderRadius: 2,
        backgroundColor: '#1B75BB',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        ...getElevation(2)
    },
    buttonText: {
        fontSize: 14,
        color: COLORS.WHITE,
    },
    buttonDisable: {
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        ...getElevation(2)
    },
    buttonTextDisable: {
        fontSize: 14,
        color: COLORS.LIGHT_WHITE,
    },
    buttonIcon: {
        fontSize: 18,
        color: COLORS.WHITE,
        marginRight: 5
    },
    toolbar: {
        container: {
            height: TOOLBAR_HEIGHT,
            width: DEVICE_WIDTH,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            elevation: 2,
            zIndex: 10000
        },
        iconLeft: {
            fontSize: 19,
        },
        iconLeftContainer: {
            paddingLeft: 16,
            paddingRight: 32,
            height: TOOLBAR_HEIGHT,
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            fontSize: 20,
            flex: 1
        },
        iconRightContainer: {
            paddingRight: 16,
            paddingLeft: 8,
            height: TOOLBAR_HEIGHT,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        iconRight: {
            fontSize: 19,
        }


    }
}