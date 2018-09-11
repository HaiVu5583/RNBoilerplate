import React, { Component } from 'react';
import { Surface, Text, Button, Image, TextInput, Toolbar } from '~/src/themes/ThemeComponent'
import { ImageBackground, StatusBar } from 'react-native'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import { connect } from 'react-redux'
import I18n from '~/src/I18n'
import { ASSETS, COLORS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { DIALOG_MODE } from '~/src/constants'
import PopupConfirm from '~/src/components/PopupConfirm'
import { replacePatternString, formatPhoneNumber } from '~/src/utils'

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
            password: '',
            secure: true
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
        // Navigation.push('mainStack', {
        //     component: {
        //         name: 'gigabankclient.ForgotPassword',
        //     }
        // })
        this.popupForgotPassword && this.popupForgotPassword.open()
    }


    componentDidMount() {

    }


    render() {
        const enableLoginButton = (this.state.phone && this.state.phone.trim()
            && this.state.password && this.state.password.trim()
        )
        const forgotPasswordContent = replacePatternString(I18n.t('forgot_password_popup_content'), formatPhoneNumber(I18n.t('hotline')))
        return (
            <ImageBackground source={ASSETS.MAIN_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <Toolbar transparent={true} />
                <PopupConfirm
                    animationType='none'
                    content={forgotPasswordContent}
                    titleT={'forgot_password'}
                    textYesT={'close'}
                    mode={DIALOG_MODE.YES_NO}
                    ref={ref => this.popupForgotPassword = ref} />

                <Surface themeable={false} flex containerHorizontalSpace>
                    <Surface space20 themeable={false} />
                    <Surface themeable={false} titleAndDescription>
                        <Surface themeable={false} rowCenter>
                            <Text white title bold>GIGA</Text>
                            <Text white title thin>BANK</Text>
                        </Surface>
                    </Surface>
                    <TextInput
                        descriptionIcon={'phone'}
                        placeholderT={'phone'}
                        white
                        onChangeText={text => this.setState({ phone: text })}
                        keyboardType='number-pad'
                        value={this.state.phone}
                        iconRight={'close2'}
                        onPressIconRight={() => this.setState({ phone: '' })}
                        showIconRight={(this.state.phone && this.state.phone.trim())}
                    />
                    <TextInput
                        descriptionIcon={'pass'}
                        placeholder={'\u2022 \u2022 \u2022 \u2022 \u2022 \u2022'}
                        white
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={this.state.secure}
                    />


                    <Surface space16 themeable={false} />
                    <Button round full
                        t={'login'}
                        onPress={this._handlePressLogin}
                        enable={!!enableLoginButton}
                        gradientButton={true}
                    />
                    <Surface space8 themeable={false} />
                    <Surface themeable={false} rowSpacebetween fullWidth>
                        <Button flat noPadding
                            t={'register'}
                            textStyle={{ color: COLORS.BLUE }}
                            onPress={this._handlePressRegister}
                        />
                        <Button flat noPadding
                            t={'forgot_password_question'}
                            textStyle={{ color: COLORS.BLUE }}
                            onPress={this._handlePressForgotPassword}
                        />
                    </Surface>
                </Surface>
            </ImageBackground>
        )
    }
}
export default connect(null, null)(Authentication)
