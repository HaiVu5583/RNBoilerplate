import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import commonStyle from '~/src/themes/common'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import Ripple from 'react-native-material-ripple'
import { Icon, Text, Surface } from '~/src/themes/ThemeComponent'
import { BUTTON_STYLES } from '~/src/themes/common'

class Button extends Component {
    render() {
        const { forwardedRef, children, style, theme, text, icon, iconStyle, textStyle, enable,
            buttonEnableStyle, buttonDisableStyle, buttonTextEnableStyle, buttonTextDisableStyle,
            leftComponent, rightComponent, innerExpand, ...rest } = this.props
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
                <Surface themeable={false} rowStart>
                    {!!leftComponent && leftComponent()}
                    <Surface themeable={false} rowCenter
                        expand={!!innerExpand}
                    >
                        {!!icon && <Icon name={icon} style={[commonStyle.buttonIcon, iconStyle]} />}
                        {!!text && <Text themeable={false} style={textButtonStyle}>{text}</Text>}
                    </Surface>
                    {!!rightComponent && rightComponent()}
                </Surface>
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