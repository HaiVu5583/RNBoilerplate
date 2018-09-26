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
import {SCREEN} from '~/src/constants'

class WithDrawAddCard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }
    
    onPressCard = () => {
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
                        titleT={'add_payment_account'}
                        titleStyle={styles.titleStyle}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    <Surface themeable={false} space24 />
                    <Text description white t={'add_payment_account_description'} style={styles.description} />
                    <Surface themeable={false} space50 />
                    <Surface space30 />
                    <Surface space30>
                        <Text t={'bank'} style={styles.titleList} textTransform={String.prototype.toUpperCase}/>
                    </Surface>
                    <Surface space24 />
                    <Surface themeable={true} flex >
                        <Cards
                            datas={items}
                            numColumns={3}
                            onPress={this.onPressCard}
                        />
                    </Surface>
                </ImageBackground>
            </Surface>
        )
    }
}

export default connect(null, {})(WithDrawAddCard)