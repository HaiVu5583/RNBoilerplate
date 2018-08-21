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
import { BackHandler } from 'react-native'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION } from '~/src/themes/common'
import OTPInput from '~/src/components/OTPInput'

const STEP = {
    PHONE: 'PHONE',
    OTP: 'OTP',
    INFO: 'INFO',
    BANK_ACCOUNT: 'BANK_ACCOUNT',
    PASSWORD: 'PASSWORD'
}

class Register extends Component {
    static get options() {
        return {
            animations: {
                push: DEFAULT_PUSH_ANIMATION,
                pop: DEFAULT_POP_ANIMATION
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            step: STEP.PHONE,
            phone: '',
            otp: '',
            name: '',
            identityNumber: '',
            bankAccount: '',
            password: '',
            repassword: '',
            errPhone: '',
            errOTP: '',
            errName: '',
            errIdentityNumber: '',
            errBankAccount: '',
            errPassword: '',
            errRepassword: ''
        }
    }

    _handlePressBackIcon = () => {
        if (this.state.step == STEP.PHONE) {
            Navigation.pop(this.props.componentId)
        } else if (this.state.step == STEP.OTP) {
            this.setState({ step: STEP.PHONE })
        } else if (this.state.step == STEP.INFO) {
            this.setState({ step: STEP.OTP })
        } else if (this.state.step == STEP.BANK_ACCOUNT) {
            this.setState({ step: STEP.INFO })
        } else if (this.state.step == STEP.PASSWORD) {
            this.setState({ step: STEP.BANK_ACCOUNT })
        }
        return true
    }

    _onChangePhoneNumber = (text) => {
        this.setState({ phone: text }, () => {
            setTimeout(() => {
                if (!!this.state.errPhone && isValidPhoneNumer(text)) {
                    this.setState({ phone: text.replace(/\D/g, ''), errPhone: '' })
                } else {
                    this.setState({ phone: text.replace(/\D/g, '') })
                }
            }, 0)
        })
    }

    _onConfirmPhone = () => {
        this.setState({ step: STEP.OTP })
    }

    _onCancelPhone = () => {

    }

    _handlePressContinuePhone = () => {
        if (!this.state.phone || !isValidPhoneNumer(this.state.phone)) {
            this.setState({ errPhone: I18n.t('err_invalid_phone_number') })
            return
        } else {
            this.popupConfirm && this.popupConfirm.open()
        }
    }

    _renderStepPhone = () => {
        return (
            <Surface style={{ padding: 20 }} themeable={false}>
                <Surface themeable={false} fullWidth mb20 rowCenter>
                    <Text white h6 center>{I18n.t('register').toUpperCase()}</Text>
                </Surface>
                <Surface themeable={false} fullWidth mb20 rowCenter>
                    <Text white body1>{I18n.t('hint_register_phone_input')}</Text>
                </Surface>
                {!!this.state.errPhone && <Text error body2>{this.state.errPhone}</Text>}
                <Surface themeable={false} fullWidth mb20>
                    <TextInput
                        placeholder={I18n.t('phone')}
                        white
                        keyboardType='numeric'
                        onChangeText={this._onChangePhoneNumber}
                        value={this.state.phone}
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    <Button round text={I18n.t('continue').toUpperCase()} full onPress={this._handlePressContinuePhone} />
                </Surface>
            </Surface>
        )
    }

    _handlePressContinueOTP = () => {
        if (!this.state.otp) {
            this.setState({ errOTP: I18n.t('err_invalid_otp') })
            return
        }
        this.setState({ step: STEP.INFO })
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
                    <OTPInput numberDigit={4}
                        onChangeText={text => this.setState({ otp: text })}
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    <Button round text={I18n.t('continue').toUpperCase()} full onPress={this._handlePressContinueOTP} />
                </Surface>
            </Surface>
        )
    }

    _handlePressContinuePersonalInfo = () => {
        const wordOnlyRegex = /^([a-zA-Z]|\s)+$/
        const numberOnlyRegex = /^\d+$/
        console.log('Name normalize', toNormalCharacter(this.state.name))
        console.log('Test', wordOnlyRegex.test(toNormalCharacter(this.state.name)))
        if (!this.state.name || !wordOnlyRegex.test(toNormalCharacter(this.state.name))) {
            this.setState({
                errName: I18n.t('err_format_username'),
            })
            return
        } else if (!this.state.identityNumber || !numberOnlyRegex.test(this.state.identityNumber)) {
            this.setState({
                errIdentityNumber: I18n.t('err_invalid_identity_number')
            })
            return
        }
        this.popupHaveBankAccount && this.popupHaveBankAccount.open()
    }

    _onConfirmHaveBankAccount = () => {
        this.setState({ step: STEP.BANK_ACCOUNT })
    }

