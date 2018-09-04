import { toElevation, getWidth } from "~/src/utils";
import { Platform } from "react-native"
import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')
import { COLORS } from '~/src/themes/common'

export default {
    fullViewScreen: {
        width: width,
        height: height,
    },
    backgroundModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    popupContainer: {
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 3,
        paddingTop: 14,
        paddingHorizontal: getWidth(20),
        paddingBottom: 12,
        width: '85%',
        ...toElevation(6),
    },
    titleContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    textTitle: {
        fontSize: 17,
        color: COLORS.DARK_BLUE,
        fontWeight: 'bold'
    },
    contentContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 10,
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
        marginTop: 18,
    },
    button: {
        fontSize: 16,
        color: COLORS.BLUE,
        marginLeft: 25,
        fontWeight: Platform.OS == 'ios' ? '600' : 'bold'
    }
}