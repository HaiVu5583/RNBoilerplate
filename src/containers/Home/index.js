import React, { Component } from 'react';
import { Surface, Background, View, Text, TextInput, Icon, Image } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ImageBackground } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { getData, getTestData } from '~/src/store/actions/home'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import Carousel, { Pagination } from 'react-native-snap-carousel'

class Home extends Component {
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
            activeBanner: 0
        }
        this.bannerData = [
            'Banner 1', 'Banner 2', 'Banner 3', 'Banner 4', 'Banner 5'
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

    render() {

        return (
            <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: '100%', height: '100%' }}>
                <Surface themeable={false} style={{ height: 40 }} />
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
                        loop={true}
                        layout={'tinder'}
                    />
                    {this.pagination}
                </Surface>
            </ImageBackground>
        );
    }
}

export default connect(null, { getData, getTestData }, null, { withRef: true })(Home)
