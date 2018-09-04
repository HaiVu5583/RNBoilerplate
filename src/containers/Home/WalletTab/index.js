import React, { Component } from 'react';
import { Surface, Text } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { FlatList } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { getData, getTestData } from '~/src/store/actions/home'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple'

class WalletTab extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Surface themeable={false} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                <Surface themeable={false} columnCenter>
                    <Text white>WalletTab</Text>
                    <Text white>
                        When the state object gets persisted, it first gets serialized with JSON.stringify(). If parts of your state object are not mappable to JSON objects, the serialization process may transform these parts of your state in unexpected ways. For example, the javascript Set type does not exist in JSON. When you try to serialize a Set via JSON.stringify(), it gets converted to an empty object. Probably not what you wan
                    </Text>
                </Surface>
            </Surface>
        )
    }
}

export default connect(null, null, null, { withRef: true })(WalletTab)