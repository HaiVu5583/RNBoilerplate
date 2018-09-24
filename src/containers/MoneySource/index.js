import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { BackHandler, Platform } from 'react-native'
import { Surface, Text, Icon, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import { Navigation } from 'react-native-navigation'
import { getListCard } from '~/src/store/actions/credit'
import { listCardSelector } from '~/src/store/selectors/credit'
import { ADDED_CARD_TYPE } from '~/src/constants'
import Screen from '~/src/components/Screen'

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
            money: '',
            password: '',
            errPass: '',
            loading: false
        }
        this.selectedCardItem = {}
    }

    _handleBack = () => {
        Navigation.pop(this.props.componentId)
        return true
    }

    _handlePressBankItem = (item) => {
        // if (item.id != this.state.selecteCard) {
        //     this.setState({ selecteCard: item.cardId })
        // }
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }

    _handleDeleteCard = (item) => {
        console.log('Deleting', item)
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.MoneySourceDeleteCard',
                passProps: {
                    cardItem: item
                }
            },

        })
    }

    _handleAddCard = () => {
        console.log('Pressing Add Card')
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.AddCard',
            }
        })
    }

    _getHeader = () => {
        return {
            titleT: 'money_source_hint'
        }
    }

    _renderCardItem = (item, index) => {
        return (
            <Surface themeable={false} key={item.cardId}>
                <BankAccountItem
                    bankImage={item.logo}
                    bankAccount={item.hintCard}
                    expireDate={item.expiryDate}
                    active={(item.type == ADDED_CARD_TYPE.ADDED)}
                    draggable={(item.type == ADDED_CARD_TYPE.ADDED)}
                    isGigabank={(item.type == ADDED_CARD_TYPE.GIGABANK)}
                    onDelete={() => this._handleDeleteCard(item)}
                />
            </Surface>
        )
    }

    _renderContent = () => {
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
        return (
            <Screen
                content={this._renderContent}
                header={this._getHeader()}
                toolbarTitleT={'money_source'}
                hanleBack={this._handleBack}
                componentId={this.props.componentId}
                loading={this.state.loading}
            />
        )
    }
}

export default connect(state => ({
    listCard: listCardSelector(state)
}), { getListCard })(MoneySource)