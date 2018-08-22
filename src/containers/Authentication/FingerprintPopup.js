import React from 'react'
import { Modal } from 'react-native'
import { Image, Surface, Text, Button } from '~/src/themes/ThemeComponent'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import { DEVICE_WIDTH, LINE_HEIGHT } from '~/src/themes/common'
import I18n from '~/src/I18n'
import { isFunction } from '~/src/utils'
import * as Animatable from 'react-native-animatable'

export default class FingerprintPopup extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: !!props.visible ? true : false,
            err: ''
        }
    }

    _showError = (text) => {
        this.setState({ err: text }, () => {
            this.errText && this.errText.shake()
        })

    }

    _handleAuthenticationAttempted = (error) => {
        console.log('On Attemp Scan Fingerprint', error)
        this._showError(error.name)
    }

    open = () => {
        FingerprintScanner
            .authenticate({ onAttempt: this._handleAuthenticationAttempted })
            .then(() => {
                console.log('Authentication Successful!')
                this.close(this.props.onAuthenticateSuccess)
            })
            .catch((error) => {
                console.log('Error Fingerprint Scan', error);
                this._showError(error.name)
            })
        this.setState({
            visible: true,
            err: ''
        })

    }

    close = (callback) => {
        FingerprintScanner.release()
        this.setState({
            visible: false,
            err: ''
        }, () => {
            if (callback && isFunction(callback)) {
                callback()
            }
        })
    }


    render() {
        return (
            <Modal
                animationType={'none'}
                visible={this.state.visible}
                transparent={true}
                onRequestClose={this.close}
            >
                <Surface themeable={false} overlay columnCenter flex>
                    <Surface themeable={false} white style={{ borderRadius: 4, width: DEVICE_WIDTH * 0.8 }}>
                        <Surface themeable={false} columnCenter pd20>
                            <Image
                                source={{ uri: 'https://cdn4.iconfinder.com/data/icons/unigrid-flat-security/90/013_016_fingerprint_finger_print_security_touch_id_identity_access_key_lock-512.png' }}
                                style={{ width: 60, height: 60 }} />
                            <Text themeable={false}>{I18n.t('hint_fingerprint_authenticate')}</Text>
                            {!!this.state.err &&
                                <Animatable.Text
                                    animation="shake" easing="ease-out"
                                    useNativeDriver={true}
                                    style={{ color: 'rgba(255, 0, 0, 0.85)' }}
                                    ref={ref => this.errText = ref}>
                                    {this.state.err}
                                </Animatable.Text>
                            }
                        </Surface>
                        <Button flat full text={I18n.t('close').toUpperCase()} textStyle={{ color: 'rgba(0, 0, 0, 0.85)' }} onPress={this.close} />
                    </Surface>
                </Surface>
            </Modal>
        )
    }
}