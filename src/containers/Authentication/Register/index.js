import React, { Component } from 'react';
import { TextInput, Surface, Background, Text, Button, Toolbar } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import I18n from '~/src/I18n'
import { isValidPhoneNumer, toNormalCharacter } from '~/src/utils'
import PopupConfirm from '~/src/components/PopupConfirm'
import styles from '~/src/containers/Authentication/styles'
import { TEXT_INPUT_STYLES } from '~/src/themes/common'
import { BackHandler } from 'react-native'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION } from '~/src/themes/common'
import OTPInput from '~/src/components/OTPInput'
import { ImageBackground } from 'react-native'
import NumberKeyboard from '~/src/components/NumberKeyboard'
import CircleCountdown from '~/src/components/CircleCountdown'

const STEP = {
    PHONE: 'PHONE',
    OTP: 'OTP',
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
            password: '',
            repassword: '',
            errPhone: '',
            errOTP: '',
            errName: '',
            errPassword: '',
            errRepassword: '',
            showPassword: false,
            showRepassword: false
        }
    }

    _handlePressBackIcon = () => {
        if (this.state.step == STEP.PHONE) {
            Navigation.pop(this.props.componentId)
        } else if (this.state.step == STEP.OTP) {
            this.setState({ step: STEP.PHONE })
        } else if (this.state.step == STEP.PASSWORD) {
            this.setState({ step: STEP.OTP })
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
        if (!isValidPhoneNumer(this.state.phone)) {
            this.setState({ errPhone: I18n.t('err_invalid_phone_number') })
            return
        } else {
            this.popupConfirm && this.popupConfirm.open()
        }
    }

    _renderStepPhone = () => {
        const enableContinuePhoneButton = !!(this.state.phone && this.state.phone.trim() &&
            this.state.name && this.state.name.trim()
        )
        return (
            <Surface themeable={false} flex containerHorizontalSpace>
                <Surface themeable={false} titleAndDescription>
                    <Text white title t={'register'} />
                    <Text body2 white description t={'hint_register_phone_info_input'} />
                </Surface>
                <TextInput
                    descriptionIcon={'phone'}
                    placeholderT={'phone'}
                    white
                    keyboardType='number-pad'
                    onChangeText={this._onChangePhoneNumber}
                    value={this.state.phone}
                    hasError={!!this.state.errPhone}
                    errorText={this.state.errPhone}
                />
                <TextInput
                    descriptionIcon={'user-active'}
                    placeholderT={'full_name'}
                    white
                    onChangeText={text => this.setState({ name: text, errName: '' })}
                    value={this.state.name}
                    hasError={!!this.state.errName}
                    errorText={this.state.errName}
                />
                <Surface space16 themeable={false} />
                <Button
                    enable={!!enableContinuePhoneButton}
                    gradientButton={true}
                    round
                    t={'continue'}
                    full
                    onPress={this._handlePressContinuePhone} />

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

    _handleResend = () => {

    }

    _renderStepOTP = () => {
        const enableButtonContinueOTP = !!(this.state.otp && this.state.otp.length >= 4)
        return (
            <Surface themeable={false} flex>
                <Surface themeable={false} flex containerHorizontalSpace>
                    <Surface themeable={false} titleAndDescription>
                        <Text white title t={'verify'} />
                        <Text white description>
                            <Text white description t={'hint_input_opt'} />
                            {this.state.phone}
                        </Text>
                    </Surface>
                    <OTPInput
                        numberDigit={4}
                        otp={this.state.otp}
                        hasError={!!this.state.errOTP}
                        errorText={this.state.errOTP}
                    />
                    <Surface space16 themeable={false} />
                    <Button
                        enable={!!enableButtonContinueOTP}
                        gradientButton={true}
                        round
                        t={'continue'}
                        full
                        onPress={this._handlePressContinueOTP}
                    />
                    <Surface space8 themeable={false} />
                    <Surface themeable={false} fullWidth rowSpacebetween>
                        <Text lightWhite light t={'otp_not_work'} />
                        <Button flat
                            t={'resend'}

                            textStyle={{ color: '#38A5DA' }}
                            onPress={this._handleResend}
                        />
                    </Surface>
                </Surface>
                <NumberKeyboard onChangeValue={otp => this.setState({ otp })} />
            </Surface >
        )
    }

    _handlePressFinishPassword = () => {
        if (this.state.password != this.state.repassword) {
            this.setState({ errRepassword: I18n.t('err_invalid_repassword') })
        }
    }

    _renderStepPassword = () => {
        const { placeholderTextColor, color, ...restStyle } = TEXT_INPUT_STYLES.white
        const enableButtonFinish = !!(this.state.password && this.state.repassword
            && this.state.password.trim() && this.state.repassword.trim())

        return (
            <Surface themeable={false} flex containerHorizontalSpace>

                <Surface themeable={false} titleAndDescription>
                    <Text white title t={'password'} />
                    <Text white description t={'hint_create_password'} />
                </Surface>


                <TextInput
                    descriptionIcon={'password-line'}
                    placeholderT={'hint_input_password'}
                    white
                    keyboardType='number-pad'
                    onChangeText={text => this.setState({ password: text, errRepassword: '' })}
                    value={this.state.password}
                    iconRight={this.state.showPassword ? 'eye-off' : 'eye-on'}
                    onPressIconRight={() => this.setState({ showPassword: !this.state.showPassword })}
                    secureTextEntry={!this.state.showPassword}
                />

                <TextInput
                    descriptionIcon={'password-line'}
                    placeholderT={'hint_reinput_password'}
                    white
                    keyboardType='number-pad'
                    onChangeText={text => this.setState({ repassword: text, errRepassword: '' })}
                    value={this.state.repassword}
                    iconRight={this.state.showRepassword ? 'eye-off' : 'eye-on'}
                    onPressIconRight={() => this.setState({ showRepassword: !this.state.showRepassword })}
                    secureTextEntry={!this.state.showRepassword}
                    hasError={!!this.state.errRepassword}
                    errorText={this.state.errRepassword}
                />
                <Surface space16 themeable={false} />
                <Button
                    enable={!!enableButtonFinish}
                    gradientButton={true}
                    round
                    t={'finish'}
                    full onPress={this._handlePressFinishPassword} />
            </Surface>
        )
    }

    componentDidMount() {
        console.log('Register DId Mount', this.props)
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
            case STEP.PASSWORD:
                return this._renderStepPassword()
        }
    }

    render() {
        return (
            <ImageBackground source={require('~/src/assets/background.jpg')} style={{ width: '100%', height: '100%' }}>
                <Surface themeable={false} flex>
                    <Toolbar
                        onPressIconLeft={this._handlePressBackIcon}
                        themeable={false}
                        iconStyle={{ color: 'white' }}
                    />
                    <Surface space20 themeable={false} />
                    <PopupConfirm
                        animationType='none'
                        contentT={'confirm_send_otp'}
                        titleT={'register_account'}
                        textButton1T={'cancel'}
                        textButton2T={'confirm'}
                        onPressButton1={() => { }}
                        onPressButton2={() => this._onConfirmPhone()}
                        ref={ref => this.popupConfirm = ref} />
                    {this._render()}
                </Surface>
            </ImageBackground >
        )
    }
}
export default connect(null, null)(Register)
