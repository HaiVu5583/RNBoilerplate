import React, { Component } from 'react';
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import Ripple from 'react-native-material-ripple'
import { COLORS } from '~/src/themes/common'

export default class RowItem extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const { icon, text, textT, onPress, iconStyle, textStyle } = this.props
        return (
            <Ripple onPress={onPress}>
                <Surface themeable={false} rowStart style={{ paddingHorizontal: 16 }}>
                    <Icon name={icon} style={[{ fontSize: 24, paddingRight: 16 }, iconStyle]} />
                    <Surface themeable={false} flex rowStart style={{
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.BLUE,
                        paddingVertical: 16
                    }}>
                        {!!textT ?
                            <Text description style={textStyle} t={textT} /> :
                            <Text description style={textStyle}>{text}</Text>}
                    </Surface>
                </Surface>
            </Ripple>
        )
    }
}
