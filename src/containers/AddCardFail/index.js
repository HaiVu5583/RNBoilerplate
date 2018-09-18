import React, { Component } from 'react';
import {
    View,
    // Text,
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

class AddCardFail extends Component {
    
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }
    
    _listBack = () => {
        alert('List back is press')
    }

    render() {
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
                        titleT={'add_card_result'}
                        titleStyle={{ color: COLORS.WHITE }}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    <Surface themeable={false} space20 />
                    <Surface themeable={false} containerHorizontalSpace flex columnStart>
                        <Text style={{fontSize: 21, fontWeight: 'bold',}} white t={'add_card_fail'} />
                        <Surface themeable={false} space30 />
                        <Image style={{width: '100%', height: 150}}
                            source={{ uri: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg' }}
                        />
                        <Surface themeable={false} space35 />
                        <Text white style={{fontSize: 20,}} t={'add_card_fail_1'} />

                        <TouchableOpacity style={styles.listBackButton}
                            onPress={this._listBack}
                        >
                            <Text style={styles.listBackText} t={'list_back'} />
                        </TouchableOpacity>
                    </Surface>
                </ImageBackground>
            </Surface>
        )
    }
}

export default connect(null, {})(AddCardFail)