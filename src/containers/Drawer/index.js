import React, { Component } from 'react';
import { Surface, Background, View, Text, TextInput, Icon, Image } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ImageBackground } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { getData, getTestData } from '~/src/store/actions/home'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import LinearGradient from 'react-native-linear-gradient'

class Drawer extends Component {
    static get options() {
        return {
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false
            }
        };
    }


    render() {
        return (
            <LinearGradient
                colors={['#1B75BB', '#21426D']}
                locations={[0, 0.6]}
                style={{ flex: 1 }}>
                <Surface themeable={false} columnEnd>
                    <Surface themeable={false} rowCenter>
                        <Text white light center>Version: <Text white bold> 1.0.1 </Text>Android</Text>
                    </Surface>
                </Surface>
            </LinearGradient>
        );
    }
}

export default connect(null, { getData, getTestData }, null, { withRef: true })(Drawer)
