import React, { Component } from 'react';
import { Surface, Text, Toolbar, Button, Icon } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ImageBackground, ScrollView, StatusBar, Animated, Platform } from 'react-native'
import Image from 'react-native-fast-image'
import styles from './styles'
import { connect } from 'react-redux'
import { ASSETS, DEVICE_WIDTH, SURFACE_STYLES, COLORS, SIZES, STATUS_BAR_HEIGHT } from '~/src/themes/common'
import Carousel from 'react-native-snap-carousel'
import FeatureBlock from '~/src/containers/Home/FeatureBlock'
import Drawer from 'react-native-drawer'
import Sidebar from '~/src/containers/Drawer'
import { logoStep3 } from '~/src/components/Asset/LogoStep3'
import SvgUri from 'react-native-svg-uri'
import AccountInfo from '~/src/containers/Home/AccountInfo'
import I18n from '~/src/I18n'
import { showToast } from '~/src/utils'
class Home extends Component {
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

        }
        this.pageTranslateX = new Animated.Value(0)
        this.scrollY = new Animated.Value(0)
        this.state = {
            activeBanner: 0
        }
        this.bankItem = {
            id: 2,
            bankImage: 'https://banner2.kisspng.com/20171216/dcc/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg',
            bankAccount: '7813737375432',
            expireDate: '09/19',
        }
        this.bannerData = [
            'Banner 1', 'Banner 2', 'Banner 3', 'Banner 4', 'Banner 5'
        ]
        this.feature = [
            {
                id: 1,
                icon: 'map',
                name: 'Feature 1'
            },
            {
                id: 2,
                icon: 'gift-code-line',
                name: 'Feature 2'
            },
            {
                id: 3,
                icon: 'group-line',
                name: 'Feature 3'
            },
            {
                id: 4,
                icon: 'about-line',
                name: 'Feature 4'
            },
            {
                id: 5,
                icon: 'email-line',
                name: 'Feature 5'
            },
            {
                id: 6,
                icon: 'Clingmepay-line',
                name: 'Feature 6'
            },
            {
                id: 7,
                icon: 'help-line',
                name: 'Feature 7'
            }
        ]

        this.featureBlock1 = [
            {
                id: 1,
                name: 'Nạp tiền',
                iconName: 'GB_recharge',
                iconColor: '#31764A',
                onPress: this._handlePressMoneyIn
            },
            {
                id: 2,
                name: 'Tiết kiệm',
                iconName: 'GB_saving',
                iconColor: '#F7A03F',
                onPress: this._handlePressSave
            },
            {
                id: 3,
                name: 'Chuyển tiền',
                iconName: 'GB_mobile_tranfer',
                iconColor: '#464E65',
                onPress: this._handlePressTransfer
            },
            {
                id: 4,
                name: 'Nạp tiền điện thoại',
                iconName: 'GB_scratch_card',
                iconColor: '#45B1A8',
                onPress: this._showExampleToast
            },
        ]

        this.featureBlock2 = [
            {
                id: 1,
                name: 'Nạp tiền điện thoại',
                iconName: 'mobile-money-in',
                iconColor: '#F27142'
            },
            {
                id: 2,
                name: 'Thanh toán hoá đơn',
                iconName: 'bill-pay',
                iconColor: '#52B4E6'
            },

        ]
    }

    _showExampleToast = () => {
        showToast('Example Toast')
    }

    _handlePressTransfer = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.MoneyTransfer',
            }
        })
    }

    _handlePressSave = () => {
        Navigation.push(this.props.componentId, {
            component: {
                componentId: 'gigabankclient.MoneySource',
                name: 'gigabankclient.MoneySource',
            }
        })
    }

    _handlePressMoneyIn = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.Charge',
            }
        })
    }

    _handlePressHambergerIcon = () => {
        this._drawer && this._drawer.open()
    }

    _renderLogo = () => {
        return (
            <Surface themeable={false} flex rowCenter>
                <SvgUri
                    width="140"
                    height="30"
                    svgXmlData={logoStep3}
                />
            </Surface>
        )
    }

    componentDidMount() {
        if (this.scrollView && Platform.OS == 'ios') {
            this.scrollView._component.scrollTo({ x: 0, y: 1, animated: false })
            setTimeout(() => {
                this.scrollView._component.scrollTo({ x: 0, y: 0, animated: false })
            }, 10)
        }
        const { isSignUp } = this.props
        if (isSignUp) {
            showToast(I18n.t('welcome_to_gigabank'))
        }
    }

    _renderItem = ({ item, index }) => {
        return (
            <Surface themeable={false} style={{ width: SIZES.BANNER_WIDTH, height: SIZES.BANNER_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
                <Surface style={{ borderRadius: 4 }} elevation={4}>
                    <Image
                        source={{ uri: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg?auto=compress&cs=tinysrgb&h=350' }}
                        style={{ width: SIZES.BANNER_WIDTH, height: SIZES.BANNER_HEIGHT, borderRadius: 4 }} />
                </Surface>
            </Surface>
        )
    }


    _handlePressFeature = (item) => {

    }

    _handlePressAccountInfo = () => {
        console.log('Pressing Account Info')
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.AccountScreen',
            }
        })
    }

    render() {

        return (
            <Drawer
                type="overlay"
                content={<Sidebar
                    onPressClose={() => {
                        this._drawer && this._drawer.close()
                    }}
                />}
                tapToClose={true}
                acceptPan={true}
                captureGestures={true}
                openDrawerOffset={80} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                panOpenMask={0.07}
                panThreshold={0.1}
                closedDrawerOffset={- 3}
                negotiatePan={true}
                styles={
                    {
                        drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
                        main: { paddingLeft: 3, backgroundColor: 'black' },
                    }
                }
                ref={ref => this._drawer = ref}
                tweenHandler={ratio => ({
                    mainOverlay: {
                        opacity: 0.6 * ratio,
                        backgroundColor: 'black',
                    },
                })}
            >
                <Surface themeable={false} flex>
                    <StatusBar
                        backgroundColor="transparent"
                        barStyle="light-content"
                        translucent={true}
                    />
                    <Animated.ScrollView showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                        )}
                        scrollEventThrottle={16}
                        contentInset={{ top: Platform.OS == 'ios' ? -STATUS_BAR_HEIGHT : 0 }}
                        ref={ref => this.scrollView = ref}
                    >
                        <Surface style={{ height: SIZES.IMAGE_BACKGROUND_HEIGHT + SIZES.BANK_ITEM_HEIGHT / 2 }}>
                            <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: SIZES.IMAGE_BACKGROUND_HEIGHT }}>
                                <Surface themeable={false} style={{ width: '100%', height: SIZES.TOOLBAR_AND_STATUSBAR }} />
                                <Surface themeable={false} space8 />
                                <Surface themeable={false} flex columnStart>
                                    <Image
                                        source={{ uri: 'https://yt3.ggpht.com/a-/ACSszfHXWBb_x1MUBtpuEa9xBBmFVuSRdvi02bquEQ=s900-mo-c-c0xffffffff-rj-k-no' }}
                                        style={styles.avatar} />
                                </Surface>
                            </ImageBackground>
                            <AccountInfo
                                name={'HOANG THANH GIANG'}
                                money={120000}
                                onPress={this._handlePressAccountInfo}
                                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 100 }}
                            />
                            <Animated.View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 30,
                                backgroundColor: COLORS.BLUE,
                                opacity: this.scrollY.interpolate({
                                    inputRange: [0, 70],
                                    outputRange: [0, 1],
                                }),
                            }} />
                        </Surface>
                        <Surface space20 />
                        <Surface>
                            <FeatureBlock
                                title={'HAY DÙNG'}
                                data={this.featureBlock1}
                            />
                            <Surface themeable={false} space8 />
                            <Surface>
                                <Surface themeable={false} space24 />
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.bannerData}
                                    renderItem={this._renderItem}
                                    sliderWidth={DEVICE_WIDTH}
                                    itemWidth={SIZES.BANNER_WIDTH}
                                    onSnapToItem={(index) => this.setState({ activeBanner: index })}
                                    loop={false}
                                />
                                <Surface themeable={false} space24 />
                            </Surface>
                            <Surface themeable={false} space8 />
                            <FeatureBlock
                                title={'THANH TOÁN DỊCH VỤ'}
                                data={this.featureBlock2}
                            />
                            <FeatureBlock
                                title={'HAY DÙNG'}
                                data={this.featureBlock1}
                            />

                            <FeatureBlock
                                title={'THANH TOÁN DỊCH VỤ'}
                                data={this.featureBlock2}
                            />
                            <FeatureBlock
                                title={'HAY DÙNG'}
                                data={this.featureBlock1}
                            />

                            <FeatureBlock
                                title={'THANH TOÁN DỊCH VỤ'}
                                data={this.featureBlock2}
                            />

                        </Surface>
                    </Animated.ScrollView>
                    <Animated.View style={{
                        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
                        backgroundColor: COLORS.BLUE,
                        opacity: this.scrollY.interpolate({
                            inputRange: [0, 70, 71],
                            outputRange: [0, 0, 1],
                        }),
                        height: SIZES.TOOLBAR_AND_STATUSBAR
                    }}>
                    </Animated.View>
                    <Surface themeable={false} style={{
                        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 200
                    }}>
                        <Toolbar
                            themeable={false}
                            iconLeft='GB_hamburger'
                            iconRight='GB_notify'
                            onPressIconLeft={this._handlePressHambergerIcon}
                            iconStyle={{ color: 'white' }}
                            centerComponent={this._renderLogo}
                        />
                    </Surface>
                </Surface>
            </Drawer>

        )
    }
}

export default connect(null, null)(Home)
