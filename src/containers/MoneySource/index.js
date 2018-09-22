import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { BackHandler, Platform } from 'react-native'
import { Surface, Text, Icon, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import { Navigation } from 'react-native-navigation'
import { getListCard, deleteCard } from '~/src/store/actions/credit'
import { verifyPin } from '~/src/store/actions/auth'
import { listCardSelector } from '~/src/store/selectors/credit'
import { ADDED_CARD_TYPE } from '~/src/constants'
import Screen from '~/src/components/Screen'
import md5 from 'md5'
import I18n from '~/src/I18n'
import DeleteCardSuccess from '~/src/components/DeleteCardSuccess'
import { chainParse } from '~/src/utils'

const STEP = {
    LIST_CARD: 'LIST_CARD',
    DELETE_CARD: 'DELETE_CARD',
    DELETE_SUCCESS: 'DELETE_SUCCESS'
}
class MoneySource extends React.PureComponent {
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
            selecteCard: listCard && listCard[0] ? listCard[0].cardId : 0,
            step: STEP.LIST_CARD,
            money: '',
            password: '',
            errPass: '',
            loading: false
        }
        this.selectedCardItem = {}
    }

    _handleBack = () => {
        if (this.state.step == STEP.LIST_CARD) {
            console.log('Component Id', this.props.componentId)
            Navigation.pop(this.props.componentId)
        } else if (this.state.step == STEP.DELETE_CARD) {
            this.setState({ step: STEP.LIST_CARD })
        }
        return true
    }

    _handlePressBankItem = (item) => {
        if (item.id != this.state.selecteCard) {
            this.setState({ selecteCard: item.cardId })
        }
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }

    _handleDeleteCard = (item) => {
        console.log('Deleting', item)
        this.setState({
            selecteCard: item.cardId
        }, () => {
            this.setState({ step: STEP.DELETE_CARD })
        })
    }

    _deleteCard = () => {
        if (this.state.loading) return
        this.setState({ loading: true })
        this.props.verifyPin(md5(this.state.password), (err, data) => {
            console.log('Error VerifyPin', err)
            console.log('Data VerifyPin', data)
            if (data && data.code && data.code == 1005) {
                this.setState({ errPass: I18n.t('err_invalid_password'), loading: false })
                return
            } else if (data && data['access-token']) {
                // Do smt
                this.props.deleteCard(this.state.selecteCard, data['access-token'], (errDeleteCard, dataDeleteCard) => {
                    console.log('Error Delete Card', errDeleteCard)
                    console.log('Data Delete Card', dataDeleteCard)
                    if (chainParse(dataDeleteCard, ['updated', 'result'])) {
                        this.props.getListCard()
                        this.setState({ loading: false, step: STEP.DELETE_SUCCESS })
                    }
                })
                return
            }
            this.setState({ loading: false })
        })
    }

    _handleBackToList = () => {
        this.setState({ step: STEP.LIST_CARD })
    }

    _handleAddCard = () => {
        console.log('Pressing Add Card')
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.AddCard',
            }
        })
    }

    _getHeaderByStep = () => {
        console.log('Get Header', this.state.step)
        let hintT = ''
        switch (this.state.step) {
            case STEP.LIST_CARD:
            default:
                hintT = 'money_source_hint'
                break
            case STEP.DELETE_CARD:
                hintT = 'delete_linked_card_hint'
                break
        }
        const { listCard } = this.props
        const selectedCardItem = listCard.filter(item => item.cardId == this.state.selecteCard)[0]
        this.selectedCardItem = {
            bankImage: selectedCardItem.logo,
            bankAccount: selectedCardItem.hintCard,
            expireDate: selectedCardItem.expiryDate,
            active: true
        }
        if (this.state.step == STEP.LIST_CARD) {
            return {
                titleT: hintT
            }
        } else if (this.state.step == STEP.DELETE_CARD || this.state.step == STEP.INPUT) {
            console.log('Selected CardItem', selectedCardItem)
            return {
                titleT: hintT,
                floatBankItem: true,
                bankItemInfo: this.selectedCardItem
            }
        } else if (this.state.step == STEP.DELETE_SUCCESS) {
            return {
                enable: false
            }
        }
    }

    _renderCardItem = (item, index) => {
        return (
            <Surface themeable={false} key={item.cardId}>
                <BankAccountItem
                    bankImage={item.logo}
                    bankAccount={item.hintCard}
                    expireDate={item.expiryDate}
                    onPress={() => this._handlePressBankItem(item)}
                    active={(item.type == ADDED_CARD_TYPE.ADDED)}
                    draggable={(item.type == ADDED_CARD_TYPE.ADDED)}
                    isGigabank={(item.type == ADDED_CARD_TYPE.GIGABANK)}
                    onDelete={() => this._handleDeleteCard(item)}
                />
            </Surface>
        )
    }

    _renderContentByStep = () => {
        if (this.state.step == STEP.LIST_CARD) {
            return (
                <Surface themeable={false} flex content>
                    <Surface containerHorizontalMargin flex>
                        <Surface themeable={false} space20 />
                        {this.props.listCard.map(this._renderCardItem)}
                        <Button
                            flat
                            rowStart
                            leftComponent={() => (
                                <Icon name='GB_plus' style={{ fontSize: 24, color: COLORS.BLUE }} />
                            )}
                            centerComponent={() => (
                                <Text blue t='add_link_card' />
                            )}
                            onPress={this._handleAddCard}
                            style={{ paddingLeft: 0, paddingRight: 0 }}
                        />
                    </Surface>
                </Surface>
            )
        } else if (this.state.step == STEP.DELETE_CARD) {
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
        } else if (this.state.step == STEP.DELETE_SUCCESS) {
            return (
                <DeleteCardSuccess onPress={this._handleBackToList} />
            )
        }
    }

    _getBottomButtonByStep = () => {
        if (this.state.step == STEP.LIST_CARD) {
            return {
                show: false
            }
        } else if (this.state.step == STEP.DELETE_CARD) {
            return {
                show: true,
                t: 'delete_card',
                onPress: this._deleteCard
            }
        }
    }

    componentDidMount() {
        this.props.getListCard((err, data) => {
            console.log('Err getListCard', err)
            console.log('Data List Card', data)
        })
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }

    render() {
        console.log('Money Source state', this.state)
        let titleT = ''
        switch (this.state.step) {
            case STEP.LIST_CARD:
            default:
                titleT = 'money_source'
                break
            case STEP.DELETE_CARD:
                titleT = 'delete_linked_card'
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

export default connect(state => ({
    listCard: listCardSelector(state)
}), { getListCard, verifyPin, deleteCard })(MoneySource)