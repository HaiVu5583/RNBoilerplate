import React, { Component } from 'react';
import { Surface, Text, Toolbar, Button,
    Icon,
} from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ImageBackground, ScrollView, StatusBar, Animated, Platform,
    View, FlatList,
    Dimensions
}
from 'react-native'
import Image from 'react-native-fast-image'
import { connect } from 'react-redux'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, SURFACE_STYLES, COLORS, SIZES, STATUS_BAR_HEIGHT }
from '~/src/themes/common'
import Ripple from 'react-native-material-ripple'
import { setActiveTab } from '~/src/store/actions/ui'
import { actionTest1, actionTest2 } from '~/src/store/actions/home'
import { activeTabSelector } from '~/src/store/selectors/ui'
import FeatureBlock from '~/src/containers/Home/FeatureBlock'
import { getElevation } from '~/src/utils'
import styles from './styles'
import ItemCard from './ItemCard'

export const { width, height } = Dimensions.get('window')

class AddCard extends Component {
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
        this.scrollY = new Animated.Value(0)
        this.state = {
            activeBanner: 0
        }
        this.bankItem = {
            id: 2,
            bankImage: 'https://banner2.kisspng.com/20171216/dcc/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg',
            bankAccount: '7813737375432',
            expireDate: '09/19',
        }

        this.numberItems = 0
    }

    _handlePressSave = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.MoneySource',
            }
        })
    }

    _handlePressMoneyIn = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.Charge',
            }
        })
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

    _handlePressAccountInfo = () => {
        console.log('Pressing Account Info')
        // Navigation.pop(this.props.componentId)
        // return
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.AccountScreen',
            }
        })
    }

    _renderAccountInfoButton = () => {
        return (
            <Surface fullWidth rowCenter themeable={false} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 100 }}>
                <Ripple
                    style={{ ...SURFACE_STYLES.rowStart, ...SURFACE_STYLES.white, borderRadius: 30, paddingHorizontal: 16, height: 60, ...getElevation(4), marginBottom: 5 }}
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
    
    _renderItemFlatList = (item, index) => {
        let itemCardContainerStyle = {}
        let itemCardStyle = {}
        let itemCardImageStyle = {}
        let itemWidth = (width - SIZES.CONTAINER_HORIZONTAL_MARGIN * 2 - 20*2)/3
        
        itemCardContainerStyle = {
            width: itemWidth,
            height: 95,
            marginLeft: SIZES.CONTAINER_HORIZONTAL_MARGIN,
        }
        itemCardStyle = {
            width: itemWidth,
            height: itemWidth/1.35,
            borderRadius: 17,
        }
        itemCardImageStyle = {
            width: itemWidth - 7,
            height: (itemWidth - 7)/1.35,
            borderRadius: 15,
            marginLeft: 3.5,
        }

        if (index != this.numberItems - 1) {

        return (
            <View style={{...itemCardContainerStyle}}
                key={item.id}>
            <ItemCard iconBank = {item.iconBank}
                itemCardStyle = {itemCardStyle}
                itemCardImageStyle = {itemCardImageStyle}
                colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
            />
            </View>
        )
        } else {
            return (
                <View style={{...itemCardContainerStyle, marginRight:  SIZES.CONTAINER_HORIZONTAL_MARGIN }}
                    key={item.id}>
                <ItemCard iconBank = {item.iconBank}
                    itemCardStyle = {itemCardStyle}
                    itemCardImageStyle = {itemCardImageStyle}
                    colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                />
                </View>
            )
        }
    }

    _renderItemFlatListDomesticCard = (item, index) => {
        let itemCardContainerStyle = {}
        let itemCardStyle = {}
        let itemCardImageStyle = {}
        let itemWidth = (width - SIZES.CONTAINER_HORIZONTAL_MARGIN * 2 - 20*2)/3
        
        itemCardContainerStyle = {
            width: itemWidth,
            height: 95,
        }
        itemCardStyle = {
            width: itemWidth,
            height: itemWidth/1.35,
            borderRadius: 17,
        }
        itemCardImageStyle = {
            width: itemWidth - 7,
            height: (itemWidth - 7)/1.35,
            borderRadius: 15,
            marginLeft: 3.5,
        }
        if (index%3 == 0) {
            return (
                <View style={{...itemCardContainerStyle,
                    marginLeft: SIZES.CONTAINER_HORIZONTAL_MARGIN,
                    marginRight: 10,}}
                    key={item.id}>
                    <ItemCard iconBank = {item.iconBank}
                        itemCardStyle = {itemCardStyle}
                        itemCardImageStyle = {itemCardImageStyle}
                        colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.05)']}
                    />
                </View>
            )
        } else if (index%3 == 1) {
            return (
                <View style={{...itemCardContainerStyle, marginLeft: 10, marginRight: 10,}}
                    key={item.id}>
                    <ItemCard iconBank = {item.iconBank}
                        itemCardStyle = {itemCardStyle}
                        itemCardImageStyle = {itemCardImageStyle}
                        colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.05)']}
                    />
                </View>
            )
        } else {
            return (
                <View style={{...itemCardContainerStyle, marginLeft: 10, marginRight: SIZES.CONTAINER_HORIZONTAL_MARGIN,}}
                    key={item.id}>
                    <ItemCard iconBank = {item.iconBank}
                        itemCardStyle = {itemCardStyle}
                        itemCardImageStyle = {itemCardImageStyle}
                        colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.05)']}
                    />
                </View>
            )
        }
    }
    

    render() {
        console.log('Status Bar HEI render', -STATUS_BAR_HEIGHT)

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

        this.numberItems = items.length

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
                        titleT={'add_payment_card'}
                        titleStyle={{ color: COLORS.WHITE }}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    <Surface themeable={false} space20 />
                    <Surface themeable={false} containerHorizontalSpace>
                        <Text white description t={'add_card_hint'} />
                        <Surface themeable={false} space16 />
                    </Surface>
                    <Surface flex>
                        <Text style={styles.internationalCard} t={'international_card'} />
                        <View style={styles.actionRowFlatList}>
                            <FlatList
                                data={items}
                                renderItem={({item, index}) => this._renderItemFlatList(item, index)}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => item.id + '_' + index}
                                bounces={false}
                                style={{
                                    marginRight: 0,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                }}>
                            </FlatList>
                        </View>
                        <Text style={styles.internationalCard} t={'domestic_card'} />
                        <View style={{marginTop: 30}}>
                            <FlatList
                                    data={items}
                                    renderItem={({item, index}) => this._renderItemFlatListDomesticCard(item, index)}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => item.id + '_' + index}
                                    bounces={false}
                                    style={{
                                        marginRight: 0,
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                    }}
                                    numColumns={3}>
                                </FlatList>
                        </View>
                    </Surface>
                </ImageBackground>
            </Surface>

        )
    }
}

export default connect(state => ({
    activeTab: activeTabSelector(state)
}), { setActiveTab, actionTest1, actionTest2 })(AddCard)
