import React, { Component, PureComponent } from 'react'
import { themeSelector } from '~/src/store/selectors/ui'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { getTheme } from './utils'
import { SURFACE_STYLES } from '~/src/themes/common'
import { getElevation } from '~/src/utils'

class ThemeView extends PureComponent {
    render() {
        const { forwardedRef, children, style, theme, themeable = true, text, icon, elevation, ...rest } = this.props
        const themeStyle = getTheme(theme)
        const viewThemeStyle = themeable ? [{ backgroundColor: themeStyle.surfaceColor }] : []
        for (let identifier in rest) {
            if (SURFACE_STYLES[identifier] && rest[identifier]) {
                viewThemeStyle.push(SURFACE_STYLES[identifier])
            }
        }
        if (elevation) {
            viewThemeStyle.push(getElevation(elevation))
        }
        viewThemeStyle.push(style)
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