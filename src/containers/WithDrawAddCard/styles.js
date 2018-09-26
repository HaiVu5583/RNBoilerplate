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
    iconStyle: {
        color: COLORS.WHITE,
    },
    titleStyle: {
        color: COLORS.WHITE,
    },
    description: {
        marginLeft: SIZES.CONTAINER_HORIZONTAL_SPACE_AND_MARGIN,
        marginRight: SIZES.CONTAINER_HORIZONTAL_SPACE_AND_MARGIN,
    },
    titleList: {
        fontSize: 14,
        marginLeft: 48,
        marginRight: 48,
        color: '#233c63',
        fontWeight: 'bold',
        // marginTop: 30,
    },
}