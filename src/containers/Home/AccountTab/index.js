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
                    <Text white>
                        Below is a Transform that successfully persists a Set property, which simply converts it to an array and back. In this way, the Set gets converted to an Array, which is a recognized data structure in JSON. When pulled out of the persisted store, the array gets converted back to a Set before being saved to the redux store.
                    </Text>
                </Surface>
            </Surface>
        )
    }
}

export default connect(null, null, null, { withRef: true })(AccountTab)