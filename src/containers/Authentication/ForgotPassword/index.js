import React, { Component } from 'react';
import { TextInput, Surface, Background, Text, Button, Toolbar } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import I18n from '~/src/I18n'
import PopupConfirm from '~/src/components/PopupConfirm'
import Password from '~/src/components/Password'
import styles from '~/src/containers/Authentication/styles'
import { TEXT_INPUT_STYLES } from '~/src/themes/common'
import { BackHandler } from 'react-native'
import { isValidPhoneNumer, toNormalCharacter } from '~/src/utils'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import OTPInput from '~/src/components/OTPInput'
import { ImageBackground } from 'react-native'
import NumberKeyboard from '~/src/components/NumberKeyboard'
import CircleCountdown from '~/src/components/CircleCountdown'

const STEP = {
    INFO: 'INFO',
    PASSWORD: 'PASSWORD',
    OTP: 'OTP'
}

class ForgotPassword extends Component {
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
            errRepassword: ''
        }
    }

    _handlePressBackIcon = () => {
        if (this.state.step == STEP.INFO) {
            // Navigation.pop(this.props.componentId)
            this.props.navigation.pop()
        } else if (this.state.step == STEP.OTP) {
            this.setState({ step: STEP.INFO })
        } else if (this.state.step == STEP.PASSWORD) {
            this.setState({ step: STEP.OTP })
        }
        return true
    }

    _handlePressGetPassword = () => {
        // this.popupInvalidInfo && this.popupInvalidInfo.open()
        const wordOnlyRegex = /^([a-zA-Z]|\s)+$/
        const numberOnlyRegex = /^\d+$/
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
        } else if (!this.state.bankAccount || !numberOnlyRegex.test(this.state.bankAccount)) {
            this.setState({
                errBankAccount: I18n.t('err_bank_account_number')
            })
            return
        }
        this.popupConfirmSendOTP && this.popupConfirmSendOTP.open()
    }

    _onConfirmSendOTP = () => {
        this.setState({ step: STEP.OTP })
    }

    _renderStepInfo = () => {
        return (
            <Surface style={{ padding: 20 }} themeable={false}>
                <Surface themeable={false} fullWidth mb20 rowCenter>
                    <Text white h6 center t={'forgot_password'} />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    {!!this.state.errName && <Text error body2>{this.state.errName}</Text>}
                    <TextInput
                        placeholderT={'full_name'}
                        white
                        onChangeText={text => this.setState({ name: text, errName: '' })}
                        value={this.state.name}
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    {!!this.state.errIdentityNumber && <Text error body2>{this.state.errIdentityNumber}</Text>}
                    <TextInput
                        placeholderT={'identity_number'}
                        white
                        keyboardType='numeric'
                        onChangeText={text => this.setState({ identityNumber: text, errIdentityNumber: '' })}
                        value={this.state.identityNumber}
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    {!!this.state.errBankAccount && <Text error body2>{this.state.errBankAccount}</Text>}
                    <TextInput
                        placeholderT={'hint_input_bank_account_number'}
                        white
                        keyboardType='numeric'
                        onChangeText={text => this.setState({ bankAccount: text, errBankAccount: '' })}
                        value={this.state.bankAccount}
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    <Button
                        round t={'get_password'}
                        full onPress={this._handlePressGetPassword} />
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
                    <Text white h6 center t={'create_new_password'} />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    <Password
                        placeholderT={'hint_input_password'}
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
                        placeholderT={'hint_reinput_password'}
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
                    <Button round t={'finish'} full onPress={this._handlePressFinish} />
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

    _renderCountdown = () => {
        return <CircleCountdown time={60} size={45} fontSize={18} />
    }

    _renderStepOTP = () => {
        return (
            <Surface themeable={false} flex>
                <Surface pd20 themeable={false} flex>
                    <Surface themeable={false} fullWidth mb20 rowCenter>
                        <Text white h6 center t={'authenticate'} />
                    </Surface>
                    <Surface themeable={false} fullWidth mb20 rowCenter>
                        <Text white body1>{I18n.t('hint_input_otp_phone')} {this.state.phone}</Text>
                    </Surface>
                    {!!this.state.errOTP && <Text error body2>{this.state.errOTP}</Text>}
                    <Surface themeable={false} fullWidth mb20>
                        <OTPInput
                            numberDigit={4}
                            otp={this.state.otp}
                        />
                    </Surface>
                    <Surface themeable={false} fullWidth mb20>
                        <Button
                            round
                            t={'continue'}
                            full
                            onPress={this._handlePressContinueOTP}
                            rightComponent={this._renderCountdown}
                            innerExpand={true}
                        />
                    </Surface>
                </Surface>
                <NumberKeyboard onChangeValue={otp => this.setState({ otp })} />
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
            <ImageBackground source={ASSETS.MAIN_BACKGROUND} style={{ width: '100%', height: '100%' }}>
                <Surface flex themeable={false}>
                    <Toolbar
                        onPressIconLeft={this._handlePressBackIcon}
                        themeable={false}
                        iconStyle={{ color: 'white' }}
                    />
                    <PopupConfirm
                        animationType='none'
                        contentT={'err_forgot_password_info'}
                        textButton1T={'cancel'}
                        textButton2T={'popup_confirmed'}
                        onPressButton1={() => { }}
                        onPressButton2={() => { }}
                        ref={ref => this.popupInvalidInfo = ref} />
                    <PopupConfirm
                        animationType='none'
                        contentT={'confirm_send_otp'}
                        textButton1T={'cancel'}
                        textButton2T={'confirm'}
                        onPressButton1={() => { }}
                        onPressButton2={() => this._onConfirmSendOTP()}
                        ref={ref => this.popupConfirmSendOTP = ref} />
                    {this._render()}
                </Surface>
            </ImageBackground>
        )
    }
}
export default connect(null, null)(ForgotPassword)
