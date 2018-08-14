import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default {
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    defaultContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
        width: '100%',
        elevation: 2
    },
    closeIcon: {
        fontWeight: 'light',
        color: 'rgba(0, 0, 0, 0.9)'
    },
    textHeader: {
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.85)',
        fontSize: 16
    },
    header: {
        padding: 10, 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
    }
}