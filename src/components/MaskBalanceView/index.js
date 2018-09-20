import React from 'react'
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import { SIZES, COLORS } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple';

export default class MaskBalanceView extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            masking: true
        }
    }
    _handlePressEye = () => {
        this.setState({ masking: !this.state.masking })
    }

    render() {
        const { money, style, color = COLORS.WHITE } = this.props
        const displayMoney = this.state.masking ? '\u2022 \u2022 \u2022 \u2022 \u2022 \u2022' : money
        return (
            <Surface
                themeable={false}
                rowSpacebetween
                style={[
                    {
                        paddingVertical: 16,
                        paddingLeft: SIZES.CONTAINER_HORIZONTAL_SPACE_AND_MARGIN,
                        paddingRight: SIZES.CONTAINER_HORIZONTAL_MARGIN,
                    },
                    style
                ]}>
                <Text description style={{ color }}>VNĐ | {displayMoney}</Text>
                <Ripple onPress={this._handlePressEye}>
                    <Icon name={this.state.masking ? 'GB_eye_hide' : 'GB_eye_show'}
                        style={{ fontSize: 24, marginRight: 3, color }} />
                </Ripple>
            </Surface>
        )
    }
}