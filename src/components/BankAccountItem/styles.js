import { COLORS } from '~/src/themes/common'
export default {
    image: {
        width: 90,
        height: 60,
        borderRadius: 10,
        marginRight: 5,
        backgroundColor: COLORS.WHITE
    },
    container: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: COLORS.LIGHT_GRAY
    },
    iconContainer: {
        position: 'absolute', 
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
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