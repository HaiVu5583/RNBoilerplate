import React, { Component } from 'react';
import { Surface, Text } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { FlatList } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { getData, getTestData } from '~/src/store/actions/home'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple'

class AccountTab extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Surface themeable={false} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                <Surface themeable={false} columnCenter>
                    <Text white>AccountTab</Text>
                </Surface>
            </Surface>
        )
    }
}

export default connect(null, null, null, { withRef: true })(AccountTab)