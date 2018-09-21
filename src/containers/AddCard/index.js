import React, { Component } from 'react';
import {
    Surface, Text, Toolbar
} from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ImageBackground, StatusBar, View, FlatList, WebView } from 'react-native'
import Image from 'react-native-fast-image'
import { connect } from 'react-redux'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, COLORS, SIZES } from '~/src/themes/common'
import styles from './styles'
import ItemCard from './ItemCard'
import { addCreditCard } from '~/src/store/actions/credit'
import LoadingModal from '~/src/components/LoadingModal'
import AddCardSuccess from '~/src/components/AddCardSuccess'
import AddCardFail from '~/src/components/AddCardFail'

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
        this.numberItems = 0
    }

    componentDidMount() {

    }

    _handleBackToList = () => {
        Navigation.pop(this.props.componentId)
    }

    _renderItem = ({ item, index }) => {
        return (
            <Surface themeable={false} style={{ width: DEVICE_WIDTH - 60, height: 150, justifyContent: 'center', alignItems: 'center' }}>
                <Surface style={{ borderRadius: 4 }} elevation={4}>
                    <Image
                        source={{ uri: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg?auto=compress&cs=tinysrgb&h=350' }}
                        style={{ width: DEVICE_WIDTH - 70, height: 140, borderRadius: 4 }} />
                </Surface>
            </Surface>
        )
    }

    _handlePressInternationalCard = (item) => {
        console.log('Pressing International Card', item)
        if (this.state.loading) return
        this.setState({ loading: true })
        this.props.addCreditCard(item.cardType, (err, data) => {
            console.log('Err AddCreditCard', err)
            console.log('Data AddCreditCard', data)
            if (data && data.gatewayLink) {
                this.webviewAddCardInfo = data
                console.log('Webview Card Info', this.webviewAddCardInfo)
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

        if (index != this.numberItems - 1) {

            return (
                <View style={{ ...itemCardContainerStyle }}
                    key={item.id}>
                    <ItemCard iconBank={item.iconBank}
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
                    <ItemCard iconBank={item.iconBank}
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
                    <ItemCard iconBank={item.iconBank}
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
                    <ItemCard iconBank={item.iconBank}
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
        const items = [
            {
                id: 1,
                iconBank: 'https://i1.wp.com/sysbox.com.au/wp-content/uploads/2017/06/inverted-old-visa1.png?fit: 500%2C316&ssl: 1',
                cardType: 2,
            },
            {
                id: 2,
                iconBank: 'https://banner2.kisspng.com/20171216/dcc/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg',
                cardType: 2,
            },
            {
                id: 3,
                iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg',
                cardType: 3,
            },
            {
                id: 4,
                iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg',
                cardType: 3,
            },
            {
                id: 5,
                iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg',
                cardType: 3,
            },
        ]

        this.numberItems = items.length
        return (
            <Surface themeable={false} flex>
                <Surface themeable={false} containerHorizontalSpace>
                    <Text white description t={'add_card_hint'} />
                    <Surface themeable={false} space16 />
                </Surface>
                <Surface flex>
                    <Text style={styles.internationalCard} t={'international_card'} />
                    <View style={styles.actionRowFlatList}>
                        <FlatList
                            data={items}
                            renderItem={({ item, index }) => this._renderItemFlatList(item, index)}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => item.id + '_' + index}
                            bounces={false}
                            style={{
                                marginRight: 0,
                                paddingTop: 0,
                                paddingBottom: 0,
                            }}>
                        </FlatList>
                    </View>
                    <Text style={styles.internationalCard} t={'domestic_card'} />
                    <View style={{ marginTop: 30 }}>
                        <FlatList
                            data={items}
                            renderItem={({ item, index }) => this._renderItemFlatListDomesticCard(item, index)}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => item.id + '_' + index}
                            bounces={false}
                            style={{
                                marginRight: 0,
                                paddingTop: 0,
                                paddingBottom: 0,
                            }}
                            numColumns={3}>
                        </FlatList>
                    </View>
                </Surface>
            </Surface>
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
        )
    }

    _renderAddCardSuccess = () => {
        return <AddCardSuccess onPress={this._handleBackToList}/>
    }

    _renderAddCardFail = () => {
        return <AddCardFail onPress={this._handleBackToList}/>
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
        return (
            <Surface themeable={false} flex>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <LoadingModal visible={this.state.loading} />
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: COLORS.WHITE }}
                        titleT={'add_payment_card'}
                        titleStyle={{ color: COLORS.WHITE }}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    {this._render()}
                </ImageBackground>
            </Surface>

        )
    }
}

export default connect(null, { addCreditCard })(AddCard)