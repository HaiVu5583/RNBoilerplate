import { SIZES } from '~/src/themes/common'
export default {
    listBackButton: {
        position: 'absolute',
        zIndex: 1,
        bottom: 20,
        width: '100%',
        height: 50,
        marginLeft: SIZES.CONTAINER_HORIZONTAL_SPACE_AND_MARGIN,
        marginRight: SIZES.CONTAINER_HORIZONTAL_SPACE_AND_MARGIN,
        borderColor: '#29aae1',
        borderWidth: 3,
        borderRadius: 20,
        // backgroundColor: '#784322',
        alignContent: 'center',
        alignItems: 'center',
    },
    listBackText: {
        fontSize: 20,
        color: '#29aae1',
        marginTop: 10,
    }
}