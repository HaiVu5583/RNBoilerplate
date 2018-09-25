import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { BackHandler, Platform, KeyboardAvoidingView } from 'react-native'
import { Surface, Text, TextInput } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { formatPhoneNumber, isValidPhoneNumer, formatMoney, revertFormatMoney } from '~/src/utils'
import Screen from '~/src/components/Screen'


const STEP = {
    PHONE_INPUT: 'PHONE_INPUT',
    TRANSFER_INFO: 'TRANSFER_INFO',
    OTP: 'OTP',
    RESULT: 'RESULT',
}
class MoneyTransferInfo extends React.PureComponent {
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

            money: '',
            password: '',
            fee: '',
            content: '',
            phone: '',
            otp: '',

            errPhone: '',
            errMoney: '',
            errFee: '',
            errContent: '',
            errOTP: '',
            errPass: '',
            loading: false
        }
        this.fakeBankAccount = {
            id: 2,
            bankImage: 'https://banner2.kisspng.com/20171216/dcc/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg',
            bankAccount: '7813737375432',
            expireDate: '09/19',
            active: false
        }
    }

    _handleBack = () => {
        Navigation.pop(this.props.componentId)
        return true
    }

    _handlePressTransfer = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.MoneyTransferOTP'
            }
        })
    }

    _getHeader = () => {
        return {
            titleT: 'transfer_info_hint',
            floatBankItem: true,
            bankItemInfo: this.fakeBankAccount
        }
    }

    _renderContent = () => {
        return (
            <Surface content flex>
                <Surface themeable={false} space20 />
                <Surface containerHorizontalSpace>
                    <Text darkBlue description t={'receiver_info'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <Surface themeable={false} space20 />
                <Surface containerHorizontalMargin>
                    <Surface rowSpacebetween infoRow>
                        <Text description t='phone' />
                        <Text description>{formatPhoneNumber(this.state.phone)}</Text>
                    </Surface>
                    <Surface rowSpacebetween infoRow>
                        <Text description t='account_owner' />
                        <Text description>HOANG THANH GIANG</Text>
                    </Surface>
                    <Surface space8 borderBottomBlue />
                </Surface>

                <Surface containerHorizontalSpace>
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}> 
                        <TextInput
                            placeholderT={'money_transfer_amount'}
                            black
                            keyboardType='number-pad'
                            onChangeText={text => this.setState({ money: text, errMoney: '' })}
                            value={formatMoney(this.state.money)}
                            hasError={!!this.state.errMoney}
                            errorText={this.state.errMoney}
                            rightTextT={'VND'}
                        />
                        <TextInput
                            placeholderT={'fee'}
                            black
                            keyboardType='number-pad'
                            onChangeText={text => this.setState({ fee: text, errFee: '' })}
                            value={formatMoney(this.state.fee)}
                            hasError={!!this.state.errFee}
                            errorText={this.state.errFee}
                            rightTextT={'VND'}
                        />
                        <TextInput
                            placeholderT={'money_trasfer_content'}
                            black
                            keyboardType='number-pad'
                            onChangeText={text => this.setState({ content: text, errContent: '' })}
                            value={this.state.content}
                            hasError={!!this.state.errContent}
                            errorText={this.state.errContent}
                        />
                        <TextInput
                            descriptionIcon={'GB_pass'}
                            placeholderT={'password'}
                            black
                            onChangeText={text => this.setState({ password: text, errPass: '' })}
                            value={this.state.password}
                            secureTextEntry={true}
                            hasError={!!this.state.errPass}
                            errorText={this.state.errPass}
                        />
                    </KeyboardAvoidingView>
                </Surface>
                <Surface themeable={false} bottomButtonSpace />
            </Surface>
        )
    }


    _getBottomButtonByStep = () => {
        const enableTransferButton = !!(
            !!this.state.money && !!this.state.fee && !!this.state.content && !!this.state.password
        )
        return {
            show: true,
            t: 'money_transfer',
            onPress: this._handlePressTransfer,
            enable: enableTransferButton
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }

    render() {

        return (
            <Screen
                content={this._renderContent}
                header={this._getHeader()}
                toolbarTitleT={'transfer_info'}
                hanleBack={this._handleBack}
                componentId={this.props.componentId}
                loading={this.state.loading}
                bottomButton={this._getBottomButtonByStep()}
            />
        )
    }
}

export default connect(null, {})(MoneyTransferInfo)