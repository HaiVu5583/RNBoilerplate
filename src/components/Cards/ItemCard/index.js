import React, { Component } from 'react';
import {
    View,
    // Text,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Image,
} from 'react-native'
import { Surface, Text, Toolbar, Button, Icon } from '~/src/themes/ThemeComponent'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { maskBankAccount, getElevation } from '~/src/utils'
import styles from './styles'
import { SURFACE_STYLES } from '~/src/themes/common'

class ItemCard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    // itemCardStyle = {itemCardStyle}
    //             itemCardImageStyle = {itemCardImageStyle}
    render() {
        return (
            <Surface themeable={false} flex>
                <TouchableOpacity>
                    <LinearGradient
                                colors={this.props.colors}
                                start={{ x: 0.0, y: 0.0 }}
                                end={{ x: 1.0, y: 0.0 }}
                                locations={[0.0, 1.0]}
                                // {...this._panResponder.panHandlers}
                                style={{
                                    ...this.props.itemCardStyle,
                                    ...SURFACE_STYLES.rowStart,
                                    ...getElevation(4),
                                    // marginHorizontal: 2,
                                    // marginTop: 2,
                                    // marginBottom: 5,
                                }}
                            >
                        <Image
                            source={{ uri: this.props.iconBank }}
                            style={{...this.props.itemCardImageStyle}} />
                    </LinearGradient>
                </TouchableOpacity>
            </Surface>
        )
    }
}

export default connect(null, {})(ItemCard)