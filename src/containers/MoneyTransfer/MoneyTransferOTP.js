import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION } from '~/src/themes/common'
import { BackHandler, Platform } from 'react-native'
import { Surface, Text, TextInput } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { formatPhoneNumber, formatMoney } from '~/src/utils'
import Screen from '~/src/components/Screen'

const STEP = {
    PHONE_INPUT: 'PHONE_INPUT',
    TRANSFER_INFO: 'TRANSFER_INFO',
    OTP: 'OTP',
    RESULT: 'RESULT',
}
class MoneyTransferOTP extends React.PureComponent {
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
        Navigation.pop(this.props.componentId)
        return true
    }

    _handleContinueOTP = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.MoneyTransferResult'
            }
        })
    }

    _getHeader = () => {
        return {
            titleT: 'transaction_authenticate_hint',
            floatBankItem: true,
            bankItemInfo: this.fakeBankAccount
        }
    }

    _renderContentByStep = () => {
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
    }


    _getBottomButton = () => {
        const enableContinueOTP = !!this.state.otp
        return {
            show: true,
            t: 'money_transfer',
            onPress: this._handleContinueOTP,
            enable: enableContinueOTP
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
                content={this._renderContentByStep}
                header={this._getHeader()}
                toolbarTitleT={'transaction_authenticate'}
                hanleBack={this._handleBack}
                componentId={this.props.componentId}
                loading={this.state.loading}
                bottomButton={this._getBottomButton()}
            />
        )
    }
}

export default connect(null, {})(MoneyTransferOTP)