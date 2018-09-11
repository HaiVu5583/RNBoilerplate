import { getFontStyle } from '~/src/utils'
import { Dimensions, PixelRatio, StatusBar } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
const window = Dimensions.get('window')
import { getElevation, scaleWidth } from '~/src/utils'
export const LINE_HEIGHT = PixelRatio.roundToNearestPixel(0.5)
export const DEVICE_WIDTH = window.width
export const DEVICE_HEIGHT = window.height

export const STATUS_BAR_HEIGHT = getStatusBarHeight(true)
export const COLORS = {
    WHITE: '#FFFFFF',
    LIGHT_WHITE: 'rgba(255, 255, 255, 0.7)',
    ERROR: '#ED1C24',
    BLUE: '#1D76BB',
    DARK_BLUE: '#233C63',
    LIGHT_BLUE: '#D7E8F8',
    TRANSPARENT: 'transparent',
    BLACK: '#000000',
    GRAY: '#EAEAEC',
    LIGHT_GRAY: '#F2F2F2'
}

// const SIZES = {
//     TOOLBAR: scaleWidth(44),
//     CONTAINER_HORIZONTAL_MARGIN: scaleWidth(16),
//     CONTAINER_HORIZONTAL_SPACE: scaleWidth(32),
//     CONTAINER_HORIZONTAL_SPACE_AND_MARGIN: scaleWidth(48),
//     TITLE_DESCRIPTION: scaleWidth(121),
//     TEXT_INPUT_CONTAINER: scaleWidth(69),
//     BUTTON_FIELD: scaleWidth(54),
//     DIALOG_BUTTON: scaleWidth(42),
//     DIALOG_BUTTON_FIELD: scaleWidth(64),
//     DIALOG_SPACE: scaleWidth(28),
// }

export const SIZES = {
    TOOLBAR: 44,
    TOOLBAR_AND_STATUSBAR: 44 + STATUS_BAR_HEIGHT,
    CONTAINER_HORIZONTAL_MARGIN: 16,
    CONTAINER_HORIZONTAL_SPACE: 32,
    CONTAINER_HORIZONTAL_SPACE_AND_MARGIN: 48,
    TITLE_DESCRIPTION: 121,
    TEXT_INPUT_CONTAINER: 69,
    BUTTON_FIELD: 54,
    DIALOG_BUTTON: 42,
    DIALOG_BUTTON_FIELD: 64,
    DIALOG_SPACE: 28,
}
// console.log('SIZES', SIZES)
export const ASSETS = {
    MAIN_BACKGROUND: require('~/src/assets/background.jpg'),
    LIGHT_BACKGROUND: require('~/src/assets/background_light.jpg')
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
    thin: 'thin',
    black: 'black'
}

export const TEXT_STYLES = {
    title: {
        ...getFontStyle(FONT_WEIGHTS.black),
        fontSize: 32,
        lineHeight: 42,
        // letterSpacing: 5
    },
    description: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 14,
        lineHeight: 18,
        // letterSpacing: 10
    },
    info: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 12,
        lineHeight: 16,
    },
    buttonText: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 14,
        lineHeight: 24,
        // letterSpacing: 10
    },
    textInput: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 14,
        // lineHeight: 24,
        // letterSpacing: 10
    },
    error: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        color: COLORS.ERROR,
        fontSize: 12,
        lineHeight: 18,
        // letterSpacing: 10
    },
    dialogTitle: {
        ...getFontStyle(FONT_WEIGHTS.bold),
        fontSize: 20,
        lineHeight: 24,
        // letterSpacing: 10
        color: COLORS.DARK_BLUE
    },
    dialogBody: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 16,
        lineHeight: 24,
        // letterSpacing: 10
        color: COLORS.BLACK
    },


    // sologan: {
    //     ...getFontStyle(FONT_WEIGHTS.medium),
    //     fontSize: 30,
    //     color: COLORS.LIGHT_WHITE
    // },

    // h4: {
    //     ...getFontStyle(FONT_WEIGHTS.regular),
    //     fontSize: 34
    // },
    // h5: {
    //     ...getFontStyle(FONT_WEIGHTS.regular),
    //     fontSize: 24
    // },
    // h6: {
    //     ...getFontStyle(FONT_WEIGHTS.medium),
    //     fontSize: 20
    // },
    // overline: {
    //     ...getFontStyle(FONT_WEIGHTS.regular),
    //     fontSize: 10
    // },
    // body1: {
    //     ...getFontStyle(FONT_WEIGHTS.regular),
    //     fontSize: 16
    // },
    // body2: {
    //     ...getFontStyle(FONT_WEIGHTS.regular),
    //     fontSize: 14
    // },
    // subtitle1: {
    //     ...getFontStyle(FONT_WEIGHTS.regular),
    //     fontSize: 16
    // },
    // subtitle2: {
    //     ...getFontStyle(FONT_WEIGHTS.medium),
    //     fontSize: 14
    // },
    white: {
        color: COLORS.WHITE
    },
    lightWhite: {
        color: COLORS.LIGHT_WHITE
    },
    darkBlue: {
        color: COLORS.DARK_BLUE
    },
    blue: {
        color: COLORS.BLUE
    },
    center: {
        textAlign: 'center'
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
    },
    flex: {
        flex: 1
    }
}

