import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { BackHandler, Platform, View, ScrollView, Animated, StatusBar, ImageBackground } from 'react-native'
import { Surface, Text, Icon, Button, TextInput, Toolbar } from '~/src/themes/ThemeComponent'
import { COLORS, SIZES } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import { Navigation } from 'react-native-navigation'
import { getListCard } from '~/src/store/actions/credit'
import { listCardSelector } from '~/src/store/selectors/credit'
import { ADDED_CARD_TYPE } from '~/src/constants'
import LoadingModal from '~/src/components/LoadingModal'
import { TabView, TabBar, SceneMap, PagerScroll, PagerPan } from 'react-native-tab-view'

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
            loading: false,
            index: 0,
            routes: [
                { key: 'card', title: 'Card', label: 'Card', icon: 'GB_contact' },
                { key: 'bank', title: 'Bank', label: 'Bank', icon: 'GB_email' },
            ],
        }
        this.selectedCardItem = {}
        this.scrollY = new Animated.Value(0)
    }

    _handleBack = () => {
        Navigation.pop(this.props.componentId)
        return true
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


    _renderCardTab = () => {
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

    _handleIndexChange = () => {

    }


    _renderIcon = ({ route }) => (
        <Icon name={route.icon} size={24} style={{ color: 'white' }} />
    );

    _renderTabBar = props => {
        return (
            <Surface themeable={false}>
                <Surface themeable={false} imageBackground>
                    <Surface themeable={false} containerHorizontalSpace>
                        <Surface themeable={false} fakeToolbar />
                        <Surface themeable={false} space20 />
                        <Text white description t={'money_source_hint'} />
                    </Surface>
                    <Surface themeable={false} containerHorizontalMargin flex columnEnd>
                        <TabBar
                            {...props}
                            renderIcon={this._renderIcon}
                            renderLabel={() => <View />}
                            indicatorStyle={{
                                backgroundColor: COLORS.DARK_BLUE
                            }}
                            style={{
                                width: DEVICE_WIDTH - 32,
                                backgroundColor: 'transparent'
                            }}
                        />
                    </Surface>
                </Surface>
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: COLORS.BLUE,
                    opacity: !!this.scrollY ? this.scrollY.interpolate({
                        inputRange: [0, 70],
                        outputRange: [0, 1],
                    }) : 0,
                    zIndex: -1
                }} />
            </Surface>
        )
    }

    _renderPager = (props) => {
        return (Platform.OS === 'ios') ? <PagerScroll {...props} /> : <PagerPan {...props} />
    }

    _renderContent = () => {
        return (
            <TabView
                navigationState={this.state}
                renderScene={
                    SceneMap({
                        card: this._renderCardTab,
                        bank: this._renderCardTab,
                    })
                }
                renderTabBar={this._renderTabBar}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}
                renderPager={this._renderPager}
                useNativeDriver={true}
            />
        )

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
            <Surface themeable={false} flex>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <LoadingModal visible={this.state.loading} />
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    <Animated.ScrollView
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                        )}
                        scrollEventThrottle={16}
                    >
                        <Surface themeable={false}>
                            <Surface themeable={false}>
                                {this._renderContent()}
                            </Surface>
                        </Surface>
                    </Animated.ScrollView>
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
                        titleT={'money_source'}
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
    listCard: listCardSelector(state)
}), { getListCard })(MoneySource)