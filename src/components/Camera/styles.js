import {WHITE, commonStyle, fontSize} from '~/ui/styles/common'
import {toElevation} from "~/src/utils";
import {Dimensions} from 'react-native'
const window = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: 'cyan',
        position: 'absolute',
        zIndex: 99,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    text: {
        color: 'rgba(0,0,0,0.9)',
        fontSize: fontSize.large
    },
    textBold: {
        color: 'rgba(0,0,0,0.9)',
        fontSize: fontSize.large,
        fontWeight: 'bold'
    },
    textWhite: {
        color: 'white',
        fontSize: fontSize.large
    },
    preview: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'pink',
        // width: window.width,
        // height: window.height,
    },
    footerImageReviewContainer: {
        width: '100%',
        minHeight: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 16,
    },
    captureMoreContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#96f8f4',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    backgroundBorderIcon: {
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 50,
    },
    backgroundIcon: {
        backgroundColor: '#1fc9c2',
        borderRadius: 50,
        padding: 10,
        width: 45,
        height: 45
    },
    buttonCaptureBorder: {
        width: 56,
        height: 56,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 28
    },
    buttonCaptureBackground: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,0,0,0.5)',
    },
    itemListImage: {
        width: 80,
        height: 80,
        margin: 1
    },
    listImageContainer: {
        position: 'absolute',
        top: 16,
        left: 0,
        right: 0,
        zIndex: 7
    },
    flatList: {
        width: window.width,
        height: 82
    },
    buttonBackTest: {
        position: 'absolute',
        left: 16,
    },
    iconBackContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        padding: 10
    },
    iconBackRed: {
        fontSize: 20,
        color: '#ff0a00'
    },
    buttonPreviewTest: {
        position: 'absolute',
        right: 16
    },
    buttonPreviewContentContainer: {
        backgroundColor: 'white',
        width: 52,
        height: 52,
        borderRadius: 26
    },
    imagePreviewTest: {
        width: 50,
        height: 50,
        margin: 1,
        borderRadius: 25
    },
    buttonZoomTestContainer: {
        position: 'absolute',
        right: 16,
        bottom: 200,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    groupComponentTestContainer: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 3
    },
    groupButtonTestContainer: {
        position: 'absolute',
        zIndex: 5,
        bottom: 16,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    previewImageTestContentContainer: {
        backgroundColor: 'rgba(0,0,0,1)',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 0,
        flex: 1
    },
    flex1: {
        flex: 1,
    },
    previewImageButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 16
    },
    iconWhite: {
        fontSize: 22,
        color: 'white',
    },
    paddingBottom10: {
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    headerContainer: {
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
}