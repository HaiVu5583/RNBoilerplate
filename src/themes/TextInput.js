import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import { TextInput } from 'react-native'

class ThemeTextInput extends Component {
    render() {
        const { forwardedRef, style, theme, ...rest } = this.props
        console.log('Text Input Props', this.props)
        const themeStyle = getTheme(theme)
        return (
            <TextInput
                {...rest}
                placeholderTextColor={themeStyle.textInputPlaceholderColor}
                style={[{color: themeStyle.textInputTextColor}, style]}
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