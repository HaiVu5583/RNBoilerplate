import React, { Component } from 'react';
import { Surface, Text } from '~/src/themes/ThemeComponent'
import { SURFACE_STYLES } from '~/src/themes/common'
import * as Animatable from 'react-native-animatable'
import { Navigation } from 'react-native-navigation'
import { TouchableWithoutFeedback } from 'react-native'

export default class NoConnection extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    _handlePressToast = () => {
        this.animatedView && this.animatedView.fadeOut().then(endState => {
            Navigation.dismissOverlay(this.props.componentId);
        })
    }

    render() {
        return (
            <Surface flex columnEnd themeable={false}
                pointerEvents='box-none'
            >
                <Animatable.View
                    style={{
                        padding: 15,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        width: '100%',
                    }}
                    animation={'fadeIn'}
                    useNativeDriver={true}
                    duration={500}
                    ref={ref => this.animatedView = ref}
                >
                    <Text white t='no_internet_connection' />
                </Animatable.View>
            </Surface>
        )
    }
}
