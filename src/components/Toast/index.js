import React, { Component } from 'react';
import { Surface, Text } from '~/src/themes/ThemeComponent'
import { SURFACE_STYLES } from '~/src/themes/common'
import * as Animatable from 'react-native-animatable'
import { Navigation } from 'react-native-navigation'
import { TouchableWithoutFeedback } from 'react-native'

export default class Toast extends Component {
    constructor(props) {
        super(props)
        this.disablePress = false
    }

    componentDidMount() {
        const { duration = 2000 } = this.props
        setTimeout(() => {
            this.animatedView && this.animatedView.fadeOut().then(endState => {
                Navigation.dismissOverlay(this.props.componentId);
            })
        }, duration)
    }

    _handlePressToast = () => {
        this.disablePress = true
        this.animatedView && this.animatedView.fadeOut().then(endState => {
            Navigation.dismissOverlay(this.props.componentId);
        })
    }

    render() {
        const { text } = this.props
        console.log('Toast Props', this.props)
        return (
            <TouchableWithoutFeedback onPress={this._handlePressToast}>
                <Surface flex columnCenter themeable={false}>
                    <Animatable.View
                        style={{
                            padding: 15,
                            borderRadius: 20,
                            margin: 20,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            ...SURFACE_STYLES.rowCenter
                        }}
                        animation={'fadeIn'}
                        useNativeDriver={true}
                        duration={500}
                        ref={ref => this.animatedView = ref}
                    >
                        <Text white center>{text}</Text>
                    </Animatable.View>
                </Surface>
            </TouchableWithoutFeedback>
        )
    }
}
