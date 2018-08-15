import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import commonStyle from '~/src/themes/common'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import Ripple from 'react-native-material-ripple'
import { Text } from 'react-native'
import { getElevation } from '~/src/utils'
import Icon from '~/src/components/FontIcon'
class Button extends Component {
    render() {
        const { forwardedRef, children, style, theme, text, icon, iconStyle, ...rest } = this.props
        const themeStyle = getTheme(theme)
        return (
            <Ripple ref={forwardedRef} {...rest}
                style={[commonStyle.button, getElevation(2), style]}
                rippleColor={'white'}
            >
                {!!icon && <Icon name={icon} style={[commonStyle.buttonIcon, iconStyle]} />}
                <Text style={
                    commonStyle.buttonText
                }>{text}</Text>
            </Ripple>
        )
    }
}

const ConnectedButton = connect(state => ({
    theme: themeSelector(state)
}))(Button)

export default React.forwardRef((props, ref) => {
    return <ConnectedButton {...props} forwardedRef={ref} />
})