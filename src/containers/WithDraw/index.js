import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Image,
    StatusBar,
    ImageBackground
} from 'react-native'
import { Surface, Text, Toolbar, Button, Icon } from '~/src/themes/ThemeComponent'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { maskBankAccount, getElevation } from '~/src/utils'
import styles from './styles'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, SURFACE_STYLES, COLORS, SIZES, STATUS_BAR_HEIGHT }
from '~/src/themes/common'
import {SCREENS} from '~/src/constants'
import { Navigation } from 'react-native-navigation'

class WithDraw extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    _handleAction =() => {
        alert('You need help!')
    }
    
    _onPressButton = () => {
        Navigation.push(this.props.componentId, {
            component: {
                id: SCREENS.WITH_DRAW_ADD_CARD.id,
                name: SCREENS.WITH_DRAW_ADD_CARD.name,
                // passProps: {
                //     // const {headerTitle, title, image, description, buttonTitle} = this.props
                //     headerTitle: 'transaction_result',
                //     title: 'transaction_fail',
                //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bing_logo_%282016%29.svg/1280px-Bing_logo_%282016%29.svg.png',
                //     description: 'transaction_unclear',
                //     actionTitle: 'you_need_support',
                //     buttonTitle: 'go_back_home',
                //     goHome: this._handleGoHome
                // },
            }
        })
    }

    render() {
        const {headerTitle, title, image, description, buttonTitle, actionTitle} = this.props
        return (
            <Surface themeable={false} flex>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: COLORS.WHITE }}
                        titleT='with_draw_title'
                        titleStyle={{ color: COLORS.WHITE }}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    <Surface themeable={false} space40 />
                    <Surface themeable={false} containerHorizontalSpace columnStart>
                        <Text style={styles.titleStyle} white t='with_draw_description' />
                        <Surface themeable={false} space30 />
                        <Image style={{width: 200, height: 150}}
                            source={{ uri: 'http://vuoncayhoabinh.com/wp-content/uploads/2017/07/cay-thong-cong-trinh2.jpg' }}
                        />
                        <Surface themeable={false} space35 />
                        <Text white description center t='with_draw_subdescription' style={styles.description} />
                        <Surface themeable={false} space35 />
                    </Surface>
                    <Surface containerHorizontalSpace flex columnStart>
                    <Surface containerHorizontalSpace
                        style={{
                            position: 'absolute', bottom: 16, left: 0, right: 0, zIndex: 200
                        }}
                        themeable={false}
                    >
                        <Button
                            round full
                            noPadding
                            enable={true}
                            gradientButton={true}
                            t={'with_draw_btn_title'}
                        />
                    </Surface>
                    </Surface>
                </ImageBackground>
            </Surface>
        )
    }
}

export default connect(null, {})(WithDraw)