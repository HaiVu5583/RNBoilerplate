import React, { Component } from 'react';
import { TextInput, Surface, Text, Button, Toolbar } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import I18n from '~/src/I18n'
import PopupConfirm from '~/src/components/PopupConfirm'
import { TEXT_INPUT_STYLES, COLORS } from '~/src/themes/common'
import { BackHandler, Platform, ToastAndroid } from 'react-native'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { changePassword } from '~/src/store/actions/auth'
import md5 from 'md5'
import LoadingModal from '~/src/components/LoadingModal'
import { chainParse, showToast } from '~/src/utils'
import Toast from 'react-native-root-toast'

const STEP = {
    PASSWORD: 'PASSWORD',
}

class ChangePassword extends Component {
    static get options() {
        if (Platform.OS == 'android') {
            return {
                animations: {
                    push: DEFAULT_PUSH_ANIMATION,
                    pop: DEFAULT_POP_ANIMATION
                }
            }
        }
        return {}
    }

    constructor(props) {
        super(props)
        this.state = {
            step: STEP.PASSWORD,
            loading: false,
            password: '',
            newPassword: '',
            rePassword: '',


            errPassword: '',
            errNewPassword: '',
            errRepassword: '',

            showPassword: false,
            showNewPassword: false,
            showRepassword: false
        }
    }

    _handlePressBackIcon = () => {
        Navigation.pop(this.props.componentId)
        return true
    }

    _handlePressFinish = () => {
        if (this.state.newPassword != this.state.rePassword) {
            this.setState({ errRepassword: I18n.t('err_invalid_repassword') })
            return
        }
        this.setState({ loading: true })
        this.props.changePassword(md5(this.state.password), md5(this.state.newPassword), (err, data) => {
            console.log('Err Change Password', err)
            console.log('Data Change Password', data)
            if (chainParse(data, ['updated', 'result'])) {
                this.setState({ loading: false })
                showToast(I18n.t('update_password_success'))
                Navigation.pop(this.props.componentId)            
            } else if (data && data.code == 1005) {
                this.setState({ errPassword: I18n.t('err_invalid_password'), loading: false })
                return
            }
        })
    }


    _renderStepPassword = () => {
        const { placeholderTextColor, color, ...restStyle } = TEXT_INPUT_STYLES.white
        const enableButtonFinish = !!(this.state.password && this.state.rePassword
            && this.state.password.trim() && this.state.rePassword.trim())

        return (
            <Surface themeable={false} flex containerHorizontalSpace>

                <Surface themeable={false} titleAndDescription>
                    <Text darkBlue title t={'change_password'} />
                    <Text darkBlue description t={'hint_create_password'} />
                </Surface>
                <TextInput
                    descriptionIcon={'GB_pass'}
                    placeholderT={'old_password'}
                    black
                    keyboardType='number-pad'
                    onChangeText={text => this.setState({ password: text, errRepassword: '' })}
                    value={this.state.password}
                    iconRight={this.state.showPassword ? 'GB_eye_hide' : 'GB_eye_show'}
                    onPressIconRight={() => this.setState({ showPassword: !this.state.showPassword })}
                    secureTextEntry={!this.state.showPassword}
                    hasError={!!this.state.errPassword}
                    errorText={this.state.errPassword}
                />

                <TextInput
                    descriptionIcon={'GB_pass2'}
                    placeholderT={'new_password'}
                    black
                    keyboardType='number-pad'
                    onChangeText={text => this.setState({ newPassword: text, errRepassword: '' })}
                    value={this.state.newPassword}
                    iconRight={this.state.showNewPassword ? 'GB_eye_hide' : 'GB_eye_show'}
                    onPressIconRight={() => this.setState({ showNewPassword: !this.state.showNewPassword })}
                    secureTextEntry={!this.state.showNewPassword}
                    hasError={!!this.state.errNewPassword}
                    errorText={this.state.errNewPassword}
                />

                <TextInput
                    descriptionIcon={'GB_pass2'}
                    placeholderT={'retype_new_password'}
                    black
                    keyboardType='number-pad'
                    onChangeText={text => this.setState({ rePassword: text, errRepassword: '' })}
                    value={this.state.rePassword}
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
                    full onPress={this._handlePressFinish} />
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
            case STEP.PASSWORD:
            default:
                return this._renderStepPassword()
        }
    }

    render() {
        return (
            <Surface flex themeable={true}>
                <LoadingModal visible={this.state.loading} />
                <Toolbar
                    onPressIconLeft={this._handlePressBackIcon}
                    themeable={false}
                    iconStyle={{ color: COLORS.DARK_BLUE }}
                />
                <Surface space20 themeable={false} />
                <PopupConfirm
                    animationType='none'
                    contentT={'err_forgot_password_info'}
                    textNoT={'cancel'}
                    textYesT={'popup_confirmed'}
                    onPressButton1={() => { }}
                    onPressButton2={() => { }}
                    ref={ref => this.popupInvalidInfo = ref} />
                {this._render()}
            </Surface>
        )
    }
}
export default connect(null, { changePassword })(ChangePassword)
