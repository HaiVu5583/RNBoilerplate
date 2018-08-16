import React from 'react';
import {
    AppState,
    Text,
    View,
    Dimensions,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated,
    ScrollView,
    Image,
} from 'react-native';
import {Icon} from '~/src/themes/ThemeComponent'
import styles from './styles'

import Ripple from 'react-native-material-ripple'

const window = Dimensions.get('window')
import {RNCamera} from '~/src/components/Camera'
// import ClingmeUtils from '~/utils/ClingmeUtils'
import PopupConfirm from '~/src/components/PopupConfirm'
import I18n from '~/src/I18n'
// import CashbackHelpPopUp from '~/ui/containers/Cashback/PopUpCashback/CashbackHelpPopUp.js'
// import popUpCashbackData from '~/ui/containers/Cashback/PopUpCashback/data.js'
import {MAX_UPLOAD_IMAGE_WIDTH_OF_BILL, PERMISSION_RESPONSE} from '~/constants'
import PopUpOpenCamera from '~/src/components/PictureBrowser/PopUpToUsedCamera'
import moment from 'moment'
import Permissions from 'react-native-permissions'
import OpenAppSettings from 'react-native-app-settings'

export default class CameraBillCapture extends React.PureComponent {

    constructor() {
        super();

        const appState = AppState.currentState;

        this.state = {
            appState,
            listImage: [],
            isPreviewImage: false,
            previewImage: {},
            modalVisible: false,
            zoomValue: 0,
            cameraVisible: false,
            options: {},
            captureCallBack: null,
            testMode: true,
            lastImage: null,
            flashMode: false,
            typeOfCameraIsFront: false,
            helpCashbackVisible: false
        }

        this.enableButtonCapture = true;
    }

    componentWillUnmount() {
        this._removeAppStateEventListener();
    }

    _handleAppStateChange = (nextAppState) => {
        this.setState({ appState: nextAppState }, () => console.log('CameraBillCapture _handleAppStateChange ', {nextAppState}));
    }

    _addAppStateEventListener = () => {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    _removeAppStateEventListener = () => {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    launchCamera = async (options, callback) => {

        console.log('request _checkPermissionAndOpenCamera');

        this._addAppStateEventListener();

        const timeBeforeRequest = moment().valueOf();

        Permissions.request('camera').then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            const timeAfterResponse = moment().valueOf();
            const responseTime = timeAfterResponse - timeBeforeRequest;
            const deviceDoNotShowPopup = responseTime < 450;

            console.log('check request permsion callback', {response, deviceDoNotShowPopup, responseTime});

            if (response == PERMISSION_RESPONSE.AUTHORIZED) {
                this.onOpenCamera(options, callback);
            } else if (deviceDoNotShowPopup) {
                this._openPopupRequestCameraSetting();
            }
        });

    }

    _openPopupRequestCameraSetting = () => {
        if (!!this.popupOpenCamera) {
            this.popupOpenCamera.open();
        }
    }

    _openAppSetting = () => {
        OpenAppSettings.open();
    }

    _renderPopupOpenCameraSetting = () => {
        return (
            <View>
                <PopUpOpenCamera
                    onAccept={this._openAppSetting}
                    onClose={this._removeAppStateEventListener}
                    ref={ref => this.popupOpenCamera = ref}
                    // isShow={this.state.popupCameraPermissionVisible}
                />
            </View>
        );
    }

    _setEnableCapture = (enableCapture) => {
        setTimeout(() => {
            console.log('CameraBillCapture _setEnableCapture', enableCapture);
            this.setState({enableCapture});
        }, 600);
    }

    onOpenCamera = (options, callback) => {
        this.setState({
            options: options,
            captureCallBack: callback,
            cameraVisible: true,
            enableCapture: false, // issue 1627
        }, () => this._setEnableCapture(true));
    }

    _closeCamera = (data) => {
        this._removeAppStateEventListener();

        response = {
            uri: !!data ? data.path : '',
            didCancel: !!data && !!data.path ? false : true
        }


        if (!!this.state.captureCallBack) {
            this.state.captureCallBack(response);
        }

        if ((!!data && !!data.path) || !!this.state.lastImage) {
            this.setState({
                cameraVisible: false,
                lastImage: data,
            });
        } else {
            this.setState({
                cameraVisible: false,
            })
        }
    }

    componentDidUpdate() {
        console.log('Camera state', {...this.state});
    }

    _onPressBack = () => {
        this._closeCamera();
        return;

        if (!!this.props.onPressBack) {
            this.props.onPressBack();
        } else if (this.props.clingmeIdentifier) {
            // ClingmeUtils.nativeViewGoBack("" + this.props.clingmeIdentifier);
        }
    }

