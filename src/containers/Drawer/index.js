import React, { Component } from 'react';
import { Surface, Text, Toolbar, Button, Icon } from '~/src/themes/ThemeComponent'
import { getFontStyle } from '~/src/utils'
import { Image, FlatList } from 'react-native'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import { connect } from 'react-redux'
import { COLORS } from '~/src/themes/common'
import LinearGradient from 'react-native-linear-gradient'
import RowItem from '~/src/components/RowItem'
import { logoStep3 } from '~/src/components/Asset/LogoStep3'
import SvgUri from 'react-native-svg-uri'
import { logout } from '~/src/store/actions/common'

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
                icon: 'GB_account-balance',
                name: 'Feature 1'
            },
            {
                id: 2,
                icon: 'GB_account-balance',
                name: 'Feature 2'
            },
            {
                id: 3,
                icon: 'GB_account-balance',
                name: 'Feature 3'
            },
            {
                id: 4,
                icon: 'GB_account-balance',
                name: 'Feature 4'
            },
            {
                id: 5,
                icon: 'GB_account-balance',
                name: 'Feature 5'
            },
            {
                id: 6,
                icon: 'GB_account-balance',
                name: 'Feature 6'
            },
            {
                id: 7,
                icon: 'GB_account-balance',
                name: 'Logout'
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

    _handleCloseDrawer = () => {
        this.props.onPressClose && this.props.onPressClose()
    }

    _renderLogo = () => {
        return (
            <Surface themeable={false} flex rowCenter>
                <SvgUri
                    width="90"
                    height="40"
                    svgXmlData={logoStep3}
                />
            </Surface>
        )
    }

    _handlePressFeature = (item) => {
        if (item.id == 7) {
            this.props.onPressClose && this.props.onPressClose()
            this.props.logout()
            Navigation.setStackRoot('mainStack',
                {
                    component: {
                        name: 'gigabankclient.Authentication',
                    }
                }
            )
        }
    }

    _renderFeatureItem = ({ item, index }) => {
        return (
            <RowItem
                icon={item.icon}
                text={item.name}
                onPress={() => this._handlePressFeature(item)}
                iconStyle={{ color: COLORS.WHITE }}
                textStyle={{ color: COLORS.WHITE }}
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
                    leftComponent={this._renderLogo}
                    iconRight={'GB_close'}
                    onPressIconRight={this._handleCloseDrawer}
                    iconStyle={{ color: 'white' }}
                    style={{ width: '100%' }}
                />
                <FlatList
                    data={this.feature}
                    renderItem={this._renderFeatureItem}
                    keyExtractor={item => '' + item.id}
                />

                <Surface themeable={false} columnEnd flex pd20>
                    <Surface themeable={false} rowCenter>
                        <Text white description light center>Version: <Text white bold> 1.0.1 </Text>Android</Text>
                    </Surface>
                </Surface>
            </LinearGradient>
        );
    }
}

export default connect(null, { logout }, null, { withRef: true })(Drawer)
