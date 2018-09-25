import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION } from '~/src/themes/common'
import { BackHandler, Platform } from 'react-native'
import { Surface, Button, TextInput } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import Screen from '~/src/components/Screen'

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
            money: '',
            password: '',
            loading: false
        }
    }

    _handleBack = () => {
        Navigation.pop(this.props.componentId)
        return true
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

    _getHeader = () => {
        const { cardItem } = this.props
        return {
            titleT: 'charge_input_hint',
            floatBankItem: true,
            bankItemInfo: {
                ...cardItem,
                active: true
            }
        }
    }

    _renderContent = () => {
        return (
            <Surface containerHorizontalSpace flex content>
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

    _getBottomButton = () => {
        const enableChargeButton = !!(this.state.money && this.state.password)
        return {
            show: true,
            t: 'charge_money',
            onPress: this._handleChargeMoney,
            enable: enableChargeButton
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
                toolbarTitleT={'charge_info'}
                hanleBack={this._handleBack}
                componentId={this.props.componentId}
                loading={this.state.loading}
                bottomButton={this._getBottomButton()}
            />
        )
    }
}

export default connect(null, {})(ChargeInfo)