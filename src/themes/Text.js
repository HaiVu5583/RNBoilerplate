import React, { Component } from 'react'
import { themeSelector, languageSelector } from '~/src/store/selectors/ui'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { getTheme } from './utils'
import { TEXT_STYLES } from '~/src/themes/common'

class ThemeText extends Component {

    render() {
        const { forwardedRef, children, style, theme, language, themeable = true, dispatch, ...rest } = this.props
        const themeStyle = getTheme(theme)
        let textThemeStyle = themeable ? [{ color: themeStyle.textColor }, style] : [style]
        for (let identifier in rest) {
            if (TEXT_STYLES[identifier] && rest[identifier]) {
                textThemeStyle.push(TEXT_STYLES[identifier])
            }
        }
        console.log('Rerender Text 1', language)
        console.log('Rerender Text 2', children)
        return (
            <Text ref={forwardedRef} {...rest}
                style={textThemeStyle}
            >
                {children}
            </Text>
        )
    }
}

const ConnectedText = connect(state => ({
    theme: themeSelector(state),
    language: languageSelector(state)
}))(ThemeText)

export default React.forwardRef((props, ref) => {
    return <ConnectedText {...props} forwardedRef={ref} />
})