import { COLORS, SIZES } from '~/src/themes/common'
export default {
    image: {
        width: 90,
        height: SIZES.BANK_ITEM_HEIGHT - 10,
        borderRadius: 10,
        marginRight: 16,
        backgroundColor: COLORS.WHITE
    },
    container: {
        minHeight: SIZES.BANK_ITEM_HEIGHT,
        padding: 5,
        borderRadius: 10,
        marginHorizontal: 2,
        backgroundColor: COLORS.FEATURE_BACKGROUND
    },
    iconContainer: {
        position: 'absolute', 
        right: 2,
        left: 2,
        top: 0,
        bottom: 0,
        padding: 10,
        zIndex: -1,
        justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row',
        backgroundColor: COLORS.FEATURE_BACKGROUND,
        borderRadius: 10
    },
    icon: {
        fontSize: 24, 
        color: COLORS.DARK_BLUE,
    },
    iconBank: {
        fontSize: 18
    }
}