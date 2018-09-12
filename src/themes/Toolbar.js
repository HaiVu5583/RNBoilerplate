import React from 'react'
import { Dimensions, StatusBar } from 'react-native'
import { Surface, Text, Icon, Button } from '~/src/themes/ThemeComponent'
const { width } = Dimensions.get('window')
import commonStyle, { STATUS_BAR_HEIGHT } from '~/src/themes/common'
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
            console.log('Component ID', this.props.componentId)
            Navigation.pop(this.props.componentId)
            return;
        }
    }

    _onPressIconRight = () => {
        const { onPressIconRight } = this.props
        onPressIconRight && onPressIconRight()
    }

    render() {
        const { iconLeft, iconRight, title, titleT, titleStyle, style, iconStyle, themeable,
            leftComponent, centerComponent, rightComponent, transparent = false
        } = this.props

        const left = leftComponent ? leftComponent() : <Button themeable={themeable} flat noPadding onPress={this._onPressBack}
            style={toolbar.iconLeftContainer}
            icon={!!iconLeft ? iconLeft : 'GB_icon-21'}
            iconStyle={[toolbar.iconLeft, iconStyle]}
        />
        const center = centerComponent ? centerComponent() : (
            typeof (titleT) != 'undefined' ? <Text style={[toolbar.title, titleStyle]} numberOfLines={1} themeable={themeable} t={titleT} /> :
                (
                    !!title ?
                        <Text style={[toolbar.title, titleStyle]} numberOfLines={1} themeable={themeable}>{" " + title + " "}</Text>
                        :
                        <Surface themeable={themeable} flex />
                )
        )
        const right = rightComponent ? rightComponent() : (iconRight ? <Button themeable={themeable} flat onPress={this._onPressIconRight}
            style={toolbar.iconRightContainer}
            icon={iconRight}
            iconStyle={[toolbar.iconRight, iconStyle]}
        /> : <Surface themeable={false} />)
        if (transparent) {
            return (
                <Surface style={[toolbar.container, style]} themeable={false} />
            )
        }
        return (
            <Surface themeable={false}>
                <Surface themeable={false} style={{ width: '100%', height: STATUS_BAR_HEIGHT }} />
                <Surface style={[toolbar.container, style]} themeable={themeable}>
                    {left}
                    {center}
                    {right}
                </Surface>
            </Surface>
        )
    }
}
