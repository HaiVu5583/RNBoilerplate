import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, ScrollView, BackHandler, Platform } from 'react-native'
import { Surface, Toolbar, Text, Icon, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import MaskBalanceView from '~/src/components/MaskBalanceView'
import { Navigation } from 'react-native-navigation'


const STEP = {
    CHOOSE_CARD: 'CHOOSE_CARD',
    INPUT: 'INPUT',
    RESULT: 'RESULT'
}
class Charge extends React.PureComponent {
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
            selecteCard: 1,
            step: STEP.CHOOSE_CARD,
            money: '',
            password: ''
        }
        this.bankAccount = [
            {
                id: 1,
                bankImage: 'https://i1.wp.com/sysbox.com.au/wp-content/uploads/2017/06/inverted-old-visa1.png?fit: 500%2C316&ssl: 1',
                bankAccount: '7813737375432',
                expireDate: '09/19',
            },
            {
                id: 2,
                bankImage: 'https://banner2.kisspng.com/20171216/dcc/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg',
                bankAccount: '7813737375432',
                expireDate: '09/19',
            },
            {
                id: 3,
                bankImage: 'https://i1.wp.com/sysbox.com.au/wp-content/uploads/2017/06/inverted-old-visa1.png?fit=500%2C316&ssl=1',
                bankAccount: '7813737375432',
                expireDate: '09/19',
            }
        ]
    }

    _handleBack = () => {
        Navigation.pop(this.props.componentId)
        return true
    }

    _handleChargeMoney = () => {
        console.log('Press Charge Money')
        this.setState({ step: STEP.RESULT })
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }

    _renderHeaderByStep = () => {
        const hintT = (this.state.step == STEP.CHOOSE_CARD ? 'charge_gigabank_hint' :
            this.state.step == STEP.INPUT ? 'charge_input_hint' : ''
        )
        const { cardItem } = this.props
        return (
            <Surface themeable={false} imageBackgroundSmall>
                <Surface themeable={false} containerHorizontalSpace>
                    <Text white description t={'send_account'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <Surface themeable={false} space16 />
                <Surface themeable={false} containerHorizontalMargin>
                    <BankAccountItem
                        bankImage={cardItem.bankImage}
                        bankAccount={cardItem.bankAccount}
                        expireDate={cardItem.expireDate}
                        onPress={() => { }}
                        active={false}
                    />
                </Surface>
                <Surface themeable={false} space16 />
                <Surface themeable={false} containerHorizontalSpace>
                    <Text white description t={'receive_account'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <Surface themeable={false} space16 />
                <Surface themeable={false}>
                    <Surface themeable={false} containerHorizontalMargin style={{ zIndex: 100 }}>
                        <BankAccountItem
                            bankImage={cardItem.bankImage}
                            bankAccount={cardItem.bankAccount}
                            expireDate={cardItem.expireDate}
                            onPress={() => { }}
                            active={true}
                        />
                    </Surface>
                    <Surface floatBankItemPart />
                </Surface>
            </Surface>
        )


    }

    _renderContentByStep = () => {
        return (
            <ScrollView>
                <Surface themeable={false} space20 />
                <Surface containerHorizontalSpace>
                    <Text darkBlue description t={'transaction_info'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <Surface themeable={false} space20 />
                <Surface containerHorizontalMargin>
                    <Surface rowSpacebetween>
                        <Text description t='transaction_code' />
                        <Text description>X12AA22</Text>
                    </Surface>
                    <Surface rowSpacebetween>
                        <Text description t='money_number' />
                        <Text description>5.000.000VND</Text>
                    </Surface>
                    <Surface rowSpacebetween>
                        <Text description t='discount' />
                        <Text description>5.000VND</Text>
                    </Surface>

                    <Surface rowSpacebetween>
                        <Text description t='fee' />
                        <Text description>11.000VND</Text>
                    </Surface>
                    <Surface rowSpacebetween>
                        <Text description t='gigabank_balance' />
                        <Text description>30.000.000VND</Text>
                    </Surface>
                    <Surface rowSpacebetween>
                        <Text description t='discount_balance' />
                        <Text description>30.000VND</Text>
                    </Surface>
                    <Surface rowSpacebetween>
                        <Text description t='transaction_time' />
                        <Text description>15:11 17/07/2018</Text>
                    </Surface>
                </Surface>
            </ScrollView>
        )
    }

    _renderBottomButtonByStep = () => {
        return (
            <Surface containerHorizontalSpace rowAlignEnd>
                <Button
                    round full outline-blue
                    noPadding
                    t={'go_back_home'}
                    onPress={this._handleGoHome}
                    enable={true}
                    style={{ marginBottom: 10 }}
                />
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
        const titleT = 'transaction_result'
        return (
            <Surface flex>
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: 'white' }}
                        titleT={titleT}
                        titleStyle={{ color: 'white' }}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    <Surface themeable={false} space20 />
                    {this._renderHeaderByStep()}
                    <Surface flex>
                        {this._renderContentByStep()}
                        <Surface themeable={false} space16 />
                        {this._renderBottomButtonByStep()}
                    </Surface>
                </ImageBackground>
            </Surface >
        )
    }
}

export default connect(null, {})(Charge)