    _onPressChangeCamera = () => {
        this.setState({
            typeOfCameraIsFront: !this.state.typeOfCameraIsFront
        })
    }

    _onPressSwitchFlashMode = () => {
        this.setState({
            flashMode: !this.state.flashMode
        })
    }

    _renderIconWithPress = (iconName, func, iconStyle) => {
        return (
            <TouchableWithoutFeedback onPress={func}>
                <View style={styles.paddingBottom10}>
                    <Icon name={iconName} style={[styles.iconWhite, iconStyle]}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _gotoCashbackHelpPopupScreen = () => {
        this.setState({
            helpCashbackVisible: true
        })
    }

    _onPressQuestion = () => {
        this._gotoCashbackHelpPopupScreen();
    }

    _renderIconSwitchFlashMode = () => {
        const iconName = !!this.state.flashMode ? 'flash' : 'no-flash';

        return (
            <TouchableWithoutFeedback onPress={this._onPressSwitchFlashMode}>
                <View style={styles.paddingBottom10}>
                    <Icon name={iconName} style={styles.iconWhite}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                {this._renderIconWithPress('back', this._onPressBack)}
                {this._renderIconWithPress('rotate-camera', this._onPressChangeCamera, {fontSize: 24})}
                {this._renderIconSwitchFlashMode()}
                {!this.props.hideButtonQuestion && this._renderIconWithPress('question', this._onPressQuestion)}
            </View>
        )
    }

    _takePictureRNCamera = async () => {
        if (!this.state.enableCapture) {
            return;
        }

        if (!!this.delayPressTakePictureRNCamera) {
            return;
        } else {
            this.delayPressTakePictureRNCamera = true;
            setTimeout(() => this.delayPressTakePictureRNCamera = false, 800);
        }

        if (!!this.RNCamera && !!this.enableButtonCapture) {
            const options = {
                quality: 1,
                width: MAX_UPLOAD_IMAGE_WIDTH_OF_BILL,
                fixOrientation: true,
                skipProcessing: true,
                // base64: true
            };

            this.enableButtonCapture = false;

            this.RNCamera.takePictureAsync(options).then(response => {
                this.enableButtonCapture = true;
                this._closeCamera({path: response.uri});
            }).catch(() => alert('camera error'));
        }
    };

    _zoomIn = () => {
        this.setState({
            zoomValue: this.state.zoomValue + 0.05 < 1 ? this.state.zoomValue + 0.1 : 1
        });
    }

    _zoomOut = () => {
        this.setState({
            zoomValue: this.state.zoomValue - 0.05 > 0 ? this.state.zoomValue - 0.1 : 0
        });
    }

    _renderFooter = () => {
        return (
            <View style={styles.footerImageReviewContainer}>
                {/*<TouchableOpacity onPress={this._zoomIn}>*/}
                {/*<Text style={styles.text}>zoom In</Text>*/}
                {/*</TouchableOpacity>*/}

                <View style={styles.captureMoreContainer}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.backgroundBorderIcon}>
                            <TouchableOpacity onPress={this._takePictureRNCamera}>
                                <View style={styles.backgroundIcon}>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {!this.props.hideText &&
                    <Text style={styles.text}>{I18n.t('capture_bill')}</Text>
                    }
                </View>

                {/*<TouchableOpacity onPress={this._zoomOut}>*/}
                {/*<Text style={styles.text}>zoom Out</Text>*/}
                {/*</TouchableOpacity>*/}

            </View>
        )
    }

    _onPressCloseCashbackHelpPopup = () => {
        this.setState({
            helpCashbackVisible: false
        })
    }

    _renderCashbackHelpPopup = () => {
        return <View/>;

        // return (
        //     <CashbackHelpPopUp
        //         data={popUpCashbackData}
        //         onPressClose={this._onPressCloseCashbackHelpPopup}
        //         ref={ref => this.cashbackHelpPopUp = ref}
        //     />
        // )
    }

    render() {

        // if (!this.state.cameraVisible) {
        //     return false;
        // }

        if (!!this.state.helpCashbackVisible) {
            return this._renderCashbackHelpPopup();
        }

        return (
            <View>
                {this._renderPopupOpenCameraSetting()}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.cameraVisible}
                    onRequestClose={this._closeCamera}
                >
                    <View style={styles.container}>
                        {this.state.appState == 'active' &&
                        <RNCamera
                            ref={ref => this.RNCamera = ref}
                            style={styles.preview}
                            type={this.state.typeOfCameraIsFront ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
                            flashMode={this.state.flashMode ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                            zoom={this.state.zoomValue}
                            captureAudio={false}
                            googleVisionBarcodeType={0}
                        />}
                        {this._renderFooter()}
                        {this._renderHeader()}
                    </View>
                </Modal>
            </View>
        )
    }
}
