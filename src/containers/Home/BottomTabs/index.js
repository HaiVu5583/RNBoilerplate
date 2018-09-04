import React, { Component } from 'react';
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { FlatList, Animated } from 'react-native'
import styles from './styles'
import { DEVICE_WIDTH, DEVICE_HEIGHT, COLORS } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple'
import LinearGradient from 'react-native-linear-gradient'
const TAB_ITEM_WIDTH = 80
import { BOTTOM_TABS } from '~/src/constants'

class BottomTabs extends Component {
    constructor(props) {
        super(props)
        this.tabActiveTranslateX = new Animated.Value(0)

    }

    _handlePressTab = (item) => {
        Animated.spring(this.tabActiveTranslateX, {
            toValue: (item.id - 1) * TAB_ITEM_WIDTH,
            bounciness: 10,
            useNativeDriver: true
        }).start()
        this.props.onPress && this.props.onPress(item)
    }

    _renderTabItem = (item) => {
        const iconColor = item.id == this.props.activeTab ? COLORS.DARK_BLUE : COLORS.WHITE
        return (
            <Ripple onPress={() => this._handlePressTab(item)} key={item.id}
                rippleColor={'white'}
                style={{
                    width: TAB_ITEM_WIDTH, height: 50, borderRadius: 25,
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    backgroundColor: COLORS.TRANSPARENT
                }}>
                <Icon themeable={false} name={item.icon} style={{
                    fontSize: 24,
                    color: iconColor
                }} />
            </Ripple>
        )
    }

    render() {
        return (
            <LinearGradient
                colors={['#1F6CAF', '#2499CF']}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 1.0 }}
                locations={[0.35, 0.65]}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: 5,
                    borderRadius: 30
                }}>
                <Animated.View
                    style={{
                        width: TAB_ITEM_WIDTH, height: 50, borderRadius: 25,
                        backgroundColor: COLORS.LIGHT_WHITE,
                        position: 'absolute',
                        top: 5,
                        left: 5,
                        bottom: 5,
                        transform: [{
                            translateX: this.tabActiveTranslateX
                        }]
                    }}
                />
                {BOTTOM_TABS.map(item => this._renderTabItem(item))}
            </LinearGradient>
        )
    }
}

export default BottomTabs