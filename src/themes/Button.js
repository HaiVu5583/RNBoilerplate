import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import commonStyle from '~/src/themes/common'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import Ripple from 'react-native-material-ripple'
import { Text } from 'react-native'
import { Icon } from '~/src/themes/ThemeComponent'
import { BUTTON_STYLES } from '~/src/themes/common'

class Button extends Component {
    render() {
        const { forwardedRef, children, style, theme, text, icon, iconStyle, textStyle, enable,
            buttonEnableStyle, buttonDisableStyle, buttonTextEnableStyle, buttonTextDisableStyle,
            ...rest } = this.props
        let buttonThemeStyle = [commonStyle.button, style]
        let textButtonStyle = [commonStyle.buttonText, textStyle]
        if (enable != null && typeof (enable) != 'undefined') {
            if (!enable) {
                buttonThemeStyle = [...buttonThemeStyle, commonStyle.buttonDisable, buttonDisableStyle]
                textButtonStyle = [...textButtonStyle, commonStyle.buttonTextDisable, buttonTextDisableStyle]
            } else {
                buttonThemeStyle = [...buttonThemeStyle, buttonEnableStyle]
                textButtonStyle = [...textButtonStyle, buttonTextEnableStyle]
            }
        }
        for (let identifier in rest) {
            if (BUTTON_STYLES[identifier]) {
                buttonThemeStyle.push(BUTTON_STYLES[identifier])
            }
        }
        
        return (
            <Ripple ref={forwardedRef} {...rest}
                style={buttonThemeStyle}
                rippleColor={'white'}
            >
                {!!icon && <Icon name={icon} style={[commonStyle.buttonIcon, iconStyle]} />}
                <Text style={textButtonStyle}>{text}</Text>
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