import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { getTheme } from './utils'
import { SURFACE_STYLES } from '~/src/themes/common'

class ThemeView extends Component {
    render() {
        const { forwardedRef, children, style, theme, themeable = true, text, icon, ...rest } = this.props
        const themeStyle = getTheme(theme)
        const viewThemeStyle = themeable ? [{ backgroundColor: themeStyle.surfaceColor }, style] : [style]
        for (let identifier in rest) {
            if (SURFACE_STYLES[identifier]) {
                viewThemeStyle.push(SURFACE_STYLES[identifier])
            }
        }
        return (
            <View ref={forwardedRef} {...rest}
                style={viewThemeStyle}
            >
                {children}
            </View>
        )
    }
}

const ConnectedView = connect(state => ({
    theme: themeSelector(state)
}))(ThemeView)

export default React.forwardRef((props, ref) => {
    return <ConnectedView {...props} forwardedRef={ref} />
})