import { COLORS, SIZES } from '~/src/themes/common'

const HALF_ITEM_HEIGHT = SIZES.BANK_ITEM_HEIGHT / 2

export default {
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
        height: HALF_ITEM_HEIGHT,
        zIndex: 0
    },
    chargePhoneInfo: {
        paddingLeft: 32,
        color: '#233c63',
        fontWeight: 'bold',
    },
}