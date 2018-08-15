import React, { Component } from 'react'
import { themeSelector } from '~/src/store/selectors/Theme'
import { connect } from 'react-redux'
import { View } from 'react-native'

class ThemeView extends Component {
    render() {
        const { forwardedRef, children, ...rest } = this.props
        return (
            <View ref={forwardedRef} {...rest}>
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