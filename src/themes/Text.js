import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { getTheme } from './utils'
import { getFontStyle } from '~/src/utils'
class ThemeText extends Component {

    _getPropsStyle = (propStyle) => ({
        light: getFontStyle('light'),
        medium: getFontStyle('medium'),
        bold: getFontStyle('bold'),
        regular: getFontStyle('regular'),
    })

    render() {
        const { forwardedRef, children, style, theme, themeable = true, ...rest } = this.props
        const themeStyle = getTheme(theme)
        const textThemeStyle = themeable ? { color: themeStyle.textColor } : {}
        return (
            <Text ref={forwardedRef} {...rest}
                style={[textThemeStyle, style]}
            >
                {children}
            </Text>
        )
    }
}

const ConnectedText = connect(state => ({
    theme: themeSelector(state)
}))(ThemeText)

export default React.forwardRef((props, ref) => {
    return <ConnectedText {...props} forwardedRef={ref} />
})