
import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { BackHandler, Platform } from 'react-native'
import { Surface, TextInput } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { getListCard, deleteCard } from '~/src/store/actions/credit'
import { verifyPin } from '~/src/store/actions/auth'
import { listCardSelector } from '~/src/store/selectors/credit'
import Screen from '~/src/components/Screen'
import md5 from 'md5'
import I18n from '~/src/I18n'
import { chainParse } from '~/src/utils'

class DeleteCardConfirm extends React.PureComponent {
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
        const { listCard } = props
        this.state = {
            money: '',
            password: '',
            errPass: '',
            loading: false
        }
    }

    _handleBack = () => {
        Navigation.pop(this.props.componentId)
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }

    _deleteCard = () => {
        if (this.state.loading) return
        const { cardItem } = this.props
        this.setState({ loading: true })
        this.props.verifyPin(md5(this.state.password), (err, data) => {
            console.log('Error VerifyPin', err)
            console.log('Data VerifyPin', data)
            if (data && data.code && data.code == 1005) {
                this.setState({ errPass: I18n.t('err_invalid_password'), loading: false })
                return
            } else if (data && data['access-token']) {
                // Do smt
                this.props.deleteCard(cardItem.cardId, data['access-token'], (errDeleteCard, dataDeleteCard) => {
                    console.log('Error Delete Card', errDeleteCard)
                    console.log('Data Delete Card', dataDeleteCard)
                    this.setState({ loading: false })
                    if (chainParse(dataDeleteCard, ['updated', 'result'])) {
                        this.props.getListCard()
                        Navigation.push(this.props.componentId, {
                            component: {
                                name: 'gigabankclient.MoneySourceDeleteSuccess',
                            },
                        })
                    }
                })
                return
            }
            this.setState({ loading: false })
        })
    }


    _getHeader = () => {
        const { cardItem } = this.props
        return {
            titleT: 'delete_linked_card_hint',
            floatBankItem: true,
            bankItemInfo: {
                bankImage: cardItem.logo,
                bankAccount: cardItem.hintCard,
                expireDate: cardItem.expiryDate,
                active: true
            }
        }
    }

    _renderContent = () => {
        return (
            <Surface containerHorizontalSpace flex content>
                <Surface themeable={false} space16 />
                <TextInput
                    descriptionIcon={'GB_pass'}
                    placeholderT={'hint_input_password'}
                    blackWithDarkblueIcon
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                    secureTextEntry={true}
                    hasError={!!this.state.errPass}
                    errorText={this.state.errPass}
                />
            </Surface>
        )
    }

    _getBottomButtonByStep = () => {
        return {
            show: true,
            t: 'delete_card',
            onPress: this._deleteCard
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }

    render() {
        console.log('Money Source state', this.state)
        let titleT = 'delete_linked_card'
        return (
            <Screen
                content={this._renderContent}
                header={this._getHeader()}
                toolbarTitleT={titleT}
                hanleBack={this._handleBack}
                componentId={this.props.componentId}
                loading={this.state.loading}
                bottomButton={this._getBottomButtonByStep()}
            />
        )
    }
}

export default connect(state => ({
    listCard: listCardSelector(state)
}), { getListCard, verifyPin, deleteCard })(DeleteCardConfirm)