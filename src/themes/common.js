import { getFontStyle } from '~/src/utils'
import { Dimensions, PixelRatio, StatusBar } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
const window = Dimensions.get('window')
import { getElevation, scaleWidth } from '~/src/utils'
export const LINE_HEIGHT = PixelRatio.roundToNearestPixel(0.5)
export const DEVICE_WIDTH = window.width
export const DEVICE_HEIGHT = window.height

export const STATUS_BAR_HEIGHT = getStatusBarHeight(true)
console.log('STATUS_BAR_HEIGHT', STATUS_BAR_HEIGHT)
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
    DARK_GRAY: '#919699',
    LIGHT_GRAY: '#F2F2F2',
    FEATURE_BACKGROUND: '#EBF0F0',
    YELLOW: '#FDB149'
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
    CONTAINER_HORIZONTAL_SPACE10_AND_MARGIN: 26,
    TITLE_DESCRIPTION: 121,
    TEXT_INPUT_CONTAINER: 69,
    BUTTON_FIELD: 54,
    DIALOG_BUTTON: 42,
    DIALOG_BUTTON_FIELD: 64,
    DIALOG_SPACE: 28,
    BLOCK_TITLE_HEIGHT: 40,
    IMAGE_BACKGROUND_HEIGHT: 116 + 44 + STATUS_BAR_HEIGHT,
    IMAGE_BACKGROUND_HEIGHT_WITHOUT_TOOLBAR: 116,
    BANNER_WIDTH: DEVICE_WIDTH - 52,
    BANNER_HEIGHT: 128,
    BANK_ITEM_HEIGHT: 68,

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
    infoResult: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 14,
        lineHeight: 23,
    },
    titleInfo: {
        ...getFontStyle(FONT_WEIGHTS.bold),
        fontSize: 12,
    },
    body16: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        fontSize: 16,
        lineHeight: 24,
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
    yellow: {
        color: COLORS.YELLOW
    },
    errorNormal: {
        ...getFontStyle(FONT_WEIGHTS.regular),
        color: COLORS.ERROR,
        fontSize: 14,
        lineHeight: 24,
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
    },
    noBorder: {
        borderBottomWidth: 0,
        borderBottomColor: 'transparent'
    },
    blackWithDarkblueIcon: {
        container: {
            borderBottomWidth: LINE_HEIGHT,
            borderBottomColor: COLORS.BLACK
        },
        icon: {
            color: COLORS.DARK_BLUE,
        },
        input: {
            color: COLORS.BLACK,
        },
        placeholderColor: 'rgba(0, 0, 0, 0.4)'
    }
}

export const SURFACE_STYLES = {
    full: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT
    },
    fullWithoutToolbar: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT - SIZES.TOOLBAR_AND_STATUSBAR
    },
    content: {
        minHeight: DEVICE_HEIGHT - SIZES.IMAGE_BACKGROUND_HEIGHT
    },
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
    columnAlignStart: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
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
    infoRow: {
        paddingVertical: 5
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
    space8: {
        width: '100%',
        height: 8
    },
    space10: {
        width: '100%',
        height: 10
    },
    space12: {
        width: '100%',
        height: 12
    },
    space16: {
        width: '100%',
        height: 16,
    },
    space20: {
        width: '100%',
        height: 20
    },
    space24: {
        width: '100%',
        height: 24
    },
    space28: {
        width: '100%',
        height: 28
    },
    space30: {
        width: '100%',
        height: 30
    },
    space35: {
        width: '100%',
        height: 35
    },
    space40: {
        width: '100%',
        height: 40
    },
    space50: {
        width: '100%',
        height: 50
    },
    titleAndDescription: {
        height: SIZES.TITLE_DESCRIPTION,
    },
    containerHorizontalSpace2: {
        paddingHorizontal: 58
    },
    containerHorizontalSpace: {
        paddingHorizontal: 48
    },
    containerHorizontalSpace10: {
        paddingHorizontal: 26
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
    },
    borderBottomBlue: {
        borderBottomWidth: LINE_HEIGHT,
        borderBottomColor: COLORS.BLUE
    },
    imageBackgroundSmall: {
        minHeight: SIZES.IMAGE_BACKGROUND_HEIGHT_WITHOUT_TOOLBAR
    },
    imageBackgroundSmallFloat: {
        minHeight: SIZES.IMAGE_BACKGROUND_HEIGHT_WITHOUT_TOOLBAR + SIZES.BANK_ITEM_HEIGHT / 2,
    },
    imageBackground: {
        minHeight: SIZES.IMAGE_BACKGROUND_HEIGHT
    },
    imageBackgroundFloat: {
        minHeight: SIZES.IMAGE_BACKGROUND_HEIGHT + SIZES.BANK_ITEM_HEIGHT / 2
    },
    floatBankItemPart: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: SIZES.BANK_ITEM_HEIGHT / 2,
        zIndex: 0
    },
    fakeToolbar: {
        height: SIZES.TOOLBAR_AND_STATUSBAR
    },
    bottomButtonSpace: {
        height: SIZES.BUTTON_FIELD + 26
    },
    titleInfoBlock: {
        paddingVertical: 24
    },  
    lineSeperatorBlue: {
        backgroundColor: COLORS.BLUE,
        height: 1,
        marginTop: 20,
        marginBottom: 20,
        width: '100%'
    },
    seperator: {
        width: '100%',
        height: 8,
        backgroundColor: COLORS.FEATURE_BACKGROUND
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
    'outline-blue': {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.BLUE,
        ...getElevation(0),
        textStyle: {
            color: COLORS.BLUE
        }
    },
    full: {
        width: '100%',
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