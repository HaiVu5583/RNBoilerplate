import React, { Component } from 'react';
import { Surface, Text, Toolbar, Button, Icon } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ImageBackground, FlatList, Animated, ScrollView, StatusBar } from 'react-native'
import Image from 'react-native-fast-image'
import styles from './styles'
import { connect } from 'react-redux'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, SURFACE_STYLES } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple'
import { setActiveTab } from '~/src/store/actions/ui'
import { actionTest1, actionTest2 } from '~/src/store/actions/home'
import { activeTabSelector } from '~/src/store/selectors/ui'
import Carousel from 'react-native-snap-carousel'
const COLUMN_WIDTH = DEVICE_WIDTH / 3
import FeatureBlock from '~/src/containers/Home/FeatureBlock'

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
        this.state = {
            activeBanner: 0
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
                iconName: 'money-in',
                iconColor: '#31764A'
            },
            {
                id: 2,
                name: 'Tiết kiệm',
                iconName: 'save',
                iconColor: '#C8A57B'
            },
            {
                id: 3,
                name: 'Chuyển tiền',
                iconName: 'money-tranfer',
                iconColor: '#3F4E6F'
            },
            {
                id: 4,
                name: 'Nạp tiền điện thoại',
                iconName: 'mobile-money-in',
                iconColor: '#45B1A8'
            },

        ]
    }

    _handlePressHambergerIcon = () => {
        Navigation.mergeOptions('sideMenu', {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        })
    }

    _renderLogo = () => {
        return (
            <Surface themeable={false} flex rowCenter>
                <Text center h5 white bold>GIGA</Text>
                <Text center h5 white thin>BANK</Text>
            </Surface>
        )
    }

    componentDidMount() {
        this.props.actionTest1(1000)
        // this.props.actionTest1(1100)
        setTimeout(() => {
            this.props.actionTest2(300)
        }, 30)

    }

    _renderItem = ({ item, index }) => {
        {/* <Surface white themeable={false} rowCenter style={{ height: 150, borderRadius: 4, ...getElevation(4) }}>
                <Text center>{item}</Text>
            </Surface> */}
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


    _handlePressFeature = (item) => {

    }

    _renderFeatureItem = ({ item, index }) => {
        return (
            <Ripple onPress={() => this._handlePressFeature(item)} rippleColor={'white'}>
                <Surface themeable={false} columnCenter style={{ width: COLUMN_WIDTH, paddingVertical: 20 }}>
                    <Icon white name={item.icon} style={{ color: 'white', fontSize: 24 }} />
                    <Text body2 white light>{item.name}</Text>
                </Surface>
            </Ripple>
        )
    }

    _handlePressAccountInfo = () => {
        console.log('Pressing Account Info')
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.AccountScreen',
            }
        })
    }

    _renderAccountInfoButton = () => {
        return (
            <Surface fullWidth rowCenter themeable={false} style={{ position: 'absolute', left: 0, right: 0, bottom: 5 }}>
                <Ripple
                    elevation={4}
                    style={{ ...SURFACE_STYLES.rowStart, ...SURFACE_STYLES.white, borderRadius: 30, paddingHorizontal: 16, height: 60 }}
                    rippleColor={'white'}
                    onPress={this._handlePressAccountInfo}
                >
                    <Icon name='GB_icon-24' style={{ fontSize: 24, color: 'gray' }} />
                    <Surface style={{ paddingHorizontal: 16 }}>
                        <Text description bold>HOANG THANH GIANG</Text>
                        <Text description>VND | ****</Text>
                    </Surface>
                    <Icon name='GB_icon-22' style={{ fontSize: 24, color: 'gray' }} />
                </Ripple>
            </Surface>
        )
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <Surface style={{ height: 210 }}>
                    <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: 180 }}>
                        <Toolbar
                            themeable={false}
                            iconLeft='GB_icon-25'
                            iconRight='GB_icon-26'
                            onPressIconLeft={this._handlePressHambergerIcon}
                            iconStyle={{ color: 'white' }}
                            centerComponent={this._renderLogo}
                        />
                        <Surface themeable={false} columnCenter>
                            <Image
                                source={{ uri: 'https://yt3.ggpht.com/a-/ACSszfHXWBb_x1MUBtpuEa9xBBmFVuSRdvi02bquEQ=s900-mo-c-c0xffffffff-rj-k-no' }}
                                style={{ width: 60, height: 60, borderRadius: 30 }} />
                        </Surface>
                    </ImageBackground>
                    {this._renderAccountInfoButton()}
                </Surface>
                <Surface flex>
                    <Surface space8 />
                    <Surface style={{ height: 150 }}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.bannerData}
                            renderItem={this._renderItem}
                            sliderWidth={DEVICE_WIDTH}
                            itemWidth={DEVICE_WIDTH - 60}
                            onSnapToItem={(index) => this.setState({ activeBanner: index })}
                            loop={false}
                        />
                    </Surface>
                    <Surface space8 />

                    <FeatureBlock
                        title={'HAY DÙNG'}
                        data={this.featureBlock1}
                    />
                </Surface>
            </ScrollView>

        );
    }
}

export default connect(state => ({
    activeTab: activeTabSelector(state)
}), { setActiveTab, actionTest1, actionTest2 })(Home)
