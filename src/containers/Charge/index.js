import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, ScrollView, BackHandler, Platform } from 'react-native'
import { Surface, Toolbar, Text, Icon, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import MaskBalanceView from '~/src/components/MaskBalanceView'
import { Navigation } from 'react-native-navigation'
import Screen from '~/src/components/Screen'


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
        const selectedCardItem = this.bankAccount.filter(item => item.id == this.state.selecteCard)[0]
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.ChargeInfo',
                passProps: {
                    cardItem: selectedCardItem
                }
            },
        })

    }

    _handleChargeMoney = () => {
        console.log('Press Charge Money')
        this.setState({ step: STEP.RESULT })
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }

    _renderHeaderFunction = () => {
        return (
            <Surface themeable={false} imageBackground>
                <Surface themeable={false} fakeToolbar />
                <Surface themeable={false} space20 />
                <Surface themeable={false} containerHorizontalSpace>
                    <Text white description t={'charge_gigabank_hint'} />
                </Surface>
                {/* <Surface themeable={false} space16 /> */}
                <MaskBalanceView money={'120000'} />
            </Surface>
        )
    }

    _getHeader = () => {
        return {
            render: this._renderHeaderFunction
        }
    }

    _renderContent = () => {
        return (
            <Surface containerHorizontalMargin flex content>
                <Surface themeable={false} space20 />
                {this.bankAccount.map((item) => (
                    <Surface themeable={false} key={item.id}>
                        <BankAccountItem
                            bankImage={item.bankImage}
                            bankAccount={item.bankAccount}
                            expireDate={item.expireDate}
                            onPress={() => this._handlePressBankItem(item)}
                            active={this.state.selecteCard == item.id}
                        />
                    </Surface>
                ))}
                <Button
                    flat
                    rowStart
                    leftComponent={() => (
                        <Icon name='GB_plus' style={{ fontSize: 24, color: COLORS.BLUE }} />
                    )}
                    centerComponent={() => (
                        <Text blue t='add_link_card' />
                    )}
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                />
            </Surface>
        )
    }

    _renderBottomButtonByStep = () => {
        return (
            <Surface containerHorizontalSpace rowAlignEnd>
                <Button
                    round full
                    noPadding
                    t={'continue'}
                    onPress={this._handleContinueChooseCard}
                    enable={true}
                    gradientButton={true}
                    rippleStyle={{ marginBottom: 10, width: '100%' }}
                />
            </Surface>
        )
    }
    _getBottomButton = () => {
        return {
            show: true,
            t: 'continue',
            onPress: this._handleContinueChooseCard,
            enable: true
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
                toolbarTitleT={'charge_gigabank'}
                hanleBack={this._handleBack}
                componentId={this.props.componentId}
                loading={this.state.loading}
                bottomButton={this._getBottomButton()}
            />
        )
    }
}

export default connect(null, {})(Charge)