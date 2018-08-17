import React from 'react'
import { Dimensions, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native'
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
const { width } = Dimensions.get('window')
import commonStyle, { TOOLBAR_HEIGHT } from '~/src/themes/common'
const { toolbar } = commonStyle
const styles = {}

export default class Toolbar extends React.PureComponent {

    constructor(props) {
        super(props)

    }

    _onPressBack = () => {
        const { onPressIconLeft } = this.props
        if (onPressIconLeft)
            onPressIconLeft()
    }

    _onPressIconRight = () => {
        const { onPressIconRight } = this.props
        onPressIconRight && onPressIconRight()
    }

    render() {
        const { iconLeft, iconRight, iconColor, title, style, leftButtonTitle, rightButtonTitle,
            leftButtonColor, rightButtonColor, rightButtonState, iconRightStyle, titleFontSize } = this.props
        const iconStyle = {}
        // const iconStyle = iconColor ? { ...styles.icon, color: iconColor } : styles.icon
        // const leftBtnStyle = leftButtonColor ? { ...styles.leftButton, color: leftButtonColor } : styles.leftButton
        // let rightBtnSyle = rightButtonColor ? { ...styles.rightButtonDisable, color: rightButtonColor } : styles.rightButtonDisable

        if (rightButtonState && !rightButtonColor) {
            rightBtnSyle = { ...styles.rightButtonDisable, color: linkColor }
        }

        return (
            <Surface style={[toolbar.container, style]}>
                <TouchableWithoutFeedback onPress={this._onPressBack}>
                    <Surface style={toolbar.iconLeftContainer}>
                        <Icon name={!!iconLeft ? iconLeft : 'back'} style={toolbar.iconLeft} />
                    </Surface>
                </TouchableWithoutFeedback>
                {!!title && <Text style={toolbar.title} numberOfLines={1}>{" " + title + " "}</Text>}

                {!!iconRight && <TouchableWithoutFeedback onPress={this._onPressIconRight}>
                    <Surface style={toolbar.iconRightContainer}>
                        <Icon name={iconRight} style={toolbar.iconRight} />
                    </Surface>
                </TouchableWithoutFeedback>}
            </Surface>
        )
    }
}
