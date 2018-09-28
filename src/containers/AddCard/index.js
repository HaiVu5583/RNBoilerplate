import React, { Component } from 'react';
import {
    Surface, Text
} from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { View, FlatList, WebView } from 'react-native'
import { connect } from 'react-redux'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, COLORS, SIZES } from '~/src/themes/common'
import CardItem from '~/src/components/CardItem'
import { addCreditCard, getBankList, getListCard } from '~/src/store/actions/credit'
import AddCardSuccess from '~/src/components/AddCardSuccess'
import AddCardFail from '~/src/components/AddCardFail'
import { internationalTokenCardSelector, domesticTokenCardSelector } from '~/src/store/selectors/credit'
import Screen from '~/src/components/Screen'
const gridWidth = (DEVICE_WIDTH - SIZES.CONTAINER_HORIZONTAL_MARGIN * 2) / 3

const STEP = {
    LIST_BANK: 'LIST_BANK',
    WEBVIEW_ADD_CARD: 'WEBVIEW_ADD_CARD',
    ADD_CARD_SUCCESS: 'ADD_CARD_SUCCESS',
    ADD_CARD_FAIL: 'ADD_CARD_FAIL'
}

class AddCard extends Component {
    static get options() {
        return {
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false
            }
        };
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            step: STEP.LIST_BANK
        }
        this.webviewAddCardInfo = {}
    }

    componentDidMount() {
        this.props.getBankList((err, data) => {
            console.log('Err Get Bank List', err)
            console.log('Data Get Bank List', data)
        })
    }

    _handleBackToList = () => {
        Navigation.pop(this.props.componentId)
    }

    _handlePressInternationalCard = (item) => {
        if (this.state.loading) return
        this.setState({ loading: true })
        this.props.addCreditCard(item.type, (err, data) => {
            console.log('Err AddCreditCard', err)
            console.log('Data AddCreditCard', data)
            if (data && data.gatewayLink) {
                this.webviewAddCardInfo = data
                this.setState({ step: STEP.WEBVIEW_ADD_CARD, loading: false })
                return
            }
            this.setState({ loading: false })
        })
    }

    _renderInternationalCard = ({item, index}) => {
        return (
            <CardItem
                image={item.logo}
                style={{ marginRight: 15 }}
                onPress={() => this._handlePressInternationalCard(item)}
            />
        )
    }

    _renderDomesticCard = ({item, index}) => {
        return (
            <Surface themeable={false} columnCenter style={{ width: gridWidth }}>
                <CardItem
                    image={item.logo}
                    style={{ marginBottom: 5 }}
                    onPress={() => this._handlePressInternationalCard(item)}
                    gradient={true}
                />
            </Surface>
        )
    }

    _renderListBank = () => {
        return (
            <Surface content>
                <Surface containerHorizontalSpace titleInfoBlock>
                    <Text bold darkBlue titleInfo t={'international_card'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <FlatList
                    data={this.props.internationalCard}
                    renderItem={this._renderInternationalCard}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item.id + '_' + index}
                    bounces={false}
                    scrollEnabled={false}
                    contentContainerStyle={{ paddingHorizontal: SIZES.CONTAINER_HORIZONTAL_MARGIN }}
                />
                <Surface containerHorizontalSpace titleInfoBlock>
                    <Text bold darkBlue titleInfo t={'domestic_card'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <FlatList
                    data={this.props.domesticCard}
                    renderItem={this._renderDomesticCard}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item.id + '_' + index}
                    bounces={false}
                    numColumns={3}
                    contentContainerStyle={{ paddingHorizontal: SIZES.CONTAINER_HORIZONTAL_MARGIN }}
                />
            </Surface>
        )
    }

    _onLoadWebviewAddCardStart = (e) => {
        const webviewInfo = this.webviewAddCardInfo
        if (webviewInfo && webviewInfo.successLink && e.nativeEvent.url.indexOf(webviewInfo.successLink) > -1) {
            this.webViewAddCard && this.webViewAddCard.stopLoading()
            this.setState({ step: STEP.ADD_CARD_SUCCESS })
            this.props.getListCard()
        } else if (webviewInfo && webviewInfo.failLink && e.nativeEvent.url.indexOf(webviewInfo.failLink) > -1) {
            this.webViewAddCard && this.webViewAddCard.stopLoading()
            this.setState({ step: STEP.ADD_CARD_FAIL })
        }
    }

    _onLoadWebviewAddCardEnd = (e) => {
        console.log('On load end', e.nativeEvent)
    }

    _onLoadWebviewAddCardError = (e) => {
        console.log('On load error', e.nativeEvent)
    }

    _renderWebviewAddCard = () => {
        return (
            <Surface themeable={false} flex>
                <Surface themeable={false} fakeToolbar />
                <WebView
                    startInLoadingState={true}
                    onLoadStart={this._onLoadWebviewAddCardStart}
                    onLoadEnd={this._onLoadWebviewAddCardEnd}
                    onError={this._onLoadWebviewAddCardError}
                    source={{ uri: this.webviewAddCardInfo.gatewayLink }}
                    ref={ref => this.webViewAddCard = ref}
                    scalesPageToFit={false}
                    style={{ backgroundColor: COLORS.WHITE, width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}
                />
            </Surface>
        )
    }

    _renderAddCardSuccess = () => {
        return (
            <AddCardSuccess onPress={this._handleBackToList} />
        )
    }

    _renderAddCardFail = () => {
        return (
            <AddCardFail onPress={this._handleBackToList} />
        )
    }

    _render = () => {
        switch (this.state.step) {
            case STEP.LIST_BANK:
            default:
                return this._renderListBank()
            case STEP.WEBVIEW_ADD_CARD:
                return this._renderWebviewAddCard()
            case STEP.ADD_CARD_SUCCESS:
                return this._renderAddCardSuccess()
            case STEP.ADD_CARD_FAIL:
                return this._renderAddCardFail()
        }
    }

    render() {
        return <Screen
            content={this._render}
            header={{
                titleT: 'add_card_hint',
                enable: (this.state.step == STEP.LIST_BANK)
            }}
            toolbarTitleT='add_payment_card'
            hanleBack={this._handleBack}
            componentId={this.props.componentId}
            loading={this.state.loading}
        />
    }
}

export default connect(state => ({
    internationalCard: internationalTokenCardSelector(state),
    domesticCard: domesticTokenCardSelector(state)
}), { addCreditCard, getBankList, getListCard })(AddCard)