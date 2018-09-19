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
        padding: 5,
        borderRadius: 10,
        backgroundColor: COLORS.LIGHT_GRAY
    },
    iconContainer: {
        position: 'absolute', 
        right: 2,
        top: 2,
        bottom: 5,
        left: 2,
        padding: 10,
        zIndex: -1,
        justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row',
        backgroundColor: COLORS.LIGHT_GRAY,
        borderRadius: 10
    },
    icon: {
        fontSize: 24, 
        color: COLORS.DARK_BLUE,
    }
}