import React, { Component } from 'react';
import { Surface, Text, Toolbar, Button, Icon } from '~/src/themes/ThemeComponent'
import { getFontStyle } from '~/src/utils'
import { Image, FlatList } from 'react-native'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import { connect } from 'react-redux'
import { getData, getTestData } from '~/src/store/actions/home'
import { FONT_WEIGHTS } from '~/src/themes/common'
import LinearGradient from 'react-native-linear-gradient'
import I18n from '~/src/I18n'

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

    constructor(props) {
        super(props)
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
                name: 'Logout',
                onPress: this._handleLogout
            }
        ]
    }

    _renderLeftAvatar = () => {
        return (
            <Surface themeable={false} rowStart style={{ width: 56, paddingLeft: 16 }}>
                <Image
                    source={{ uri: 'https://yt3.ggpht.com/a-/ACSszfHXWBb_x1MUBtpuEa9xBBmFVuSRdvi02bquEQ=s900-mo-c-c0xffffffff-rj-k-no' }}
                    style={{ width: 40, height: 40, borderRadius: 20 }} />
            </Surface>
        )
    }

    _handleLogout = () => {
        this.props.navigation.replace('Authentication')
    }

    _handleCloseDrawer = () => {
        this.props.navigation.closeDrawer()
    }

    _renderLogo = () => {
        return (
            <Surface themeable={false} flex rowCenter>
                <Text center h5 white bold>GIGA</Text>
                <Text center h5 white thin>BANK</Text>
            </Surface>
        )
    }

    _handlePressFeature = (item) => {
        this.props.navigation.closeDrawer()
        if (item.onPress) {
            item.onPress.call()
        }
    }

    _renderFeatureItem = ({ item, index }) => {
        return (
            <Button
                themeable={false}
                leftComponent={() => (
                    <Surface themeable={false} rowStart style={{ width: 56, paddingLeft: 16 }}>
                        <Icon white name={item.icon} style={{ color: 'white', fontSize: 24 }} />
                    </Surface>
                )}
                centerComponent={() => (
                    <Text body1 light white themeable={false}>{item.name}</Text>
                )}
                flat
                rowStart
                noPadding
                style={{ paddingLeft: 0, paddingRight: 0 }}
                onPress={() => this._handlePressFeature(item)}
            />
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
                    style={{ width: '100%' }}
                />
                <Surface themeable={false} rowStart pv20>
                    <Surface themeable={false} rowStart style={{ width: 56 }} />
                    <Surface themeable={false}>
                        <Text body2 lightWhite light>{I18n.t('account_number')}</Text>
                        <Text body1 white bold>01234 5678 9101</Text>
                    </Surface>
                </Surface>
                <FlatList
                    data={this.feature}
                    renderItem={this._renderFeatureItem}
                    keyExtractor={item => '' + item.id}
                />

                <Surface themeable={false} columnEnd flex pd20>
                    <Surface themeable={false} rowCenter>
                        <Text white light center>Version: <Text white bold> 1.0.1 </Text>Android</Text>
                    </Surface>
                </Surface>
            </LinearGradient>
        );
    }
}

export default connect(null, { getData, getTestData }, null, { withRef: true })(Drawer)
