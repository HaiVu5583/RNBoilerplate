import { COLORS, SIZES } from '~/src/themes/common'

const HALF_ITEM_HEIGHT = SIZES.BANK_ITEM_HEIGHT / 2

export default {
    iconStyle: {
        color: COLORS.WHITE
    },
    titleStyle: {
        color: COLORS.WHITE
    },
    imageBackgroundSmall: {
        height: SIZES.IMAGE_BACKGROUND_HEIGHT_WITHOUT_TOOLBAR,
    },
    imageBackgroundSmallFloat: {
        height: SIZES.IMAGE_BACKGROUND_HEIGHT_WITHOUT_TOOLBAR + HALF_ITEM_HEIGHT,
    },
    fakeFloatPart: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 52,
        zIndex: 0
    }
}