import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import {Icon} from '~/src/themes/ThemeComponent'

class ThemeIcon extends Component {

    render() {
        const { forwardedRef, name, style, theme, themeable = true, ...rest } = this.props
        const themeStyle = getTheme(theme)
        const iconThemeStyle = themeable ? { color: themeStyle.textColor } : {}
        return (
            <Icon name={name} {...rest} style={[iconThemeStyle, style]} />
        )
    }
}

const ConnectedIcon = connect(state => ({
    theme: themeSelector(state)
}))(ThemeIcon)

export default React.forwardRef((props, ref) => {
    return <ConnectedIcon {...props} forwardedRef={ref} />
})