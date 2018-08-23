import React from 'react'
import { Dimensions, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native'
import { Surface, Text, Icon, Button } from '~/src/themes/ThemeComponent'
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

        {/* <TouchableWithoutFeedback onPress={this._onPressBack}>
                    <Surface style={toolbar.iconLeftContainer} themeable={themeable}>
                        <Icon name={!!iconLeft ? iconLeft : 'back'} style={[toolbar.iconLeft, iconStyle]} />
                    </Surface>
                </TouchableWithoutFeedback> */}
        {/* {!!iconRight && <TouchableWithoutFeedback onPress={this._onPressIconRight}>
                    <Surface style={toolbar.iconRightContainer} themeable={themeable}>
                        <Icon name={iconRight} style={[toolbar.iconRight, iconStyle]} />
                    </Surface>
                </TouchableWithoutFeedback>} */}

        return (
            <Surface style={[toolbar.container, style]} themeable={themeable}>


                <Button themeable={themeable} flat onPress={this._onPressBack}
                    style={toolbar.iconLeftContainer}
                    icon={!!iconLeft ? iconLeft : 'back'}
                    iconStyle={[toolbar.iconLeft, iconStyle]}
                />

                {!!title ?
                    <Text style={toolbar.title} numberOfLines={1} themeable={themeable}>{" " + title + " "}</Text>
                    :
                    <Surface themeable={themeable} flex />
                }




                {!!iconRight &&
                    <Button themeable={themeable} flat onPress={this._onPressIconRight}
                        style={toolbar.iconRightContainer}
                        icon={iconRight}
                        iconStyle={[toolbar.iconRight, iconStyle]}
                    />
                }
            </Surface>
        )
    }
}
