import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import { COLORS, SURFACE_STYLES } from '~/src/themes/common'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'

export default class BuyCardPrice extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            number: 0
        }
    }

    getNumber = () => this.state.number

    _handlePressPlus = () => {
        const { id, onValueChange } = this.props
        this.setState({ number: this.state.number + 1 }, () => {
            onValueChange(id, this.state.number)
        })
    }

    _handlePressSubtract = () => {
        const { id, onValueChange } = this.props
        if (this.state.number > 0) {
            this.setState({ number: this.state.number - 1 }, () => {
                onValueChange(id, this.state.number)
            })
        }
    }

    render() {
        const textColor = this.state.number > 0 ? COLORS.BLUE : COLORS.DARK_GRAY
        const { valueLabel = '50.000', style } = this.props
        return (
            <Surface
                style={[styles.container, style]}
                rowStart
            >
                {(this.state.number > 0) ?
                    <LinearGradient
                        colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 1.0, y: 0.0 }}
                        locations={[0.0, 1.0]}
                        style={[
                            {
                                ...styles.valueOuter,
                                ...SURFACE_STYLES.rowCenter,
                            }
                        ]}>
                        <Surface rowCenter style={styles.valueContainer}>
                            <Text description>{valueLabel}</Text>
                        </Surface>
                    </LinearGradient>
                    :
                    <Surface themeable={false} rowCenter style={styles.valueOuter}>
                        <Surface rowCenter style={styles.valueContainer}>
                            <Text description>{valueLabel}</Text>
                        </Surface>
                    </Surface>}
                <Text style={{ flex: 1 }}></Text>
                <TouchableOpacity onPress={this._handlePressSubtract}>
                    <Icon name='GB_cycle_dash' style={styles.icon} />
                </TouchableOpacity>
                <Surface themeable={false} rowCenter style={{ width: 35 }}>
                    <Text body16 style={{ color: textColor }}>{this.state.number}</Text>
                </Surface>
                <TouchableOpacity onPress={this._handlePressPlus}>
                    <Icon name='GB_cycle_plus' style={styles.icon} />
                </TouchableOpacity>
            </Surface>
        )
    }
}