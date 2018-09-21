import React, { Component } from 'react';
import { Surface, Text, Toolbar, Button,
    Icon,
} from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ImageBackground, ScrollView, StatusBar, Animated, Platform,
    View, FlatList,
    Dimensions,
    TouchableOpacity
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
import LinearGradient from 'react-native-linear-gradient'

class Denominations extends Component {
    
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

    // _renderItem = ({ item, index }) => {
    //     return (
    //         <Surface themeable={false} style={{ width: DEVICE_WIDTH - 60, height: 150, justifyContent: 'center', alignItems: 'center' }}>
    //             <Surface style={{ borderRadius: 4 }} elevation={4}>
    //                 <Image
    //                     source={{ uri: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg?auto=compress&cs=tinysrgb&h=350' }}
    //                     style={{ width: DEVICE_WIDTH - 70, height: 140, borderRadius: 4 }} />
    //             </Surface>
    //         </Surface>
    //     )
    // }


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

    _renderItemFlatListDomesticCard = ({item, index}) => {
        let itemCardContainerStyle = {}
        let itemWidth = (DEVICE_WIDTH - SIZES.CONTAINER_HORIZONTAL_MARGIN * 2 - 10*(this.props.numColumns-1))/this.props.numColumns
        
        itemCardContainerStyle = {
            width: itemWidth,
            height: itemWidth/1.35,
            borderRadius: 15,
            borderColor: '#000000',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
            // ...getElevation(4),
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

        if (index%this.props.numColumns == 0) {
            return (
                <View style={{...itemCardContainerStyle, ...styles.itemStart}}
                    key={item.id}>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                            start={{ x: 0.0, y: 0.0 }}
                            end={{ x: 1.0, y: 0.0 }}
                            locations={[0.0, 1.0]}
                            // {...this._panResponder.panHandlers}
                            style={{
                                ...itemCardStyle,
                                ...SURFACE_STYLES.rowStart,
                                ...getElevation(4),
                                // marginHorizontal: 2,
                                // marginTop: 2,
                                // marginBottom: 5,
                            }}
                        >
                        <View style={itemCardImageStyle}>
                            <Text style={styles.textStyle}>{item.text}</Text>
                        </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )
        } else if (index%this.props.numColumns == 1 || index%this.props.numColumns == 2) {
            return (
                <View style={{...itemCardContainerStyle, ...styles.itemMiddle}}
                    key={item.id}>
                    <Text style={styles.textStyle}>{item.text}</Text>
                </View>
            )
        } else {
            return (
                <View style={{...itemCardContainerStyle, ...styles.itemEnd}}
                    key={item.id}>
                    <Text style={styles.textStyle}>{item.text}</Text>
                </View>
            )
        }
    }
    

    render() {
        return (
            <FlatList
                data={this.props.datas}
                renderItem={this._renderItemFlatListDomesticCard}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id + '_' + index}
                bounces={false}
                // style={{
                //     marginRight: 0,
                //     paddingTop: 0,
                //     paddingBottom: 0,
                // }}
                numColumns={this.props.numColumns}>
            </FlatList>
        )
    }
}

export default connect(state => ({
    activeTab: activeTabSelector(state)
}), { setActiveTab, actionTest1, actionTest2 })(Denominations)
