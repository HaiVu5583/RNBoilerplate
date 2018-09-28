import { toElevation, getWidth } from "~/src/utils";
import { Platform } from "react-native"
import { Dimensions } from 'react-native'
// const { height, width } = Dimensions.get('window')
import { COLORS, SIZES, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'

export default {
    fullViewScreen: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
    },
    backgroundModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingLeft: SIZES.CONTAINER_HORIZONTAL_SPACE_AND_MARGIN,
        paddingRight: SIZES.CONTAINER_HORIZONTAL_SPACE_AND_MARGIN,
    },
    popupContainer: {
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 10,
        paddingLeft: SIZES.DIALOG_SPACE,
        paddingRight: SIZES.DIALOG_SPACE,
        paddingTop: SIZES.DIALOG_SPACE,
        width: DEVICE_WIDTH - 2 * SIZES.CONTAINER_HORIZONTAL_MARGIN,
        ...toElevation(6),
    },
    negativeButtonText: {
        color: COLORS.BLUE
    },
    contentContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // marginBottom: 10,
    },
    textContent: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.9)',
        lineHeight: 22,
        fontWeight: '400',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: SIZES.DIALOG_BUTTON_FIELD,
    },
    button: {
        fontSize: 16,
        color: COLORS.BLUE,
        marginLeft: 25,
        fontWeight: Platform.OS == 'ios' ? '600' : 'bold'
    },
    copyChargeSyntax: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 30,
        width: '100%',
        height: 60,
        marginBottom: 16,
        justifyContent: 'center'
    },
    textButton: {
        alignSelf: 'center',
    }
}