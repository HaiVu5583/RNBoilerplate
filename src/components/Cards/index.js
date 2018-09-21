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

class Cards extends Component {
    
    constructor(props) {
        super(props)
        this.state = {

        }
        this.numberItems = this.props.datas
    }

    // _handlePressSave = () => {
    //     Navigation.push(this.props.componentId, {
    //         component: {
    //             name: 'gigabankclient.MoneySource',
    //         }
    //     })
    // }

    // _handlePressMoneyIn = () => {
    //     Navigation.push(this.props.componentId, {
    //         component: {
    //             name: 'gigabankclient.Charge',
    //         }
    //     })
    // }


    componentDidMount() {
        // this.props.actionTest1(1000)
        // // this.props.actionTest1(1100)
        // setTimeout(() => {
        //     this.props.actionTest2(300)
        // }, 30)

    }

    _renderItem = ({ item, index }) => {
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
        // Navigation.push('mainStack', {
        //     component: {
        //         name: 'gigabankclient.AccountScreen',
        //     }
        // })
    }

    // _renderAccountInfoButton = () => {
    //     return (
    //         <Surface fullWidth rowCenter themeable={false} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 100 }}>
    //             <Ripple
    //                 style={{ ...SURFACE_STYLES.rowStart, ...SURFACE_STYLES.white, borderRadius: 30, paddingHorizontal: 16, height: 60, ...getElevation(4), marginBottom: 5 }}
    //                 rippleColor={'white'}
    //                 onPress={this._handlePressAccountInfo}
    //             >
    //                 <Icon name='GB_icon-24' style={{ fontSize: 24, color: 'gray' }} />
    //                 <Surface style={{ paddingHorizontal: 16 }}>
    //                     <Text description bold>HOANG THANH GIANG</Text>
    //                     <Text description>VND | ****</Text>
    //                 </Surface>
    //                 <Icon name='GB_icon-22' style={{ fontSize: 24, color: 'gray' }} />
    //             </Ripple>
    //         </Surface>
    //     )
    // }

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
        return (
            <FlatList
                data={this.props.datas}
                renderItem={({item, index}) => this._renderItemFlatListDomesticCard(item, index)}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id + '_' + index}
                bounces={false}
                style={{
                    marginRight: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                }}
                numColumns={this.props.numColumns}>
            </FlatList>
        )
    }
}

export default connect(state => ({
    activeTab: activeTabSelector(state)
}), { setActiveTab, actionTest1, actionTest2 })(Cards)
