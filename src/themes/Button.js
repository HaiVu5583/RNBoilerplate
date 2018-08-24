import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/ui'
import commonStyle from '~/src/themes/common'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import Ripple from 'react-native-material-ripple'
import { Icon, Text, Surface } from '~/src/themes/ThemeComponent'
import { BUTTON_STYLES } from '~/src/themes/common'
import PropTypes from 'prop-types'

class Button extends Component {
    static defaultProps = {
        textTransform: String.prototype.toUpperCase
    }
    
    render() {
        const { forwardedRef, children, style, theme, icon, iconStyle, textStyle, enable,
            buttonEnableStyle, buttonDisableStyle, buttonTextEnableStyle, buttonTextDisableStyle,
            leftComponent, rightComponent, centerComponent, innerExpand,
            t, textTransform, text, ...rest } = this.props
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
        const center = centerComponent ? centerComponent() : (
            <Surface themeable={false} rowCenter
                expand={!!innerExpand}
            >
                {!!icon && <Icon name={icon} style={[commonStyle.buttonIcon, iconStyle]} />}
                {!!t && <Text themeable={false} style={textButtonStyle} t={t} textTransform={textTransform} />}
            </Surface>
        )

        return (
            <Ripple ref={forwardedRef} {...rest}
                style={buttonThemeStyle}
                rippleColor={'white'}
            >
                <Surface themeable={false} rowStart>
                    {!!leftComponent && leftComponent()}
                    {center}
                    {!!rightComponent && rightComponent()}
                </Surface>
            </Ripple>
        )
    }
}

Button.propTypes = {
    t: PropTypes.string,
    textTransform: PropTypes.func
}

const ConnectedButton = connect(state => ({
    theme: themeSelector(state)
}))(Button)

export default React.forwardRef((props, ref) => {
    return <ConnectedButton {...props} forwardedRef={ref} />
})