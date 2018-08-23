import React, { Component } from 'react';
import { Surface, Text, Toolbar } from '~/src/themes/ThemeComponent'
import { Image } from 'react-native'
import { Navigation } from 'react-native-navigation'
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

    _renderLeftAvatar = () => {
        return (
            <Image
                source={{ uri: 'https://yt3.ggpht.com/a-/ACSszfHXWBb_x1MUBtpuEa9xBBmFVuSRdvi02bquEQ=s900-mo-c-c0xffffffff-rj-k-no' }}
                style={{ width: 40, height: 40, borderRadius: 20 }} />
        )
    }

    _handleCloseDrawer = () => {
        Navigation.mergeOptions('sideMenu', {
            sideMenu: {
                left: {
                    visible: false
                }
            }
        })
    }

    _renderLogo = () => {
        return (
            <Text center h5 white light flex>GIGA BANK</Text>
        )
    }

    render() {
        return (
            <LinearGradient
                colors={['#1B75BB', '#21426D']}
                locations={[0, 0.6]}
                style={{ flex: 1 }}>
                <Toolbar
                    themeable={false}
                    leftComponent={this._renderLeftAvatar}
                    centerComponent={this._renderLogo}
                    iconRight={'close2'}
                    onPressIconRight={this._handleCloseDrawer}
                    iconStyle={{ color: 'white' }}
                    style={{width: '100%'}}
                />


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
