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
class ChargeInfo extends React.PureComponent {
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

    _handlePressAddCard = () => {
        console.log('Handle Press AddCard')
    }

    _handlePressBankItem = (item) => {
        if (item.id != this.state.selecteCard) {
            this.setState({ selecteCard: item.id })
        }
    }

    _handleContinueChooseCard = () => {
        console.log('Continue Choose Card')
        this.setState({ step: STEP.INPUT })
    }

    _handleChargeMoney = () => {
        console.log('Press Charge Money')
        const { cardItem } = this.props
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.ChargeResult',
                passProps: {
                    cardItem
                }
            },
        })
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }

    _renderHeaderByStep = () => {
        const { cardItem } = this.props
        return (
            <Surface themeable={false} imageBackgroundSmallFloat>
                <Surface themeable={false} containerHorizontalSpace>
                    <Text white description t={'charge_input_hint'} />
                </Surface>
                <Surface themeable={false} flex />
                <Surface themeable={false} containerHorizontalMargin style={{ zIndex: 100 }}>
                    <BankAccountItem
                        bankImage={cardItem.bankImage}
                        bankAccount={cardItem.bankAccount}
                        expireDate={cardItem.expireDate}
                        onPress={() => { }}
                        active={true}
                        verticalMargin={false}
                    />
                </Surface>
                <Surface floatBankItemPart />
            </Surface>
        )
    }

    _renderContentByStep = () => {
        return (
            <Surface containerHorizontalSpace flex>
                <Surface themeable={false} space16 />
                <TextInput
                    descriptionIcon={'GB_recharge'}
                    placeholderT={'charge_input_money_hint'}
                    blackWithDarkblueIcon
                    onChangeText={text => this.setState({ money: text })}
                    keyboardType='number-pad'
                    value={this.state.money}
                    iconRight={'GB_close'}
                    onPressIconRight={() => this.setState({ money: '' })}
                    showIconRight={(this.state.money && this.state.money.trim())}
                />
                <TextInput
                    descriptionIcon={'GB_pass'}
                    placeholderT={'hint_input_password'}
                    blackWithDarkblueIcon
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                    secureTextEntry={true}
                />
            </Surface>
        )
    }

    _renderBottomButtonByStep = () => {
        const enableChargeButton = !!(this.state.money && this.state.password)
        return (
            <Surface containerHorizontalSpace rowAlignEnd>
                <Button
                    round full
                    noPadding
                    t={'charge_money'}
                    onPress={this._handleChargeMoney}
                    enable={enableChargeButton}
                    gradientButton={true}
                    rippleStyle={{ marginBottom: 10, width: '100%' }}
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
        const titleT = 'charge_info'
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

export default connect(null, {})(ChargeInfo)