import { COLORS } from '~/src/themes/common'
export default {
    image: {
        width: 108,
        height: 80,
        borderRadius: 15,
        marginLeft: 5,
        // marginTop: 1.5,
        // backgroundColor: COLORS.WHITE
        // alignContent: 'center',
        // alignItems: 'center',
    },
    container: {
        // padding: 5,
        // borderRadius: 15,
        // backgroundColor: COLORS.LIGHT_GRAY
        width: 118,
        height: 88,
        borderRadius: 17,
        // alignContent: 'center',
        // alignItems: 'center',
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