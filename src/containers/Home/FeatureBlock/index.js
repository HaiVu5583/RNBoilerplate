import React, { Component } from 'react';
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import { FlatList } from 'react-native'
// import styles from './styles'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, COLORS } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple'


export default class FeatureBlock extends Component {
    constructor(props) {
        super(props)
        console.log('Constructor FeatureBlock')
    }


    _renderFeatureItem = ({ item, index }) => {
        const { data } = this.props
        return (
            <Ripple rippleColor={'white'}>
                <Surface themeable={false} columnStart style={{ width: 100 }}>
                    <Surface themeable={false} columnCenter style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: COLORS.GRAY }}>
                        <Icon name={item.iconName} style={{ fontSize: 32, color: item.iconColor }} />
                    </Surface>
                    <Surface themeable={false} space8 />
                    <Text center info>{item.name}</Text>
                </Surface>
            </Ripple>
        )
    }


    render() {
        const { title, showViewMore = true, data } = this.props
        return (
            <Surface themeable={false}>
                <Surface rowStart containerHorizontalMargin style={{ paddingVertical: 8 }}>
                    <Text darkBlue description bold flex>{title}</Text>
                    {!!showViewMore && <Text info blue t='view_more' />}
                </Surface>
                <FlatList
                    data={data}
                    renderItem={this._renderFeatureItem}
                    keyExtractor={item => item.id + ''}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </Surface>
        )
    }
}
