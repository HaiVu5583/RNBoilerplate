import { COLORS, SIZES } from '~/src/themes/common'

const HALF_ITEM_HEIGHT = SIZES.BANK_ITEM_HEIGHT / 2

export default {
    iconStyle: {
        color: COLORS.WHITE
    },
    titleStyle: {
        color: COLORS.WHITE        
    },
    descriptionCover: {
        height: 116,
    },
    description: {
        marginLeft: 48,
        marginRight: 48,
        marginTop: 20,
    },
    textInputCover: {
        height: 74,
    },
    lineSpace: {
        backgroundColor: COLORS.FEATURE_BACKGROUND,
    },
    titleList: {
        fontSize: 14,
        marginLeft: 48,
        marginRight: 48,
        color: '#233c63',
        fontWeight: 'bold',
    },
    limitMoney: {
        fontSize: 12,
        marginLeft: 48,
        marginRight: 48,
        color: COLORS.ERROR,
        // marginBottom: 20,
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
        height: HALF_ITEM_HEIGHT,
        zIndex: 0
    },   
}