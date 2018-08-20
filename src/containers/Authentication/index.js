import React, { Component } from 'react';
import { Surface, Background, Text, Button } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ActivityIndicator, Platform } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import I18n from '~/src/I18n'

class Authentication extends Component {
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
        }
    }

    _handlePressLogin = () => {
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.Login'
            }
        })
    }

    _handlePressRegister = () => {
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.Register'
            }
        })
    }

    render() {

        return (
            <Surface blue flex style={{ padding: 20 }}>
                <Surface themeable={false} columnEnd flex>
                    <Surface themeable={false} fullWidth mb20>
                        <Button round full
                            text={I18n.t('register_account').toUpperCase()}
                            onPress={this._handlePressRegister}
                        />
                    </Surface>
                    <Surface themeable={false} rowSpacebetween fullWidth>
                        <Text white>{I18n.t('already_have_account')}</Text>
                        <Button flat
                            text={I18n.t('login').toUpperCase()}
                            textStyle={{ color: '#38A5DA' }}
                            onPress={this._handlePressLogin}
                        />
                    </Surface>
                </Surface>
            </Surface>
        )
    }
}
export default connect(null, null)(Authentication)
