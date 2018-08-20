import { Dimensions } from 'react-native'
import { getElevation } from '../../utils'

const {height, width} = Dimensions.get('window')


export default {
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0,2)'
    },
    modalContainer: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 500,
        ...getElevation(20)
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        color: '#ffffff',
    },
    textContainer: {
        maxWidth: width - 24,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#3E83E8',
        borderRadius: 4,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }
}