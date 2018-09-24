import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION } from '~/src/themes/common'
import { BackHandler, Platform } from 'react-native'
import { Surface, Text } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import Screen from '~/src/components/Screen'

class MoneyTransferResult extends React.PureComponent {
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

    _getHeaderByStep = () => {
        return {
            titleT: 'send_account',
            floatBankItem: true,
            bankItemInfo: this.fakeBankAccount
        }
    }

    _renderContent = () => {
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
                header={this._getHeaderByStep()}
                toolbarTitleT={'transaction_result'}
                hanleBack={this._handleBack}
                componentId={this.props.componentId}
                loading={this.state.loading}
            />
        )
    }
}

export default connect(null, {})(MoneyTransferResult)