import { Dimensions } from 'react-native'
import {getElevation} from "~/src/utils"
import I18n from '~/src/I18n'

const { height, width } = Dimensions.get('window')
const linkColor = I18n.t('link_color') || '#007aff'; // link color: #007aff // maybe #4998fe

export default {
    bar: {
        height: 42,
        width: width,
        backgroundColor: '#ffffff', //'#f5f5f5',
        ...getElevation(4),
        zIndex: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    barGradient: {
        backgroundColor: 'transparent',
        height: 42,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backContainer: {
        position: 'absolute',
        height: '100%',
        top: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        zIndex: 200,
        opacity: 1
    },
    rightContainer: {
        position: 'absolute',
        height: '100%',
        top: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        zIndex: 200,
        opacity: 1
    },
    icon: {
        fontSize: 17,
        color: 'rgba(0,0,0,0.9)',
        opacity: 1
    },
    leftButton: {
        fontSize: 17,
        color: linkColor,
        opacity: 1
    },
    rightButtonDisable: {
        fontSize: 17,
        color: 'rgba(0, 0, 0, 0.3)',
        opacity: 1
    },
    rightButtonEnable: {
        fontSize: 17,
        color: linkColor,
        opacity: 1
    },
    title: {
        color: 'rgba(0,0,0,0.9)',
        fontSize: 17,
        zIndex: 200
    }
}