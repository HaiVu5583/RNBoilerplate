import React, { Component } from 'react'
import { themeSelector, languageSelector } from '~/src/store/selectors/ui'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import { TextInput } from 'react-native'
import { Surface, Icon } from '~/src/themes/ThemeComponent'
import commonStyle, { TEXT_INPUT_STYLES } from '~/src/themes/common'
import I18n from '~/src/I18n'

class ThemeTextInput extends Component {
    render() {
        const { forwardedRef, style, textInputStyle, theme, themeable, descriptionIcon, placeholderT, placeholder, ...rest } = this.props
        const themeStyle = getTheme(theme)
        let textInputThemeStyle = themeable ?
            [{ color: themeStyle.textInputTextColor }, commonStyle.textInput.input, textInputStyle]
            : [commonStyle.textInput.input, textInputStyle]
        let placeholderTextColorTheme = themeable ? themeStyle.textInputPlaceholderColor : 'rgba(0, 0, 0, 0.4)'
        let descriptionIconStyle = themeable ?
            [{ color: themeStyle.textInputTextColor }, commonStyle.textInput.descriptionIcon]
            : [commonStyle.textInput.descriptionIcon]
        let textInputContainerStyle = [style]
        for (let identifier in rest) {
            if (TEXT_INPUT_STYLES[identifier] && rest[identifier]) {
                const { container, icon, input, placeholderColor } = TEXT_INPUT_STYLES[identifier]
                icon && descriptionIconStyle.push(icon)
                container && textInputContainerStyle.push(container)
                placeholderColor && (placeholderTextColorTheme = placeholderColor)
                input && textInputThemeStyle.push(input)
            }
        }

        return (
            <Surface themeable={false} rowStart style={textInputContainerStyle}>
                {!!descriptionIcon && <Icon name={descriptionIcon} style={descriptionIconStyle} />}
                <TextInput
                    {...rest}
                    placeholder={placeholderT ? I18n.t(placeholderT) : (placeholder || '')}
                    placeholderTextColor={placeholderTextColorTheme}
                    style={textInputThemeStyle}
                />
            </Surface>
        )
    }
}

const ConnectedTextInput = connect(state => ({
    theme: themeSelector(state),
    language: languageSelector(state)
}))(ThemeTextInput)

export default React.forwardRef((props, ref) => {
    return <ConnectedTextInput {...props} forwardedRef={ref} />
})