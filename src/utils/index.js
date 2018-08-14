import React, { Component } from 'react'
import { Provider } from 'react-redux'

export const getHOCScreen = (Component, store) => {
    return class ScreenWrapper extends Component {
        static options = Component.options ? { ...Component.options } : {}
        render() {
            return (
                <Provider store={store}>
                    <Component {...this.props}/>
                </Provider>
            )
        }
    }
}

