import React from 'react'
import { Dimensions, TouchableWithoutFeedback } from 'react-native'
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


        let titleStyle = { ...styles.title, flex: 1, maxWidth: width - 90, textAlign: 'center', fontSize: 20 }

        // if (titleFontSize) {
        //     titleStyle = { ...titleStyle, fontSize: titleFontSize }
        // }

        return (
            <Surface style={[toolbar.container ,style]}>
                <TouchableWithoutFeedback onPress={this._onPressBack}>
                    <Surface style={toolbar.iconLeftContainer}>
                        {/* {!!leftButtonTitle ?
                            (<Text style={leftBtnStyle}>{leftButtonTitle}</Text>)
                            : (<Icon name={!!iconLeft ? iconLeft : 'back'} style={iconStyle} />)
                        } */}
                        <Icon name={!!iconLeft ? iconLeft : 'back'} style={toolbar.iconLeft} />
                    </Surface>
                </TouchableWithoutFeedback>
                {!!title && <Text style={toolbar.title} numberOfLines={1}>{" " + title + " "}</Text>}
                
                {/* {(!!iconRight || !!rightButtonTitle) && <TouchableWithoutFeedback onPress={this._onPressIconRight}>
                    <Surface style={{ ...styles.rightContainer }}>
                        {!!rightButtonTitle ?
                            (<Text style={rightBtnSyle}>{rightButtonTitle}</Text>)
                            : (<Icon name={iconRight} style={{ ...iconStyle, ...iconRightStyle }} />)
                        }
                    </Surface>
                </TouchableWithoutFeedback>} */}
            </Surface>
        )
    }
}
