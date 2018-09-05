import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/ui'
import commonStyle from '~/src/themes/common'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import Ripple from 'react-native-material-ripple'
import { Icon, Text, Surface } from '~/src/themes/ThemeComponent'
import { BUTTON_STYLES } from '~/src/themes/common'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

class Button extends Component {
    static defaultProps = {
        textTransform: String.prototype.toUpperCase
    }

    render() {
        const { forwardedRef, children, style, theme, icon, iconStyle, textStyle, enable,
            buttonEnableStyle, buttonDisableStyle, buttonTextEnableStyle, buttonTextDisableStyle,
            leftComponent, rightComponent, centerComponent, innerExpand,
            t, textTransform, text,
            gradientButton = false, gradientProps = {},
            ...rest } = this.props
        let buttonThemeStyle = [commonStyle.button]
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
        buttonThemeStyle.push(style)
        const buttonTextElement = t ? <Text themeable={false} style={textButtonStyle} t={t} textTransform={textTransform} /> :
            text ? <Text themeable={false} style={textButtonStyle}>{text}</Text> : <Surface themeable={false} />
        const center = centerComponent ? centerComponent() : (
            <Surface themeable={false} rowCenter
                expand={!!innerExpand}
            >
                {!!icon && <Icon name={icon} style={[commonStyle.buttonIcon, iconStyle]} />}
                {buttonTextElement}
            </Surface>
        )

        if (gradientButton) {
            if (typeof (enable) === 'undefined' || enable === true) {
                buttonThemeStyle.push(
                    { opacity: 1 }
                )
            } else if (enable === false) {
                buttonThemeStyle.push(
                    { opacity: 0.45 }
                )
            }
            return (
                <Ripple ref={forwardedRef} rippleColor={'white'} {...rest}>
                    <LinearGradient
                        colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 1.0, y: 0.0 }}
                        locations={[0.0, 1.0]}
                        style={buttonThemeStyle}
                        {...gradientProps}
                    >
                        {!!leftComponent && leftComponent()}
                        {center}
                        {!!rightComponent && rightComponent()}
                    </LinearGradient>
                </Ripple>
            )
        }

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