    _renderStepInfo = () => {
        return (
            <Surface style={{ padding: 20 }} themeable={false}>
                <Surface themeable={false} fullWidth mb20 rowCenter>
                    <Text white h6 center>{I18n.t('personal_info').toUpperCase()}</Text>
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    {!!this.state.errName && <Text error body2>{this.state.errName}</Text>}
                    <TextInput
                        placeholder={I18n.t('full_name')}
                        white
                        onChangeText={text => this.setState({ name: text, errName: '' })}
                        value={this.state.name}
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    {!!this.state.errIdentityNumber && <Text error body2>{this.state.errIdentityNumber}</Text>}
                    <TextInput
                        placeholder={I18n.t('identity_number')}
                        white
                        keyboardType='numeric'
                        onChangeText={text => this.setState({ identityNumber: text, errIdentityNumber: '' })}
                        value={this.state.identityNumber}
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    <Button round text={I18n.t('continue').toUpperCase()} full onPress={this._handlePressContinuePersonalInfo} />
                </Surface>
            </Surface>
        )
    }

    _handlePressContinueBankAccount = () => {
        console.log('Continue Bank Account')
        this.setState({ step: STEP.PASSWORD })
    }

    _renderStepBankAccount = () => {
        return (
            <Surface style={{ padding: 20 }} themeable={false}>
                <Surface themeable={false} fullWidth mb20 rowCenter>
                    <Text white h6 center>{I18n.t('personal_info').toUpperCase()}</Text>
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    {!!this.state.errBankAccount && <Text error body2>{this.state.errBankAccount}</Text>}
                    <TextInput
                        placeholder={I18n.t('hint_input_bank_account_number')}
                        white
                        keyboardType='numeric'
                        onChangeText={text => this.setState({ bankAccount: text, errBankAccount: '' })}
                        value={this.state.bankAccount}
                    />
                </Surface>

                <Surface themeable={false} fullWidth mb20>
                    <Button round text={I18n.t('continue').toUpperCase()} full onPress={this._handlePressContinueBankAccount} />
                </Surface>
            </Surface>
        )
    }

    _handlePressFinishPassword = () => {
        if (this.state.password != this.state.repassword) {
            this.setState({ errRepassword: I18n.t('err_invalid_repassword') })
        }
    }

    _renderStepPassword = () => {
        const { placeholderTextColor, color, ...restStyle } = TEXT_INPUT_STYLES.white
        return (
            <Surface style={{ padding: 20 }} themeable={false}>
                <Surface themeable={false} fullWidth mb20 rowCenter>
                    <Text white h6 center>{I18n.t('password').toUpperCase()}</Text>
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    <Password
                        placeholder={I18n.t('hint_input_password')}
                        containerStyle={styles.textInput}
                        onChangeText={text => this.setState({ password: text, errRepassword: '' })}
                        value={this.state.password}
                        placeholderTextColor={placeholderTextColor}
                        iconStyle={{ color }}
                        style={{ flex: 1, padding: 2, color }}
                        containerStyle={restStyle}
                    />
                </Surface>

                <Surface themeable={false} fullWidth mb20>
                    {!!this.state.errRepassword && <Text error body2>{this.state.errRepassword}</Text>}
                    <Password
                        placeholder={I18n.t('hint_reinput_password')}
                        containerStyle={styles.textInput}
                        onChangeText={text => this.setState({ repassword: text, errRepassword: '' })}
                        value={this.state.repassword}
                        placeholderTextColor={placeholderTextColor}
                        iconStyle={{ color }}
                        style={{ flex: 1, padding: 2, color }}
                        containerStyle={restStyle}
                    />
                </Surface>

                <Surface themeable={false} fullWidth mb20>
                    <Button round text={I18n.t('continue').toUpperCase()} full onPress={this._handlePressFinishPassword} />
                </Surface>
            </Surface>
        )
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handlePressBackIcon)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handlePressBackIcon)
    }

    _render = () => {
        switch (this.state.step) {
            case STEP.PHONE:
            default:
                return this._renderStepPhone()
            case STEP.OTP:
                return this._renderStepOTP()
            case STEP.INFO:
                return this._renderStepInfo()
            case STEP.BANK_ACCOUNT:
                return this._renderStepBankAccount()
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
                    content={I18n.t('confirm_send_otp')}
                    textButton1={I18n.t('cancel').toUpperCase()}
                    textButton2={I18n.t('confirm').toUpperCase()}
                    onPressButton1={() => { }}
                    onPressButton2={() => this._onConfirmPhone()}
                    ref={ref => this.popupConfirm = ref} />
                <PopupConfirm
                    animationType='none'
                    content={I18n.t('already_have_bank_account')}
                    textButton1={I18n.t('disagree').toUpperCase()}
                    textButton2={I18n.t('popup_confirmed').toUpperCase()}
                    onPressButton1={() => { }}
                    onPressButton2={() => this._onConfirmHaveBankAccount()}
                    ref={ref => this.popupHaveBankAccount = ref} />
                {this._render()}
            </Surface >
        )
    }
}
export default connect(null, null)(Register)
