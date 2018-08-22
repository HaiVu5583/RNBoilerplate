import React from 'react'
import { Dimensions, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native'
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
const { width } = Dimensions.get('window')
import commonStyle, { TOOLBAR_HEIGHT } from '~/src/themes/common'
const { toolbar } = commonStyle
const styles = {}
import { Navigation } from 'react-native-navigation'

export default class Toolbar extends React.PureComponent {

    constructor(props) {
        super(props)

    }

    _onPressBack = () => {
        const { onPressIconLeft, componentId } = this.props
        if (onPressIconLeft) {
            onPressIconLeft()
            return;
        }
        if (componentId) {
            Navigation.pop(this.props.componentId)
            return;
        }
    }

    _onPressIconRight = () => {
        const { onPressIconRight } = this.props
        onPressIconRight && onPressIconRight()
    }

    render() {
        const { iconLeft, iconRight, title, style, leftButtonTitle, rightButtonTitle,
            iconStyle, themeable } = this.props


        return (
            <Surface style={[toolbar.container, style]} themeable={themeable}>
                <TouchableWithoutFeedback onPress={this._onPressBack}>
                    <Surface style={toolbar.iconLeftContainer} themeable={themeable}>
                        <Icon name={!!iconLeft ? iconLeft : 'back'} style={[toolbar.iconLeft, iconStyle]} />
                    </Surface>
                </TouchableWithoutFeedback>
                {!!title && <Text style={toolbar.title} numberOfLines={1} themeable={themeable}>{" " + title + " "}</Text>}

                {!!iconRight && <TouchableWithoutFeedback onPress={this._onPressIconRight}>
                    <Surface style={toolbar.iconRightContainer} themeable={themeable}>
                        <Icon name={iconRight} style={[toolbar.iconRight, iconStyle]} />
                    </Surface>
                </TouchableWithoutFeedback>}
            </Surface>
        )
    }
}
