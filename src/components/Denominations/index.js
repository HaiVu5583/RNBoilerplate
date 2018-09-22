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
            itemCoverColor:
            // ['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']
            [COLORS.FEATURE_BACKGROUND, COLORS.FEATURE_BACKGROUND]
        }
        this.numberItems = this.props.datas
    }

    componentDidMount() {

    }

    _renderItemFlatListDomesticCard = ({item, index}) => {
        let itemCardContainerStyle = {}
        let itemWidth = (DEVICE_WIDTH - SIZES.CONTAINER_HORIZONTAL_MARGIN * 2 - 10*(this.props.numColumns-1))/this.props.numColumns
        
        itemCardContainerStyle = {
            width: itemWidth,
            height: itemWidth/1.35,
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
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: COLORS.WHITE,
        }

        if (index%this.props.numColumns == 0) {
            return (
                <View style={{...itemCardContainerStyle, ...styles.itemStart}}
                    key={item.id}>
                    {this._renderDomestic(item)}
                </View>
            )
        } else if (index%this.props.numColumns == 1 || index%this.props.numColumns == 2) {
            return (
                <View style={{...itemCardContainerStyle, ...styles.itemMiddle}}
                    key={item.id}>
                    {this._renderDomestic(item)}
                </View>
            )
        } else {
            return (
                <View style={{...itemCardContainerStyle, ...styles.itemEnd}}
                    key={item.id}>
                    {this._renderDomestic(item)}
                </View>
            )
        }
    }
    
    _renderDomestic = (item) => {
        return (
            <TouchableOpacity>
                <LinearGradient
                    colors={this.state.itemCoverColor}
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
        )
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