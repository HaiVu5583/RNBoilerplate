import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import { connect } from 'react-redux'
import { getTheme } from './utils'
import Ripple from 'react-native-material-ripple'
import Text from './Text'

class Button extends Component {

    render() {
        const { forwardedRef, children, style, theme, ...rest } = this.props
        const themeStyle = getTheme(theme)
        return (
            <Ripple ref={forwardedRef} {...rest}
                style={[style, { color: themeStyle.primaryColor }]}
                rippleColor={'white'}
            >
                {children}
            </Ripple>
        )
    }
}

const ConnectedButton = connect(state => ({
    theme: themeSelector(state)
}))(Button)

export default React.forwardRef((props, ref) => {
    return <ConnectedButton {...props} forwardedRef={ref} />
})