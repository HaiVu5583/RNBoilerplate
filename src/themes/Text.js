import React, { Component, PureComponent } from 'react'
import { themeSelector, languageSelector } from '~/src/store/selectors/ui'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { getTheme } from './utils'
import { TEXT_STYLES } from '~/src/themes/common'
import I18n from '~/src/I18n'
import { isFunction } from '~/src/utils'
import PropTypes from 'prop-types'

class ThemeText extends PureComponent {

    render() {
        const { forwardedRef, children, style, theme, language, themeable = true, dispatch,
            t, textTransform, ...rest } = this.props
        const themeStyle = getTheme(theme)
        let textThemeStyle = themeable ? [{ color: themeStyle.textColor }] : []
        for (let identifier in rest) {
            if (TEXT_STYLES[identifier] && rest[identifier]) {
                textThemeStyle.push(TEXT_STYLES[identifier])
            }
        }
        textThemeStyle.push(style)

        if (t != null && typeof (t) != 'undefined') {
            return (
                <Text ref={forwardedRef} {...rest}
                    style={textThemeStyle}
                >
                    {isFunction(textTransform) ? textTransform.call(I18n.t(t)) : I18n.t(t)}
                </Text>
            )
        }
        return (
            <Text ref={forwardedRef} {...rest}
                style={textThemeStyle}
            >
                {children}
            </Text>
        )
    }
}

ThemeText.propTypes = {
    t: PropTypes.string,
    textTransform: PropTypes.func
}

const ConnectedText = connect(state => ({
    theme: themeSelector(state),
    language: languageSelector(state)
}))(ThemeText)

export default React.forwardRef((props, ref) => {
    return <ConnectedText {...props} forwardedRef={ref} />
})