import { COLORS, SIZES } from '~/src/themes/common'

const HALF_ITEM_HEIGHT = SIZES.BANK_ITEM_HEIGHT / 2

export default {
    headerSection: {
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 16,
    },
    seriCover: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    cardCodeCover: {
        padding: 5,
        marginTop: 8,
        paddingLeft: 10,
        paddingRight: 10
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
        // height: HALF_ITEM_HEIGHT,
        zIndex: 0,
    },
    chargePhoneInfo: {
        paddingLeft: 32,
        color: '#233c63',
        fontWeight: 'bold',
    },
}