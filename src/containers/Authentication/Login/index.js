import React, { Component } from 'react';
import { TextInput, Surface, Background, Text, Button } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ActivityIndicator, Platform } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import I18n from '~/src/I18n'

class Login extends Component {
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
            phone: ''
        }
    }
    render() {

        return (
            <Surface style={{ padding: 20, backgroundColor: '#256CAD', flex: 1, flexDirection: 'column' }}>
                <Surface themeable={false} fullWidth mb20>
                    <TextInput 
                        placeholder={I18n.t('phone')}
                        white
                    />
                </Surface>
                <Surface themeable={false} fullWidth mb20>
                    <Button round text={I18n.t('continue').toUpperCase()} full />
                </Surface>
            </Surface>
        )
    }
}
export default connect(null, null)(Login)
