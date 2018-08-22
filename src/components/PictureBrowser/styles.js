import {toElevation} from "~/src/utils";
import {Dimensions} from 'react-native'
const {height, width} = Dimensions.get('window')

const fontSize = {
        xLarge: 17
}

const linkColor = 'blue'

export default {
    textNormal: {
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.6)',
        textAlign: 'center',
        fontWeight: '400'
    },
    textSelected: {
        fontSize: 18,
        color: linkColor,
        textAlign: 'center',
        fontWeight: '400'
    },
    headerBar: {
        height: 42,
        flexDirection: 'row', 
        width, 
        ...toElevation(4),
        // marginBottom: 4,
        backgroundColor: '#f5f5f5',
        marginBottom: 8,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },    

    rightButtonDisable: {
        fontSize: fontSize.xLarge,
        color: 'rgba(0, 0, 0, 0.3)',
        opacity: 1
    },
    rightButtonEnable: {
        fontSize: fontSize.xLarge,
        color: linkColor,
        opacity: 1
    },
    leftButton: {
        fontSize: fontSize.xLarge,
        color: 'rgba(0, 0, 0, 0.9)',
        opacity: 1
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
        opacity: 1,
    },
    rightContainer: {
        position: 'absolute',
        height: '100%',
        top: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',        
        paddingRight: 10,
        zIndex: 200,
        opacity: 1
    },
}