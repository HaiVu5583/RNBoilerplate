import React, { Component } from 'react';
import { Surface, Text, Toolbar, Button, Icon } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ImageBackground, FlatList, Animated } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple'
import HomeTab from './HomeTab'
import WalletTab from './WalletTab'
import AccountTab from './AccountTab'
import BottomTabs from './BottomTabs'
import { setActiveTab } from '~/src/store/actions/ui'
import { actionTest1, actionTest2 } from '~/src/store/actions/home'
import { activeTabSelector } from '~/src/store/selectors/ui'
import { BOTTOM_TABS } from '~/src/constants'
const NUM_OF_TABS = BOTTOM_TABS.length

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

    _handlePressBottomTabItem = (item) => {
        Animated.timing(this.pageTranslateX, {
            toValue: - (item.id - 1) * DEVICE_WIDTH,
            duration: 100,
            useNativeDriver: true
        }).start()
        this.props.setActiveTab(item.id)
    }

    componentDidMount() {
        this.props.actionTest1(1000)
        // this.props.actionTest1(1100)
        setTimeout(() => {
            this.props.actionTest2(300)
        }, 30)

    }

    render() {

        return (
            <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: '100%', height: '100%' }}>
                <Toolbar
                    themeable={false}
                    iconLeft='menu'
                    iconRight='ring'
                    onPressIconLeft={this._handlePressHambergerIcon}
                    iconStyle={{ color: 'white' }}
                    centerComponent={this._renderLogo}
                />
                <Animated.View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: DEVICE_WIDTH * NUM_OF_TABS,
                        transform: [{
                            translateX: this.pageTranslateX
                        }]
                    }}>
                    <HomeTab />
                    <WalletTab />
                    <AccountTab />
                </Animated.View>
                <Surface themeable={false} rowCenter
                    style={{ position: 'absolute', left: 0, right: 0, bottom: 10 }}>
                    <BottomTabs
                        activeTab={this.props.activeTab}
                        onPress={this._handlePressBottomTabItem} />
                </Surface>
            </ImageBackground>
        );
    }
}

export default connect(state => ({
    activeTab: activeTabSelector(state)
}), { setActiveTab, actionTest1, actionTest2 })(Home)
