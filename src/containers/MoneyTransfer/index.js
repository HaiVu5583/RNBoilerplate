import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, ScrollView, BackHandler, Platform } from 'react-native'
import { Surface, Toolbar, Text, Icon, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import { Navigation } from 'react-native-navigation'
import Permissions from 'react-native-permissions'
import { PERMISSION_RESPONSE } from '~/src/constants'
import { formatPhoneNumber, isValidPhoneNumer, formatMoney, revertFormatMoney } from '~/src/utils'
import I18n from '~/src/I18n'
import Screen from '~/src/components/Screen'


const STEP = {
    PHONE_INPUT: 'PHONE_INPUT',
    TRANSFER_INFO: 'TRANSFER_INFO',
    OTP: 'OTP',
    RESULT: 'RESULT',
}
class MoneyTransfer extends React.PureComponent {
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
            step: STEP.PHONE_INPUT,

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
        if (this.state.step == STEP.PHONE_INPUT) {
            console.log('Component Id', this.props.componentId)
            Navigation.pop(this.props.componentId)
        } else if (this.state.step == STEP.TRANSFER_INFO) {
            this.setState({ step: STEP.PHONE_INPUT })
        } else if (this.state.step == STEP.OTP) {
            this.setState({ step: STEP.TRANSFER_INFO })
        } else if (this.state.step == STEP.RESULT) {
            this.setState({ step: STEP.OTP })
        }
        return true
    }

    _handleContinuePhoneInput = () => {
        console.log('Continue Choose Card')
        const phoneNumber = this.state.phone.replace(/\s/g, '')
        if (!isValidPhoneNumer(phoneNumber)) {
            this.setState({ errPhone: I18n.t('err_invalid_phone_number') })
        } else {
            this.setState({ step: STEP.TRANSFER_INFO })
        }
    }

    _handlePressTransfer = () => {
        this.setState({ step: STEP.OTP })
    }

    _handleContinueOTP = () => {
        this.setState({ step: STEP.RESULT })
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }

    _handleChooseContact = (contact) => {
        console.log('Choose Contact', contact)
        this.setState({ phone: contact })
    }

    _handlePressContact = async () => {
        Permissions.request('contacts').then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            console.log('check request permsion callback', { response });
            if (response == PERMISSION_RESPONSE.AUTHORIZED) {
                Navigation.push(this.props.componentId, {
                    component: {
                        name: 'gigabankclient.ContactChooser',
                        passProps: {
                            onChooseContact: this._handleChooseContact
                        }
                    }
                })
            } else {
                console.log('Permission Deny')
            }
        })
    }

    _getHeaderByStep = () => {
        let hintT = ''
        switch (this.state.step) {
            case STEP.PHONE_INPUT:
            default:
                hintT = 'money_transfer_hint'
                break
            case STEP.TRANSFER_INFO:
                hintT = 'transfer_info_hint'
                break
            case STEP.OTP:
                hintT = 'transaction_authenticate_hint'
                break
            case STEP.RESULT:
                hintT = 'send_account'
        }

        if (this.state.step == STEP.PHONE_INPUT) {
            return {
                titleT: hintT
            }
        } else if (this.state.step == STEP.TRANSFER_INFO || this.state.step == STEP.OTP
            || this.state.step == STEP.RESULT) {
            return {
                titleT: hintT,
                floatBankItem: true,
                bankItemInfo: this.fakeBankAccount
            }
        }
    }

    _renderContentByStep = () => {
        if (this.state.step == STEP.PHONE_INPUT) {
            return (
                <Surface containerHorizontalSpace content flex>
                    <Surface themeable={false} space16 />
                    <TextInput
                        placeholderT={'phone_receive_money_hint'}
                        blackWithDarkblueIcon
                        onChangeText={text => this.setState({ phone: text, errPhone: '' })}
                        keyboardType='number-pad'
                        value={formatPhoneNumber(this.state.phone)}
                        iconRight={'GB_contact'}
                        onPressIconRight={this._handlePressContact}
                        showIconRight={true}
                        hasError={!!this.state.errPhone}
                        errorText={this.state.errPhone}
                    />
                </Surface>
            )
        } else if (this.state.step == STEP.TRANSFER_INFO) {
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
                    </Surface>
                </Surface>
            )
        } else if (this.state.step == STEP.OTP) {
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
                        <Surface rowSpacebetween infoRow>
                            <Text description t='money_transfer_amount' />
                            <Text description>{formatMoney(this.state.money)}
                                <Text description t={'VND'} />
                            </Text>
                        </Surface>
                        <Surface rowSpacebetween infoRow>
                            <Text description t='fee' />
                            <Text description>{formatMoney(this.state.fee)}
                                <Text description t={'VND'} />
                            </Text>
                        </Surface>
                        <Surface space8 borderBottomBlue />
                        <Surface rowSpacebetween infoRow>
                            <Text description t='content' />
                            <Text description>{this.state.content}</Text>
                        </Surface>
                    </Surface>
                    <Surface containerHorizontalSpace>
                        <TextInput
                            descriptionIcon={'GB_SMS'}
                            placeholderT={'otp'}
                            black
                            onChangeText={text => this.setState({ otp: text, errOTP: '' })}
                            value={this.state.otp}
                            hasError={!!this.state.errOTP}
                            errorText={this.state.errOTP}
                        />
                    </Surface>
                </Surface>
            )
        } else if (this.state.step == STEP.RESULT) {
            return (
                <Surface content>
                    <Surface themeable={false} space20 />
                    <Surface containerHorizontalSpace>
                        <Text darkBlue description t={'transaction_info'} textTransform={String.prototype.toUpperCase} />
                    </Surface>
                    <Surface themeable={false} space20 />
                    <Surface containerHorizontalMargin>
                        <Surface rowSpacebetween infoRow>
                            <Text description t='transaction_code' />
                            <Text description>X12AA22</Text>
                        </Surface>
                        <Surface rowSpacebetween infoRow>
                            <Text description t='money_number' />
                            <Text description>5.000.000VND</Text>
                        </Surface>
                        <Surface rowSpacebetween infoRow>
                            <Text description t='discount' />
                            <Text description>5.000VND</Text>
                        </Surface>

                        <Surface rowSpacebetween infoRow>
                            <Text description t='fee' />
                            <Text description>11.000VND</Text>
                        </Surface>
                        <Surface rowSpacebetween infoRow>
                            <Text description t='gigabank_balance' />
                            <Text description>30.000.000VND</Text>
                        </Surface>
                        <Surface rowSpacebetween infoRow>
                            <Text description t='discount_balance' />
                            <Text description>30.000VND</Text>
                        </Surface>
                        <Surface rowSpacebetween infoRow>
                            <Text description t='transaction_time' />
                            <Text description>15:11 17/07/2018</Text>
                        </Surface>
                    </Surface>
                </Surface>
            )
        }
    }


    _getBottomButtonByStep = () => {
        if (this.state.step == STEP.PHONE_INPUT) {
            return {
                show: true,
                t: 'continue',
                onPress: this._handleContinuePhoneInput,
                enable: !!this.state.phone
            }
        } else if (this.state.step == STEP.TRANSFER_INFO) {
            const enableTransferButton = !!(
                !!this.state.money && !!this.state.fee && !!this.state.content && !!this.state.password
            )
            return {
                show: true,
                t: 'money_transfer',
                onPress: this._handlePressTransfer,
                enable: enableTransferButton
            }
        } else if (this.state.step == STEP.OTP) {
            const enableContinueOTP = !!this.state.otp
            return {
                show: true,
                t: 'money_transfer',
                onPress: this._handleContinueOTP,
                enable: enableContinueOTP
            }
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }

    render() {
        console.log('Screen State', this.state)
        let titleT = ''
        switch (this.state.step) {
            case STEP.PHONE_INPUT:
            default:
                titleT = 'money_transfer'
                break
            case STEP.TRANSFER_INFO:
                titleT = 'transfer_info'
                break
            case STEP.OTP:
                titleT = 'transaction_authenticate'
                break
            case STEP.RESULT:
                titleT = 'transaction_result'
                break
        }
        return (
            <Screen
                content={this._renderContentByStep}
                header={this._getHeaderByStep()}
                toolbarTitleT={titleT}
                hanleBack={this._handleBack}
                componentId={this.props.componentId}
                loading={this.state.loading}
                bottomButton={this._getBottomButtonByStep()}
            />
        )
    }
}

export default connect(null, {})(MoneyTransfer)