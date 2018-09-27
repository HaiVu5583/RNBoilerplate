import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, STATUS_BAR_HEIGHT } from '~/src/themes/common'
import { Platform, FlatList, KeyboardAvoidingView } from 'react-native'
import { Surface, Text, TextInput } from '~/src/themes/ThemeComponent'
import { SIZES } from '~/src/themes/common'
import { Navigation } from 'react-native-navigation'
import Screen from '~/src/components/Screen'
import OTPCountdown from '~/src/containers/Authentication/OTPCountdown'
import { COLORS } from '../../themes/common';

export default class BuyCardPrice extends React.PureComponent {
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
            loading: false,
            otp: '',
            errOTP: ''
        }
        this.header = {
            titleT: 'transaction_authenticate_hint',
            floatBankItem: true,
            bankItemInfo: {
                id: 2,
                bankImage: 'https://banner2.kisspng.com/20171216/dcc/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg',
                bankAccount: '7813737375432',
                expireDate: '09/19',
                active: false
            }
        }
    }

    _render = () => {
        return (
            <Surface content flex>
                <Surface containerHorizontalSpace titleInfoBlock>
                    <Text bold darkBlue titleInfo t={'transaction_info'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <Surface containerHorizontalMargin>
                    <Surface rowSpacebetween themeable={false}>
                        <Text infoResult t={'provider'} />
                        <Text infoResult>Viettel Telecom</Text>
                    </Surface>
                    <Surface themeable={false} lineSeperatorBlue />
                    <Surface rowSpacebetween themeable={false}>
                        <Text bold infoResult t={'card_value'} />
                        <Text bold infoResult t={'number'} />
                        <Text bold infoResult t={'discount'} />
                    </Surface>
                    <Surface rowSpacebetween themeable={false}>
                        <Text infoResult>10.000 VND</Text>
                        <Text infoResult>2</Text>
                        <Text infoResult>10%</Text>
                    </Surface>
                    <Surface rowSpacebetween themeable={false}>
                        <Text infoResult>50.000 VND</Text>
                        <Text infoResult>3</Text>
                        <Text infoResult>5%</Text>
                    </Surface>
                </Surface>
                <Surface themeable={false} seperator />
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Surface containerHorizontalSpace>
                        <Surface themeable={false} space40 />
                        <TextInput
                            placeholder={'\u2022 \u2022 \u2022 \u2022 \u2022 \u2022'}
                            blackWithDarkblueIcon
                            descriptionIcon={'GB_SMS'}
                            keyboardType='number-pad'
                            hasError={!!this.props.errOTP}
                            errorText={this.props.errOTP}
                            onChangeText={text => this.setState({ otp: text, errOTP: '' })}
                            value={this.state.otp}
                        />
                        <Surface themeable={false} space8 />
                        <Surface themeable={false} fullWidth rowCenter>
                            <OTPCountdown time={10} white={false}
                                textColor={'black'}
                                onResend={() => { }}
                            />
                        </Surface>
                    </Surface>
                </KeyboardAvoidingView>
            </Surface>
        )
    }

    _handlePressContinue = () => {

    }

    _getBottomButton = () => {
        return {
            show: true,
            t: 'pay',
            onPress: this._handlePressContinue,
            enable: true
        }
    }

    render() {
        return <Screen
            content={this._render}
            header={this.header}
            toolbarTitleT='transaction_authenticate'
            hanleBack={this._handleBack}
            componentId={this.props.componentId}
            loading={this.state.loading}
            bottomButton={this._getBottomButton()}
        />
    }
}