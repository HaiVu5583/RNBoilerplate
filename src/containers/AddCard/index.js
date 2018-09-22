import React, { Component } from 'react';
import {
    Surface, Text, Toolbar
} from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ImageBackground, StatusBar, View, FlatList, WebView, ScrollView, Animated } from 'react-native'
import { connect } from 'react-redux'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, COLORS, SIZES } from '~/src/themes/common'
import styles from './styles'
import ItemCard from './ItemCard'
import { addCreditCard, getBankList } from '~/src/store/actions/credit'
import LoadingModal from '~/src/components/LoadingModal'
import AddCardSuccess from '~/src/components/AddCardSuccess'
import AddCardFail from '~/src/components/AddCardFail'
import { internationalTokenCardSelector, domesticTokenCardSelector } from '~/src/store/selectors/credit'

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
        this.scrollY = new Animated.Value(0)
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

    _renderItemFlatList = (item, index) => {
        let itemCardContainerStyle = {}
        let itemCardStyle = {}
        let itemCardImageStyle = {}
        let itemWidth = (DEVICE_WIDTH - SIZES.CONTAINER_HORIZONTAL_MARGIN * 2 - 20 * 2) / 3

        itemCardContainerStyle = {
            width: itemWidth,
            height: 95,
            marginLeft: SIZES.CONTAINER_HORIZONTAL_MARGIN,
        }
        itemCardStyle = {
            width: itemWidth,
            height: itemWidth / 1.35,
            borderRadius: 17,
        }
        itemCardImageStyle = {
            width: itemWidth - 7,
            height: (itemWidth - 7) / 1.35,
            borderRadius: 15,
            marginLeft: 3.5,
        }

        if (index != this.props.internationalCard.length - 1) {
            return (
                <View style={{ ...itemCardContainerStyle }}
                    key={item.id}>
                    <ItemCard iconBank={item.logo}
                        itemCardStyle={itemCardStyle}
                        itemCardImageStyle={itemCardImageStyle}
                        colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                        onPress={() => this._handlePressInternationalCard(item)}
                    />
                </View>
            )
        } else {
            return (
                <View style={{ ...itemCardContainerStyle, marginRight: SIZES.CONTAINER_HORIZONTAL_MARGIN }}
                    key={item.id}>
                    <ItemCard iconBank={item.logo}
                        itemCardStyle={itemCardStyle}
                        itemCardImageStyle={itemCardImageStyle}
                        colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                    />
                </View>
            )
        }
    }

    _renderItemFlatListDomesticCard = (item, index) => {
        let itemCardContainerStyle = {}
        let itemCardStyle = {}
        let itemCardImageStyle = {}
        let itemWidth = (DEVICE_WIDTH - SIZES.CONTAINER_HORIZONTAL_MARGIN * 2 - 20 * 2) / 3

        itemCardContainerStyle = {
            width: itemWidth,
            height: 95,
        }
        itemCardStyle = {
            width: itemWidth,
            height: itemWidth / 1.35,
            borderRadius: 17,
        }
        itemCardImageStyle = {
            width: itemWidth - 7,
            height: (itemWidth - 7) / 1.35,
            borderRadius: 15,
            marginLeft: 3.5,
        }
        if (index % 3 == 0) {
            return (
                <View style={{
                    ...itemCardContainerStyle,
                    marginLeft: SIZES.CONTAINER_HORIZONTAL_MARGIN,
                    marginRight: 10,
                }}
                    key={item.id}>
                    <ItemCard iconBank={item.logo}
                        itemCardStyle={itemCardStyle}
                        itemCardImageStyle={itemCardImageStyle}
                        colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.05)']}
                    />
                </View>
            )
        } else if (index % 3 == 1) {
            return (
                <View style={{ ...itemCardContainerStyle, marginLeft: 10, marginRight: 10, }}
                    key={item.id}>
                    <ItemCard iconBank={item.logo}
                        itemCardStyle={itemCardStyle}
                        itemCardImageStyle={itemCardImageStyle}
                        colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.05)']}
                    />
                </View>
            )
        } else {
            return (
                <View style={{ ...itemCardContainerStyle, marginLeft: 10, marginRight: SIZES.CONTAINER_HORIZONTAL_MARGIN, }}
                    key={item.id}>
                    <ItemCard iconBank={item.iconBank}
                        itemCardStyle={itemCardStyle}
                        itemCardImageStyle={itemCardImageStyle}
                        colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.05)']}
                    />
                </View>
            )
        }
    }

    _renderListBank = () => {
        return (
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                )}
                scrollEventThrottle={16}
            >
                <Surface themeable={false}>
                    <Surface themeable={false} containerHorizontalSpace imageBackground>
                        <Surface themeable={false} fakeToolbar />
                        <Surface themeable={false} space20 />
                        <Text white description t={'add_card_hint'} />
                        <Animated.View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: COLORS.BLUE,
                            opacity: this.scrollY.interpolate({
                                inputRange: [0, 70],
                                outputRange: [0, 1],
                            }),
                        }} />
                    </Surface>
                    <Surface>
                        <Surface themeable={false} space20 />
                        <Surface containerHorizontalSpace>
                            <Text bold darkBlue description t={'international_card'} textTransform={String.prototype.toUpperCase} />
                        </Surface>
                        <Surface themeable={false} space20 />
                        <FlatList
                            data={this.props.internationalCard}
                            renderItem={({ item, index }) => this._renderItemFlatList(item, index)}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => item.id + '_' + index}
                            bounces={false}
                            scrollEnabled={false}
                        />
                        <Surface themeable={false} space20 />
                        <Surface containerHorizontalSpace>
                            <Text bold darkBlue description t={'domestic_card'} textTransform={String.prototype.toUpperCase} />
                        </Surface>
                        <Surface themeable={false} space20 />

                        <FlatList
                            data={this.props.domesticCard}
                            renderItem={({ item, index }) => this._renderItemFlatListDomesticCard(item, index)}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => item.id + '_' + index}
                            bounces={false}
                            numColumns={3}
                        />
                    </Surface>
                </Surface>
            </Animated.ScrollView>
        )
    }

    _onLoadWebviewAddCardStart = (e) => {
        const webviewInfo = this.webviewAddCardInfo
        if (webviewInfo && webviewInfo.successLink && e.nativeEvent.url.indexOf(webviewInfo.successLink) > -1) {
            this.setState({ step: STEP.ADD_CARD_SUCCESS })
        } else if (webviewInfo && webviewInfo.failLink && e.nativeEvent.url.indexOf(webviewInfo.failLink) > -1) {
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
        console.log('Add Card Props', this.props)
        return (
            <Surface themeable={false} flex>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <LoadingModal visible={this.state.loading} />
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    {this._render()}
                </ImageBackground>
                <Animated.View style={{
                    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
                    backgroundColor: COLORS.BLUE,
                    opacity: this.scrollY.interpolate({
                        inputRange: [0, 70, 71],
                        outputRange: [0, 0, 1],
                    }),
                    height: SIZES.TOOLBAR_AND_STATUSBAR,

                }}>
                </Animated.View>
                <Surface themeable={false} style={{
                    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 200
                }}>
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: COLORS.WHITE }}
                        titleT={'add_payment_card'}
                        titleStyle={{ color: COLORS.WHITE }}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                </Surface>
            </Surface>

        )
    }
}

export default connect(state => ({
    internationalCard: internationalTokenCardSelector(state),
    domesticCard: domesticTokenCardSelector(state)
}), { addCreditCard, getBankList })(AddCard)