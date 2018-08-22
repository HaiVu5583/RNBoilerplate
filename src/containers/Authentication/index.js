import React, { Component } from 'react';
import { Surface, Text, Button, Image } from '~/src/themes/ThemeComponent'
import { ImageBackground } from 'react-native'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import { connect } from 'react-redux'
import I18n from '~/src/I18n'
import { Platform } from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import { TouchableOpacity } from 'react-native-ui-lib';
import FingerprintPopup from './FingerprintPopup'

class Authentication extends Component {
    static get options() {
        return {
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false
            }
        };
    }

    constructor(props) {
        super(props)
        this.state = {
            showFingerprint: false
        }
    }

    _handlePressLogin = () => {
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.Login'
            }
        })
    }

    _handlePressRegister = () => {
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.Register',
                passProps: {
                    text: 'This is tab 1'
                }
            }
        })
    }



    componentDidMount() {
        if (Platform.OS == 'android') {
            FingerprintScanner
                .isSensorAvailable()
                .then(data => {
                    this.setState({ showFingerprint: true })
                })
                .catch(error => console.log('Error Fingerprint Available', error));
        }
    }

    _handlePressFingerprint = () => {
        this.fingerprintPopup && this.fingerprintPopup.open()

    }

    _onAuthenticateSuccess = () => {
        alert('Fingerprint Authenticate Successful!')
    }

    render() {

        return (
            <ImageBackground source={require('~/src/assets/background.jpg')} style={{ width: '100%', height: '100%' }}>
                <Surface themeable={false} flex pd20>
                    <FingerprintPopup
                        ref={ref => this.fingerprintPopup = ref}
                        onAuthenticateSuccess={this._onAuthenticateSuccess}
                    />
                    <Surface themeable={false} style={{ marginTop: 50 }}>
                        <Surface themeable={false} rowStart>
                            <Text white bold h4>GIGA</Text>
                            <Text white h4 light>BANK</Text>
                        </Surface>
                        <Surface themeable={false}
                            style={styles.sologanSpacer}
                        />
                        <Surface themeable={false}>
                            <Text sologan>PERSONAL</Text>
                            <Text sologan>DIGITAL FINANCE</Text>
                            <Text sologan>FOR YOU</Text>
                        </Surface>
                    </Surface>
                    <Surface themeable={false} columnEnd flex>
                        {this.state.showFingerprint && <Surface themeable={false} fullWidth mb20 rowCenter>
                            <TouchableOpacity onPress={this._handlePressFingerprint}>
                                <Image
                                    source={{ uri: 'https://cdn4.iconfinder.com/data/icons/unigrid-flat-security/90/013_016_fingerprint_finger_print_security_touch_id_identity_access_key_lock-512.png' }}
                                    style={{ width: 60, height: 60 }} />
                            </TouchableOpacity>
                        </Surface>}
                        <Surface themeable={false} fullWidth mb20>
                            <Button round full
                                text={I18n.t('register_account').toUpperCase()}
                                onPress={this._handlePressRegister}
                            />
                        </Surface>
                        <Surface themeable={false} rowSpacebetween fullWidth>
                            <Text white>{I18n.t('already_have_account')}</Text>
                            <Button flat
                                text={I18n.t('login').toUpperCase()}
                                textStyle={{ color: '#38A5DA' }}
                                onPress={this._handlePressLogin}
                            />
                        </Surface>
                    </Surface>
                </Surface>
            </ImageBackground>
        )
    }
}
export default connect(null, null)(Authentication)
