import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import { TextInput } from 'react-native'
import { TEXT_INPUT_STYLES } from '~/src/themes/common'

class ThemeTextInput extends Component {
    render() {
        const { forwardedRef, style, theme, themeable, ...rest } = this.props
        const themeStyle = getTheme(theme)
        let textThemeStyle = themeable ? [{ color: themeStyle.textInputTextColor }, style] : [style]
        let placeholderTextColorTheme = themeable ? themeStyle.textInputPlaceholderColor : 'rgba(0, 0, 0, 0.4)'
        for (let identifier in rest) {
            if (TEXT_INPUT_STYLES[identifier] && rest[identifier]) {
                const { placeholderTextColor, ...restTextInputSyle } = TEXT_INPUT_STYLES[identifier]
                textThemeStyle.push(restTextInputSyle)
                if (placeholderTextColor) {
                    placeholderTextColorTheme = placeholderTextColor
                }
            }
        }

        return (
            <TextInput
                {...rest}
                placeholderTextColor={placeholderTextColorTheme}
                style={textThemeStyle}
            />
        )
    }
}

const ConnectedTextInput = connect(state => ({
    theme: themeSelector(state)
}))(ThemeTextInput)

export default React.forwardRef((props, ref) => {
    return <ConnectedTextInput {...props} forwardedRef={ref} />
})