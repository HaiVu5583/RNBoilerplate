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

class AlertScreen extends Component {

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
        console.log('lam _onPressButton')
        if (this.props.goHome) {
            console.log('lam _onPressButton 2')
            this.props.goHome()
        }
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
                        titleT={headerTitle}
                        titleStyle={{ color: COLORS.WHITE }}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    <Surface themeable={false} space40 />
                    <Surface themeable={false} containerHorizontalSpace flex columnStart>
                        <Text style={styles.titleStyle} white t={title} textTransform={String.prototype.toUpperCase} />
                        <Surface themeable={false} space30 />
                        <Image style={{width: 200, height: 150}}
                            source={{ uri: image }}
                        />
                        <Surface themeable={false} space35 />
                        <Text white description center t={description} style={styles.description} />
                        {!!actionTitle
                            && <Button flat
                                centerComponent={() => (
                                    <Text blue t={actionTitle} textTransform={String.prototype.toUpperCase} />
                                )}
                                onPress={this._handleAction}
                                style={styles.actionStyle}
                            />
                        }

                        <TouchableOpacity style={styles.listBackButton}
                            onPress={this._onPressButton}
                        >
                            <Text style={styles.listBackText} t={buttonTitle} textTransform={String.prototype.toUpperCase}/>
                        </TouchableOpacity>
                    </Surface>
                </ImageBackground>
            </Surface>
        )
    }
}

export default connect(null, {})(AlertScreen)