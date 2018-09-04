import React, { Component } from 'react';
import { Surface, Text, Toolbar, Button, Icon } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ImageBackground, FlatList } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { getData, getTestData } from '~/src/store/actions/home'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import Carousel, { Pagination } from 'react-native-snap-carousel'
const COLUMN_WIDTH = DEVICE_WIDTH / 3
import Ripple from 'react-native-material-ripple'
import HomeTab from './HomeTab'
import WalletTab from './WalletTab'
import AccountTab from './AccountTab'
import BottomTabs from './BottomTabs'
import { setActiveTab } from '~/src/store/actions/ui'
import { activeTabSelector } from '~/src/store/selectors/ui'

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
        this.props.setActiveTab(item.id)
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
                <HomeTab />
                <WalletTab />
                <AccountTab />
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
}), { setActiveTab })(Home)
