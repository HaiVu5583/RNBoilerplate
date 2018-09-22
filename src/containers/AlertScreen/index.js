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

class AlertScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }
    
    _onPressButton = () => {
        if (this.props.onPressButton) {
            this.props.onPressButton()
        }
    }

    render() {
        const {headerTitle, title, image, description, buttonTitle} = this.props
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
                        titleT={headerTitle}
                        titleStyle={{ color: COLORS.WHITE }}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    <Surface themeable={false} space20 />
                    <Surface themeable={false} containerHorizontalSpace flex columnStart>
                        <Text style={{fontSize: 21, fontWeight: 'bold',}} white t={title} />
                        <Surface themeable={false} space30 />
                        <Image style={{width: '100%', height: 150}}
                            source={{ uri: image }}
                        />
                        <Surface themeable={false} space35 />
                        <Text white style={{fontSize: 20,}} t={description} />

                        <TouchableOpacity style={styles.listBackButton}
                            onPress={this._onPressButton}
                        >
                            <Text style={styles.listBackText} t={'buttonTitle'} />
                        </TouchableOpacity>
                    </Surface>
                </ImageBackground>
            </Surface>
        )
    }
}

export default connect(null, {})(AlertScreen)