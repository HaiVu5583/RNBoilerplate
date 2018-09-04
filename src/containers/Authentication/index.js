import React, { Component } from 'react';
import { Surface, Text, Button, Image, TextInput } from '~/src/themes/ThemeComponent'
import { ImageBackground } from 'react-native'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import { connect } from 'react-redux'
import I18n from '~/src/I18n'
import { Platform } from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import { TouchableOpacity } from 'react-native-ui-lib';
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple'

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
            phone: '',
            password: ''
        }
    }

    _handlePressLogin = () => {
        Navigation.setStackRoot('mainStack',
            {
                sideMenu: {
                    id: 'sideMenu',
                    left: {
                        component: {
                            name: 'gigabankclient.Drawer',
                        }
                    },
                    center: {
                        component: {
                            name: 'gigabankclient.HomeScreen',
                        }
                    },
                }
            })
    }

    _handlePressRegister = () => {
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.Register',
            }
        })
    }

    _handlePressForgotPassword = () => {
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.ForgotPassword',
            }
        })
    }


    componentDidMount() {

    }

    _handlePressFingerprint = () => {
        this.fingerprintPopup && this.fingerprintPopup.open()

    }

    _onAuthenticateSuccess = () => {
        alert('Fingerprint Authenticate Successful!')
    }

    _handleChangeLanguage = (language) => {
        I18n.locale = language.toLowerCase()
        this.props.changeLanguage(language)
    }



    render() {

        return (
            <ImageBackground source={ASSETS.MAIN_BACKGROUND} style={{ width: '100%', height: '100%' }}>
                <Surface themeable={false} flex pd20>
                    <Surface themeable={false} style={{ marginTop: 50, marginBottom: 50 }}>
                        <Surface themeable={false} rowCenter>
                            <Text white h4 bold>GIGA</Text>
                            <Text white h4 thin>BANK</Text>
                        </Surface>
                    </Surface>
                    <Surface themeable={false} fullWidth mb20>
                        <TextInput
                            descriptionIcon={'phone'}
                            placeholderT={'phone'}
                            white
                            onChangeText={text => this.setState({ phone: text })}
                            keyboardType='numeric'
                            value={this.state.phone}
                        />
                    </Surface>
                    <Surface themeable={false} fullWidth mb20>
                        <TextInput
                            descriptionIcon={'password-line'}
                            placeholder={'\u2022 \u2022 \u2022 \u2022 \u2022 \u2022'}
                            white
                            onChangeText={text => this.setState({ password: text })}
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                    </Surface>


                    <Surface themeable={false} fullWidth mb20>
                        <Button round full
                            t={'login'}
                            onPress={this._handlePressLogin}
                        />
                    </Surface>
                    <Surface themeable={false} rowSpacebetween fullWidth>
                        <Button flat
                            t={'register'}
                            textStyle={{ color: '#38A5DA' }}
                            onPress={this._handlePressRegister}
                        />
                        <Button flat
                            t={'forgot_password_question'}
                            textStyle={{ color: '#38A5DA' }}
                            onPress={this._handlePressForgotPassword}
                        />
                    </Surface>
                </Surface>
            </ImageBackground>
        )
    }
}
export default connect(null, null)(Authentication)