export const TEXT_INPUT_STYLES = {
    white: {
        container: {
            borderBottomWidth: LINE_HEIGHT,
            borderBottomColor: COLORS.WHITE
        },
        icon: {
            color: COLORS.WHITE,
        },
        input: {
            color: COLORS.WHITE,
        },
        placeholderColor: COLORS.LIGHT_WHITE
    },
    black: {
        container: {
            borderBottomWidth: LINE_HEIGHT,
            borderBottomColor: COLORS.BLACK
        },
        icon: {
            color: COLORS.BLACK,
        },
        input: {
            color: COLORS.BLACK,
        },
        placeholderColor: 'rgba(0, 0, 0, 0.4)'
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
    columnAlignEnd: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
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
    rowAlignStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    rowAlignEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
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
    pv20: {
        paddingVertical: 20
    },
    space20: {
        width: '100%',
        height: 20
    },
    space16: {
        width: '100%',
        height: 16,
    },
    space8: {
        width: '100%',
        height: 8
    },
    titleAndDescription: {
        height: SIZES.TITLE_DESCRIPTION,
    },

    containerHorizontalSpace: {
        paddingHorizontal: 48
    },
    containerHorizontalMargin: {
        paddingHorizontal: 16
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

export const BUTTON_STYLES = {
    ...SURFACE_STYLES,
    round: {
        borderRadius: 25
    },
    flat: {
        backgroundColor: 'transparent',
        ...getElevation(0)
    },
    full: {
        width: '100%'
    },
    noPadding: {
        paddingLeft: 0,
        paddingRight: 0
    },
    dialog: {
        height: SIZES.DIALOG_BUTTON,
        borderRadius: SIZES.DIALOG_BUTTON / 2
    }
}

export default {
    button: {
        borderRadius: 2,
        backgroundColor: COLORS.BLUE,
        height: SIZES.BUTTON_FIELD,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        ...getElevation(2)
    },
    buttonText: {
        ...TEXT_STYLES.buttonText,
        color: COLORS.WHITE,
    },
    buttonDisable: {
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        height: SIZES.BUTTON_FIELD,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        ...getElevation(0)
    },
    buttonTextDisable: {
        ...TEXT_STYLES.buttonText,
        color: COLORS.LIGHT_WHITE,
    },
    buttonIcon: {
        fontSize: 18,
        color: COLORS.WHITE,
        marginRight: 5
    },
    toolbar: {
        container: {
            height: SIZES.TOOLBAR,
            width: DEVICE_WIDTH,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            elevation: 2,
            zIndex: 10000
        },
        iconLeft: {
            fontSize: 24,
        },
        iconLeftContainer: {
            paddingLeft: SIZES.CONTAINER_HORIZONTAL_MARGIN,
            width: SIZES.CONTAINER_HORIZONTAL_SPACE_AND_MARGIN,
            height: SIZES.TOOLBAR,
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
            height: SIZES.TOOLBAR,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        iconRight: {
            fontSize: 24,
        },
    },
    textInput: {
        input: {
            flex: 1,
            ...TEXT_STYLES.textInput
        },
        textInputColumnContainer: {
            height: 69,
        },
        textInputContainer: {
            height: 42,
        },
        descriptionIcon: {
            fontSize: 20,
            marginRight: 15
        },
        iconRight: {
            fontSize: 16,
        },
        iconError: {
            fontSize: 16,
            color: COLORS.ERROR
        },
        iconRightContainer: {
            paddingHorizontal: 5,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
}