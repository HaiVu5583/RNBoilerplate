import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { getTheme } from './utils'

class ThemeText extends Component {
    render() {
        const { forwardedRef, children, style, theme, ...rest } = this.props
        console.log('Text Props', this.props)
        const themeStyle = getTheme(theme)
        console.log('Theme Style', themeStyle)
        return (
            <Text ref={forwardedRef} {...rest}
                style={[style, { color: themeStyle.textColor }]}
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