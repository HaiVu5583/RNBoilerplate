import {
    ASSETS,
    DEVICE_WIDTH,
    DEVICE_HEIGHT,
    SURFACE_STYLES,
    COLORS,
    SIZES,
    STATUS_BAR_HEIGHT
} from '~/src/themes/common'

export default {
    actionRowFlatList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },
    actionContainer:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 4,
        height: 100
    },
    buttonContainerFlatList: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    internationalCard: {
        marginTop: 30,
        marginLeft: 65,
        fontSize: 18,
        color: '#233C63'
    },
    itemStart: {
        marginLeft: SIZES.CONTAINER_HORIZONTAL_MARGIN,
        marginRight: 10,
    },
    itemMiddle: {
        marginLeft: 10,
        marginRight: 10,
    },
    itemEnd: {
        marginLeft: 10,
        marginRight: SIZES.CONTAINER_HORIZONTAL_MARGIN,
    }
}