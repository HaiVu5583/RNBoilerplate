import React, { Component } from 'react';
import { TextInput, Surface, Text, Button, Toolbar } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import I18n from '~/src/I18n'
import { isValidPhoneNumer, replacePatternString, formatPhoneNumber } from '~/src/utils'
import PopupConfirm from '~/src/components/PopupConfirm'
import { TEXT_INPUT_STYLES } from '~/src/themes/common'
import { BackHandler } from 'react-native'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, DEVICE_WIDTH, DEVICE_HEIGHT, COLORS } from '~/src/themes/common'
import OTPInput from '~/src/components/OTPInput'
import { ImageBackground, StatusBar } from 'react-native'
import NumberKeyboard from '~/src/components/NumberKeyboard'
import { DIALOG_MODE, OTP_COUNTDOWN_TIME } from '~/src/constants'
import OTPCountdown from '~/src/containers/Authentication/OTPCountdown'
import { logoStep3 } from '~/src/components/Asset/LogoStep3'
import { logoStep1 } from '~/src/components/Asset/LogoStep1'
import { logoStep2 } from '~/src/components/Asset/LogoStep2'
import SvgUri from 'react-native-svg-uri'
import { createOTPToken, verifyOTPToken, signUp, checkExistUser } from '~/src/store/actions/auth'
import LoadingModal from '~/src/components/LoadingModal'
import md5 from 'md5'
import { chainParse } from '~/src/utils'

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
            showRepassword: false,
            loading: false,
            otpKey: new Date().getTime()
        }
        this.otpToken = ''
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
        if (this.state.loading) return
        this.setState({ loading: true })
        this.props.createOTPToken(this.state.phone, (err, data) => {
            console.log('Data OTP', data)
            if (data == "true") {
                this.setState({ loading: false, step: STEP.OTP })
            } else if (data && data.code && data.code == 2002) {
                this.setState({ errOTP: I18n.t('err_otp_retry_too_fast'), loading: false })
            } else {
                this.setState({ errOTP: I18n.t('err_general'), loading: false })
            }
        })
    }

    _onCancelPhone = () => {

    }

    _handlePressContinuePhone = () => {
        if (this.state.loading) return
        const phoneNumber = this.state.phone.replace(/\s/g, '')
        if (!isValidPhoneNumer(phoneNumber)) {
            this.setState({ errPhone: I18n.t('err_invalid_phone_number') })
            return
        } else {
            this.setState({ loading: true })
            this.props.checkExistUser(phoneNumber, (err, data) => {
                console.log('Err Exist User', err)
                console.log('Data Exist User', data)
                if (data && data.updated) {
                    if (data.updated.result) {
                        this.setState({ loading: false })
                        this.popupAlreadyHaveAccount && this.popupAlreadyHaveAccount.open()
                    } else {
                        this.setState({ loading: false })
                        this.popupConfirm && this.popupConfirm.open()
                    }
                } else {
                    this.setState({ loading: false, errPhone: I18n.t('err_general') })
                }
            })
        }
    }

    _handleResendOTP = () => {
        this.setState({ otpKey: new Date().getTime() }, () => {
            if (this.state.loading) return
            this.setState({ loading: true })
            this.props.createOTPToken(this.state.phone, (err, data) => {
                console.log('Data OTP', data)
                if (data == "true") {
                    this.setState({ loading: false })
                } else if (data && data.code && data.code == 2002) {
                    this.setState({ errOTP: I18n.t('err_otp_retry_too_fast'), loading: false })
                } else {
                    this.setState({ errOTP: I18n.t('err_general'), loading: false })
                }
            })
        })
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
                    descriptionIcon={'GB_call'}
                    placeholderT={'phone'}
                    white
                    keyboardType='number-pad'
                    onChangeText={this._onChangePhoneNumber}
                    value={formatPhoneNumber(this.state.phone)}
                    hasError={!!this.state.errPhone}
                    errorText={this.state.errPhone}
                />
                <TextInput
                    descriptionIcon={'GB_account1'}
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
        if (this.state.loading) return false
        this.setState({ loading: true })
        this.props.verifyOTPToken(this.state.otp, (err, data) => {
            console.log('Err Verify Token', err)
            console.log('Data OTP Token', data)
            if (data && data.otpToken) {
                this.otpToken = data.otpToken
            }
            if (data.status == 0) {
                this.setState({ loading: false, step: STEP.PASSWORD })
                return
            } else if (data.status == 1) {
                this.setState({ loading: false, errOTP: I18n.t('err_invalid_otp') })
                return
            } else if (data.status == 2) {
                this.setState({ loading: false, errOTP: I18n.t('err_otp_expire') })
                return
            }
            this.setState({ loading: false })
        })

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
                    <Surface themeable={false} fullWidth rowCenter>
                        <OTPCountdown time={OTP_COUNTDOWN_TIME} onResend={this._handleResendOTP} key={this.state.otpKey} />
                    </Surface>
                </Surface>
                <NumberKeyboard onChangeValue={otp => this.setState({ otp })} />
            </Surface >
        )
    }

    _handlePressFinishPassword = () => {
        if (this.state.password != this.state.repassword) {
            this.setState({ errRepassword: I18n.t('err_invalid_repassword') })
            return
        }
        if (this.state.loading) return
        this.setState({ loading: true })
        this.props.signUp(this.state.name, md5(this.state.password), this.otpToken, (err, data) => {
            console.log('Err Register', err)
            console.log('Data Register', data)
            if (data && data.accessToken) {
                this.setState({ loading: false })
                Navigation.setStackRoot('mainStack',
                    {
                        component: {
                            id: 'HomeScreen',
                            name: 'gigabankclient.HomeScreen',
                            passProps: {
                                isSignUp: true
                            }
                        }
                    }
                )
            } else {
                this.setState({ loading: false, errRepassword: I18n.t('err_general') })
            }
        })
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
                    descriptionIcon={'GB_pass'}
                    placeholderT={'hint_input_password'}
                    white
                    keyboardType='number-pad'
                    onChangeText={text => this.setState({ password: text, errRepassword: '' })}
                    value={this.state.password}
                    iconRight={this.state.showPassword ? 'GB_eye_hide' : 'GB_eye_show'}
                    onPressIconRight={() => this.setState({ showPassword: !this.state.showPassword })}
                    secureTextEntry={!this.state.showPassword}
                />

                <TextInput
                    descriptionIcon={'GB_pass2'}
                    placeholderT={'hint_reinput_password'}
                    white
                    keyboardType='number-pad'
                    onChangeText={text => this.setState({ repassword: text, errRepassword: '' })}
                    value={this.state.repassword}
                    iconRight={this.state.showRepassword ? 'GB_eye_hide' : 'GB_eye_show'}
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

    _handlePressLogin = () => {
        Navigation.setStackRoot('mainStack',
            {
                component: {
                    name: 'gigabankclient.Authentication',
                }
            }
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

    _renderLogo = () => {
        let logo = logoStep1
        switch (this.state.step) {
            case STEP.PHONE:
                logo = logoStep1
                break;
            case STEP.OTP:
                logo = logoStep2
                break;
            case STEP.PASSWORD:
                logo = logoStep3
                break;
        }
        return (
            <Surface themeable={false} flex rowCenter>
                <SvgUri
                    width="140"
                    height="30"
                    svgXmlData={logo}
                    style={{ left: -24 }}
                />
            </Surface>
        )

    }

    render() {
        const popupConfirmSendOTPContent = replacePatternString(I18n.t('confirm_send_otp'), formatPhoneNumber(this.state.phone))
        return (
            <ImageBackground source={require('~/src/assets/background.jpg')} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                <Surface themeable={false} flex>
                    <Toolbar
                        onPressIconLeft={this._handlePressBackIcon}
                        themeable={false}
                        iconStyle={{ color: COLORS.WHITE }}
                        centerComponent={this._renderLogo}
                    />
                    <Surface space20 themeable={false} />
                    <PopupConfirm
                        animationType='none'
                        content={popupConfirmSendOTPContent}
                        titleT={'register_account'}
                        textNoT={'cancel'}
                        textYesT={'confirm'}
                        mode={DIALOG_MODE.YES_NO}
                        onPressYes={this._onConfirmPhone}
                        ref={ref => this.popupConfirm = ref} />

                    <PopupConfirm
                        animationType='none'
                        contentT={'already_have_account_please_login'}
                        titleT={'register_account'}
                        textYesT={'login'}
                        mode={DIALOG_MODE.YES_NO}
                        onPressYes={this._handlePressLogin}
                        ref={ref => this.popupAlreadyHaveAccount = ref} />

                    <LoadingModal visible={this.state.loading} />
                    {this._render()}
                </Surface>
            </ImageBackground >
        )
    }
}
export default connect(null, { createOTPToken, verifyOTPToken, signUp, checkExistUser })(Register)
