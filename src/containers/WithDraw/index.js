import React, { Component } from 'react'
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
import {
    ASSETS,
    DEVICE_WIDTH,
    DEVICE_HEIGHT,
    SURFACE_STYLES,
    COLORS,
    SIZES,
    STATUS_BAR_HEIGHT
} from '~/src/themes/common'
import Cards from '~/src/components/Cards'
import styles from './styles'

class WithDraw extends Component {
    
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }
    
    _onPressSearch = () => {
        alert('sEARCH is press')
    }

    render() {
        
        const items = [
            {
                id: 1,
                iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg'
            },
            {
                id: 2,
                iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg'
            },
            {
                id: 3,
                iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg'
            },
            {
                id: 4,
                iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg'
            },
            {
                id: 5,
                iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg'
            },
        ]

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
                        iconStyle={styles.iconStyle}
                        titleT={'with_draw_title'}
                        titleStyle={styles.titleStyle}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                        iconRight={'GB_search'}
                        onPressIconRight={this._onPressSearch}
                    />
                    <Surface themeable={false} space24 />
                    <Text style={styles.description} white t={'with_draw_description'} />
                    <Surface themeable={false} space50 />
                    <Surface themeable={true} flex >
                        <Surface themeable={false} space30 />
                        <Cards
                            datas={items}
                            numColumns={3}
                        />
                    </Surface>
                </ImageBackground>
            </Surface>
        )
    }
}

export default connect(null, {})(WithDraw)