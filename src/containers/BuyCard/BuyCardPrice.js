import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, STATUS_BAR_HEIGHT } from '~/src/themes/common'
import { Platform, FlatList, BackHandler } from 'react-native'
import { Surface, Text } from '~/src/themes/ThemeComponent'
import { SIZES } from '~/src/themes/common'
import { Navigation } from 'react-native-navigation'
import Screen from '~/src/components/Screen'
import CardPriceSelector from '~/src/components/CardPriceSelector'

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
            selectCard: {

            }
        }
        this.header = {
            titleT: 'buy_card_price_hint',
            floatBankItem: true,
            cardItemInfo: {
                image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/e/e8/Logo_Viettel.svg/800px-Logo_Viettel.svg.png'
            }
        }
        this.cards = [
            {
                id: 1,
                valueLabel: '10.000'
            },
            {
                id: 2,
                valueLabel: '20.000'
            },
            {
                id: 3,
                valueLabel: '30.000'
            },
            {
                id: 4,
                valueLabel: '50.000'
            },
            {
                id: 5,
                valueLabel: '100.000'
            },
            {
                id: 6,
                valueLabel: '200.000'
            },
            {
                id: 7,
                valueLabel: '500.000'
            }
        ]
    }

    _handleValueChange = (id, number) => {
        const cloneSelectCard = { ...this.state.selectCard }
        cloneSelectCard[id] = number
        this.setState({
            selectCard: cloneSelectCard
        })
    }

    _renderCardPriceSelector = ({ item, index }) => {
        return <CardPriceSelector
            id={item.id}
            valueLabel={item.valueLabel}
            onValueChange={this._handleValueChange}
            style={{ marginBottom: 16 }}
        />
    }

    _render = () => {
        return (
            <Surface content flex>
                <Surface containerHorizontalSpace titleInfoBlock>
                    <Text bold darkBlue titleInfo t={'choose_phone_card_type'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <Surface containerHorizontalMargin>
                    <FlatList
                        data={this.cards}
                        renderItem={this._renderCardPriceSelector}
                        keyExtractor={(item, index) => '' + item.id}
                        bounces={false}
                    />
                </Surface>
                <Surface themeable={false} bottomButtonSpace />

            </Surface>
        )
    }

    _handlePressContinue = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.BuyCardTransactionOTP'
            }
        })
    }

    _getBottomButton = () => {
        const totalCardBuy = Object.values(this.state.selectCard).reduce((a, b) => a + b, 0)
        return {
            show: true,
            t: 'continue',
            onPress: this._handlePressContinue,
            enable: (totalCardBuy > 0)
        }
    }

    _handleBack = () => {
        Navigation.pop(this.props.componentId)
        return true
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }

    render() {
        return <Screen
            content={this._render}
            header={this.header}
            toolbarTitleT='buy_card'
            hanleBack={this._handleBack}
            componentId={this.props.componentId}
            loading={this.state.loading}
            bottomButton={this._getBottomButton()}
        />
    }
}