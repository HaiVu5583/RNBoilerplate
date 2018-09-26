import React, { Component, PureComponent } from 'react'
import { themeSelector } from '~/src/store/selectors/ui'
import commonStyle from '~/src/themes/common'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import Ripple from 'react-native-material-ripple'
import { Icon, Text, Surface } from '~/src/themes/ThemeComponent'
import { View } from 'react-native'
import { BUTTON_STYLES } from '~/src/themes/common'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import { getElevation } from '~/src/utils'

class Button extends PureComponent {
    static defaultProps = {
        textTransform: String.prototype.toUpperCase
    }

    render() {
        const { forwardedRef, children, style, theme, icon, iconStyle, textStyle, enable,
            buttonEnableStyle, buttonDisableStyle, buttonTextEnableStyle, buttonTextDisableStyle,
            leftComponent, rightComponent, centerComponent, innerExpand,
            t, textTransform, text,
            gradientButton = false, gradientProps = {}, gradientStyle, rippleStyle,
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
                const { textStyle, ...restButtonStyle } = BUTTON_STYLES[identifier]
                buttonThemeStyle.push(restButtonStyle)
                if (textStyle) {
                    textButtonStyle.push(textStyle)
                }
            }
        }
        buttonThemeStyle.push(style)
        const buttonTextElement = typeof (t) != 'undefined' ? <Text themeable={false} style={textButtonStyle} t={t} textTransform={textTransform} /> :
            typeof (text) != undefined ? <Text themeable={false} style={textButtonStyle}>{text}</Text> : <Surface themeable={false} />
        const center = centerComponent ? centerComponent() : (
            <Surface themeable={false} rowCenter
                expand={!!innerExpand}
            >
                {!!icon && <Icon name={icon} style={[commonStyle.buttonIcon, iconStyle]} />}
                {buttonTextElement}
            </Surface>
        )

        const ButtonComponent = enable === false ? View : Ripple
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
            buttonThemeStyle.push(
                getElevation(0)
            )
            return (
                <ButtonComponent ref={forwardedRef}
                    rippleColor={'white'}
                    style={rippleStyle}
                    {...rest}>
                    <LinearGradient
                        colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 1.0, y: 0.0 }}
                        locations={[0.0, 1.0]}
                        style={[buttonThemeStyle, gradientStyle]}
                        {...gradientProps}
                    >
                        {!!leftComponent && leftComponent()}
                        {center}
                        {!!rightComponent && rightComponent()}
                    </LinearGradient>
                </ButtonComponent>
            )
        }

        return (
            <ButtonComponent ref={forwardedRef} {...rest}
                style={buttonThemeStyle}
                rippleColor={'white'}
            >
                <Surface themeable={false} rowStart>
                    {!!leftComponent && leftComponent()}
                    {center}
                    {!!rightComponent && rightComponent()}
                </Surface>
            </ButtonComponent>
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