import React, { Component } from 'react'
import { themeSelector, languageSelector } from '~/src/store/selectors/ui'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { Surface, Icon } from '~/src/themes/ThemeComponent'
import commonStyle, { TEXT_INPUT_STYLES } from '~/src/themes/common'
import I18n from '~/src/I18n'

class ThemeTextInput extends Component {

    _handlePressIconRight = () => {
        this.props.onPressIconRight && this.props.onPressIconRight()
    }

    render() {
        const { forwardedRef, style, textInputStyle, theme, themeable, descriptionIcon, iconRight, placeholderT, placeholder, showIconRight = true, ...rest } = this.props
        const themeStyle = getTheme(theme)
        let textInputThemeStyle = themeable ?
            [{ color: themeStyle.textInputTextColor }, commonStyle.textInput.input, textInputStyle]
            : [commonStyle.textInput.input, textInputStyle]
        let placeholderTextColorTheme = themeable ? themeStyle.textInputPlaceholderColor : 'rgba(0, 0, 0, 0.4)'
        let descriptionIconStyle = themeable ?
            [{ color: themeStyle.textInputTextColor }, commonStyle.textInput.descriptionIcon]
            : [commonStyle.textInput.descriptionIcon]
        let iconRightStyle = themeable ?
            [{ color: themeStyle.textInputTextColor }, commonStyle.textInput.iconRight]
            : [commonStyle.textInput.iconRight]

        let textInputContainerStyle = [commonStyle.textInput.textInputContainer, style]
        for (let identifier in rest) {
            if (TEXT_INPUT_STYLES[identifier] && rest[identifier]) {
                const { container, icon, input, placeholderColor } = TEXT_INPUT_STYLES[identifier]
                if (icon) {
                    descriptionIconStyle.push(icon)
                    iconRightStyle.push(icon)
                }
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
                {!!iconRight && !!showIconRight && <TouchableOpacity onPress={this._handlePressIconRight}>
                    <View style={commonStyle.textInput.iconRightContainer}>
                        <Icon name={iconRight} style={iconRightStyle} />
                    </View>
                </TouchableOpacity>}
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