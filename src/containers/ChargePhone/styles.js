import { COLORS, SIZES } from '~/src/themes/common'

const HALF_ITEM_HEIGHT = SIZES.BANK_ITEM_HEIGHT / 2

export default {
    iconStyle: {
        color: COLORS.WHITE
    },
    titleStyle: {
        color: COLORS.WHITE        
    },
    description: {
        // fontSize: 18,
        marginLeft: 48,
        marginRight: 48,
    },
    enterPhone: {
        // marginHorizontal: 48,
        marginTop: 40,
        // marginBottom: 50,
    },
    lineSpace: {
        backgroundColor: COLORS.LIGHT_GRAY,
        marginTop: 60,
    },
    titleList: {
        fontSize: 14,
        marginLeft: 48,
        marginRight: 48,
        color: '#233c63',
        fontWeight: 'bold',
        marginTop: 30,
    },
    limitMoney: {
        fontSize: 12,
        marginLeft: 48,
        marginRight: 48,
        color: COLORS.ERROR,
        marginBottom: 40,
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