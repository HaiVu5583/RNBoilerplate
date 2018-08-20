import React, { Component } from 'react';
import { TextInput, Surface, Background, Text, Button, Toolbar } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import I18n from '~/src/I18n'
import { isValidPhoneNumer, toNormalCharacter } from '~/src/utils'
import PopupConfirm from '~/src/components/PopupConfirm'
import Password from '~/src/components/Password'
import styles from '~/src/containers/Authentication/styles'
import { TEXT_INPUT_STYLES } from '~/src/themes/common'

const STEP = {
    INFO: 'INFO',
    PASSWORD: 'PASSWORD',
    OTP: 'OTP'
}

class ForgotPassword extends Component {
    static get options() {
        return {}
    }

    constructor(props) {
        super(props)
        this.state = {
            step: STEP.INFO,
            otp: '',
            name: '',
            identityNumber: '',
            bankAccount: '',
            password: '',
            repassword: '',
            errPhone: '',
            errName: '',
            errIdentityNumber: '',
            errBankAccount: '',
        }
    }

    _handlePressBackIcon = () => {
        if (this.state.step == STEP.INFO) {
            Navigation.pop(this.props.componentId)
        } else if (this.state.step == STEP.OTP) {
            this.setState({ step: STEP.INFO })
        } else if (this.state.step == STEP.PASSWORD) {
            this.setState({ step: STEP.OTP })
        }

    }

    _handlePressGetPassword = () => {
        // this.popupInvalidInfo && this.popupInvalidInfo.open()
        this.popupConfirmSendOTP && this.popupConfirmSendOTP.open()
    }

    _onConfirmSendOTP = () => {
        this.setState({ step: STEP.OTP })
    }

    _renderStepInfo = () => {
        return (
            <Surface style={{ padding: 20 }} themeable={false}>
                <Surface themeable={false} fullWidth mb20 rowCenter>
                    <Text white h6 center>{I18n.t('forgot_password').toUpperCase()}</Text>
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    {!!this.state.errName && <Text error body2>{this.state.errName}</Text>}
                    <TextInput
                        placeholder={I18n.t('full_name')}
                        white
                        keyboardType='numeric'
                        onChangeText={text => this.setState({ name: text })}
                        value={this.state.name}
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    {!!this.state.errIdentityNumber && <Text error body2>{this.state.errIdentityNumber}</Text>}
                    <TextInput
                        placeholder={I18n.t('identity_number')}
                        white
                        keyboardType='numeric'
                        onChangeText={text => this.setState({ identityNumber: text })}
                        value={this.state.identityNumber}
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    {!!this.state.errBankAccount && <Text error body2>{this.state.errBankAccount}</Text>}
                    <TextInput
                        placeholder={I18n.t('hint_input_bank_account_number')}
                        white
                        keyboardType='numeric'
                        onChangeText={text => this.setState({ bankAccount: text })}
                        value={this.state.bankAccount}
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    <Button round text={I18n.t('get_password').toUpperCase()} full onPress={this._handlePressGetPassword} />
                </Surface>
            </Surface>
        )
    }

    _handlePressFinish = () => {
        
    }

    _renderStepPassword = () => {
        const { placeholderTextColor, color, ...restStyle } = TEXT_INPUT_STYLES.white
        return (
            <Surface style={{ padding: 20 }} themeable={false}>
                <Surface themeable={false} fullWidth mb20 rowCenter>
                    <Text white h6 center>{I18n.t('create_new_password').toUpperCase()}</Text>
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    <Password
                        placeholder={I18n.t('hint_input_password')}
                        containerStyle={styles.textInput}
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        placeholderTextColor={placeholderTextColor}
                        iconStyle={{ color }}
                        style={{ flex: 1, padding: 2, color }}
                        containerStyle={restStyle}
                    />
                </Surface>

                <Surface themeable={false} fullWidth mb20>
                    <Password
                        placeholder={I18n.t('hint_reinput_password')}
                        containerStyle={styles.textInput}
                        onChangeText={text => this.setState({ repassword: text })}
                        value={this.state.repassword}
                        placeholderTextColor={placeholderTextColor}
                        iconStyle={{ color }}
                        style={{ flex: 1, padding: 2, color }}
                        containerStyle={restStyle}
                    />
                </Surface>

                <Surface themeable={false} fullWidth mb20>
                    <Button round text={I18n.t('finish').toUpperCase()} full onPress={this._handlePressFinish} />
                </Surface>
            </Surface>
        )
    }

    _handlePressContinueOTP = () => {
        if (!this.state.otp) {
            this.setState({ errOTP: I18n.t('err_invalid_otp') })
            return
        }
        this.setState({ step: STEP.PASSWORD })
    }

    _renderStepOTP = () => {
        return (
            <Surface style={{ padding: 20 }} themeable={false}>
                <Surface themeable={false} fullWidth mb20 rowCenter>
                    <Text white h6 center>{I18n.t('authenticate').toUpperCase()}</Text>
                </Surface>
                <Surface themeable={false} fullWidth mb20 rowCenter>
                    <Text white body1>{I18n.t('hint_input_otp_phone')} {this.state.phone}</Text>
                </Surface>
                {!!this.state.errOTP && <Text error body2>{this.state.errOTP}</Text>}
                <Surface themeable={false} fullWidth mb20>
                    <TextInput
                        placeholder={I18n.t('hint_input_opt')}
                        white
                        keyboardType='numeric'
                        onChangeText={text => this.setState({ otp: text })}
                        value={this.state.otp}
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    <Button round text={I18n.t('continue').toUpperCase()} full onPress={this._handlePressContinueOTP} />
                </Surface>
            </Surface>
        )
    }

    _render = () => {
        switch (this.state.step) {
            case STEP.INFO:
            default:
                return this._renderStepInfo()
            case STEP.OTP:
                return this._renderStepOTP()
            case STEP.PASSWORD:
                return this._renderStepPassword()
        }
    }

    render() {
        return (
            <Surface blue flex>
                <Toolbar
                    onPressIconLeft={this._handlePressBackIcon}
                    themeable={false}
                    iconStyle={{ color: 'white' }}
                />
                <PopupConfirm
                    animationType='none'
                    content={I18n.t('err_forgot_password_info')}
                    textButton1={I18n.t('cancel').toUpperCase()}
                    textButton2={I18n.t('popup_confirmed').toUpperCase()}
                    onPressButton1={() => { }}
                    onPressButton2={() => { }}
                    ref={ref => this.popupInvalidInfo = ref} />
                <PopupConfirm
                    animationType='none'
                    content={I18n.t('confirm_send_otp')}
                    textButton1={I18n.t('cancel').toUpperCase()}
                    textButton2={I18n.t('confirm').toUpperCase()}
                    onPressButton1={() => { }}
                    onPressButton2={() => this._onConfirmSendOTP()}
                    ref={ref => this.popupConfirmSendOTP = ref} />
                {this._render()}
            </Surface >
        )
    }
}
export default connect(null, null)(ForgotPassword)
