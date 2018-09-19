import React, { Component } from 'react';
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import { FlatList } from 'react-native'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, COLORS, SIZES } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple'
import styles from './styles'


export default class FeatureBlock extends Component {
    constructor(props) {
        super(props)
    }


    _renderFeatureItem = ({ item, index }) => {
        return (
            <Ripple rippleColor={'white'} onPress={() => { item.onPress && item.onPress() }}>
                <Surface themeable={false} columnStart style={{ width: 100 }}>
                    <Surface themeable={false} columnCenter style={styles.roundFeature}>
                        <Icon name={item.iconName} style={{ fontSize: 32, color: item.iconColor }} />
                    </Surface>
                    <Surface themeable={false} space16 />
                    <Text center info>{item.name}</Text>
                </Surface>
            </Ripple>
        )
    }


    render() {
        const { title, showViewMore = true, data } = this.props
        return (
            <Surface themeable={false}>
                <Surface rowStart containerHorizontalSpace10 style={{ height: SIZES.BLOCK_TITLE_HEIGHT }}>
                    <Text darkBlue description bold flex>{title}</Text>
                    {!!showViewMore && <Text info blue t='view_more' />}
                </Surface>
                <Surface themeable={false} space8 />
                <FlatList
                    data={data}
                    renderItem={this._renderFeatureItem}
                    keyExtractor={item => item.id + ''}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: SIZES.CONTAINER_HORIZONTAL_SPACE10_AND_MARGIN }}
                />
            </Surface>
        )
    }
}
