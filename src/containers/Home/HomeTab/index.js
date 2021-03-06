import React, { Component } from 'react';
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { FlatList } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { getData, getTestData } from '~/src/store/actions/home'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import Carousel, { Pagination } from 'react-native-snap-carousel'
const COLUMN_WIDTH = DEVICE_WIDTH / 3
import Ripple from 'react-native-material-ripple'

class HomeTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeBanner: 0
        }
        this.bannerData = [
            'Banner 1', 'Banner 2', 'Banner 3', 'Banner 4', 'Banner 5'
        ]
        this.feature = [
            {
                id: 1,
                icon: 'map',
                name: 'Feature 1'
            },
            {
                id: 2,
                icon: 'gift-code-line',
                name: 'Feature 2'
            },
            {
                id: 3,
                icon: 'group-line',
                name: 'Feature 3'
            },
            {
                id: 4,
                icon: 'about-line',
                name: 'Feature 4'
            },
            {
                id: 5,
                icon: 'email-line',
                name: 'Feature 5'
            },
            {
                id: 6,
                icon: 'Clingmepay-line',
                name: 'Feature 6'
            },
            {
                id: 7,
                icon: 'help-line',
                name: 'Feature 7'
            }
        ]
    }

    get pagination() {
        const { activeBanner } = this.state;
        return (
            <Pagination
                dotsLength={this.bannerData.length}
                activeDotIndex={activeBanner}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    padding: 0,
                    margin: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                dotContainerStyle={{
                    padding: 0,
                    margin: 0
                }}
                containerStyle={{
                }}

                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <Surface white themeable={false} rowCenter style={{ height: 150, borderRadius: 4 }}>
                <Text center>{item}</Text>
            </Surface>
        )
    }


    _handlePressFeature = (item) => {

    }

    _renderFeatureItem = ({ item, index }) => {
        return (
            <Ripple onPress={() => this._handlePressFeature(item)} rippleColor={'white'}>
                <Surface themeable={false} columnCenter style={{ width: COLUMN_WIDTH, paddingVertical: 20 }}>
                    <Icon white name={item.icon} style={{ color: 'white', fontSize: 24 }} />
                    <Text body2 white light>{item.name}</Text>
                </Surface>
            </Ripple>
        )
    }

    render() {
        return (
            <Surface themeable={false} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                <Surface themeable={false} style={{ height: 250 }}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.bannerData}
                        renderItem={this._renderItem}
                        sliderWidth={DEVICE_WIDTH}
                        itemWidth={DEVICE_WIDTH - 60}
                        itemHeight={150}
                        sliderHeight={150}
                        onSnapToItem={(index) => this.setState({ activeBanner: index })}
                        loop={false}
                    />
                    {this.pagination}
                </Surface>
                <FlatList
                    data={this.feature}
                    renderItem={this._renderFeatureItem}
                    keyExtractor={item => '' + item.id}
                    numColumns={3}
                />
            </Surface>
        )
    }
}

export default connect(null, { getData, getTestData }, null, { withRef: true })(HomeTab)
