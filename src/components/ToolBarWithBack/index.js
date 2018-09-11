import React from 'react';
import {
    Dimensions,
    TouchableWithoutFeedback,
    Animated
} from 'react-native';
import Icon from '../FontIcon'
import styles from './styles'
import I18n from '../../../src/I18n'
import { View, Text, } from '~/src/themes/ThemeComponent'

const { height, width } = Dimensions.get('window')

export const linkColor = I18n.t('link_color') || '#007aff'; // link color: #007aff // maybe #4998fe

export default class ToolBarWithBack extends React.PureComponent {

    constructor(props) {
        super(props)

    }
    
    _onPressBack = () => {
        const { onPressIconLeft } = this.props
        if (onPressIconLeft)
            onPressIconLeft()
        else {

        }
    }

    _onPressIconRight = () => {
        const { onPressIconRight } = this.props
        onPressIconRight && onPressIconRight()
    }

    render() {
        const { iconLeft, iconRight, iconColor, title, animatedStyle, useAnimatedIcon, style, leftButtonTitle, rightButtonTitle,
            leftButtonColor, rightButtonColor, rightButtonState, iconRightStyle, titleFontSize} = this.props

        let { backgroundColor } = this.props
        const iconStyle = iconColor ? { ...styles.icon, color: iconColor } : styles.icon
        const leftBtnStyle = leftButtonColor ? { ...styles.leftButton, color: leftButtonColor } : styles.leftButton
        let rightBtnSyle = rightButtonColor ? { ...styles.rightButtonDisable, color: rightButtonColor } : styles.rightButtonDisable

        if (rightButtonState && !rightButtonColor) {
            rightBtnSyle = { ...styles.rightButtonDisable, color: linkColor}
        }

        if (!backgroundColor) backgroundColor = '#f5f5f5'

        let titleStyle = {...styles.title, maxWidth: width - 90}
        
        if (titleFontSize) {
            titleStyle = {...titleStyle, fontSize: titleFontSize}
        }

        if (!useAnimatedIcon) {
            return (
                <View style={{ ...styles.bar, ...style }}>
                    {animatedStyle && <Animated.View style={{ ...styles.bar, ...animatedStyle }} />}
                    <TouchableWithoutFeedback onPress={this._onPressBack}>
                        <View style={styles.backContainer}>
                            {!!leftButtonTitle ?
                                (<Text style={leftBtnStyle}>{leftButtonTitle}</Text>)
                                : (<Icon name={!!iconLeft ? iconLeft : 'back'} style={iconStyle} />)
                            }

                        </View>
                    </TouchableWithoutFeedback>
                    {!!title && <Text style={titleStyle} numberOfLines={1}>{" " + title + " "}</Text>}
                    {(!!iconRight || !!rightButtonTitle) && <TouchableWithoutFeedback onPress={this._onPressIconRight}>
                        <View style={{ ...styles.rightContainer, backgroundColor: backgroundColor }}>
                            {!!rightButtonTitle ?
                                (<Text style={rightBtnSyle}>{rightButtonTitle}</Text>)
                                : (<Icon name={iconRight} style={{...iconStyle, ...iconRightStyle}} />)
                            }
                        </View>
                    </TouchableWithoutFeedback>}
                </View>
            )
        } else {
            console.log('vao 2')
            const { animatedIconStyle1, animatedIconStyle2 } = this.props
            return (
                <View style={{ ...styles.bar, ...style }}>
                    {animatedStyle && <Animated.View style={{ ...styles.bar, ...animatedStyle }} />}
                    <TouchableWithoutFeedback onPress={this._onPressBack}>
                        <View style={styles.backContainer}>
                            {!!leftButtonTitle ?
                                (<Text style={leftBtnStyle}>{leftButtonTitle}</Text>)
                                : (<Icon name={!!iconLeft ? iconLeft : 'back'} style={animatedIconStyle1} />)
                            }

                        </View>
                    </TouchableWithoutFeedback>
                    {!!title && <Animated.Text style={{ maxWidth: width - 90, ...styles.title, ...this.props.titleStyle }} numberOfLines={1}>{" " + title + " "}</Animated.Text>}
                    {(!!iconRight || !!rightButtonTitle) && <TouchableWithoutFeedback onPress={this._onPressIconRight}>
                        <View style={{ ...styles.rightContainer, backgroundColor: backgroundColor }}>
                            {!!rightButtonTitle ?
                                (<Text style={rightBtnSyle}>{rightButtonTitle}</Text>)
                                : (<Icon name={iconRight} style={animatedIconStyle1} />)
                            }
                        </View>
                    </TouchableWithoutFeedback>}

                    <TouchableWithoutFeedback onPress={this._onPressBack}>
                        <View style={styles.backContainer}>
                            {!!leftButtonTitle ?
                                (<Text style={leftBtnStyle}>{leftButtonTitle}</Text>)
                                : (<Icon name={!!iconLeft ? iconLeft : 'back'} style={animatedIconStyle2} />)
                            }

                        </View>
                    </TouchableWithoutFeedback>

                    {(!!iconRight || !!rightButtonTitle) && <TouchableWithoutFeedback onPress={this._onPressIconRight}>
                        <View style={{ ...styles.rightContainer, backgroundColor: backgroundColor }}>
                            {!!rightButtonTitle ?
                                (<Text style={rightBtnSyle}>{rightButtonTitle}</Text>)
                                : (<Icon name={iconRight} style={animatedIconStyle2} />)
                            }
                        </View>
                    </TouchableWithoutFeedback>}
                </View>
            )
        }

    }
}