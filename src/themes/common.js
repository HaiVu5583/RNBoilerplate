import { getFontStyle } from '~/src/utils'
import { Dimensions, PixelRatio } from 'react-native'
const { width, height } = Dimensions.get('window')
import { getElevation } from '~/src/utils'
const LINE_HEIGHT = PixelRatio.roundToNearestPixel(0.5)


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
    sologan: {
        ...getFontStyle(FONT_WEIGHTS.medium),
        fontSize: 30,
        color: 'rgba(255, 255, 255, 0.85)'
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
        color: 'white'
    },
    center: {
        textAlign: 'center'
    },
    error: {
        color: 'rgba(255, 0, 0, 0.85)'
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
        color: 'white',
        placeholderTextColor: 'rgba(255, 255, 255, 0.7)',
        borderBottomWidth: LINE_HEIGHT,
        borderBottomColor: 'white'
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
    blue: {
        backgroundColor: '#256CAD'
    }

}

export const TOOLBAR_HEIGHT = 56

export default {
    button: {
        borderRadius: 2,
        backgroundColor: '#1B75BB',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        ...getElevation(2)
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