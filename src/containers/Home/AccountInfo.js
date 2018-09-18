import React, { Component } from 'react';
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import Ripple from 'react-native-material-ripple'
import { SURFACE_STYLES } from '~/src/themes/common'
import I18n from '~/src/I18n'
import { getElevation } from '~/src/utils'

export default class AccountInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showingMoney: false
        }
    }

    _handlePressShowHideIcon = () => {
        this.setState({ showingMoney: !this.state.showingMoney })
    }

    render() {
        const { name, money, style, onPress } = this.props
        return (
            <Surface fullWidth rowCenter themeable={false} style={style}>
                <Surface
                    style={{ ...SURFACE_STYLES.rowStart, ...SURFACE_STYLES.white, borderRadius: 30, paddingHorizontal: 16, height: 60, ...getElevation(4), marginBottom: 5 }}
                >
                    <Ripple onPress={this._handlePressShowHideIcon}>
                        <Icon name={this.state.showingMoney ? 'GB_icon-23' : 'GB_icon-24'} style={{ fontSize: 24, color: 'gray' }} />
                    </Ripple>
                    <Ripple
                        rippleColor={'white'}
                        onPress={onPress}
                        style={{ ...SURFACE_STYLES.rowStart }}
                    >
                        <Surface style={{ paddingHorizontal: 16 }}>
                            <Text description bold>{name}</Text>
                            <Text description>{I18n.t('VND')} | {this.state.showingMoney ? money : '\u2022 \u2022 \u2022 \u2022 \u2022 \u2022'}</Text>
                        </Surface>
                        <Icon name='GB_icon-22' style={{ fontSize: 24, color: 'gray' }} />
                    </Ripple>
                </Surface>
            </Surface>
        )
    }
}
