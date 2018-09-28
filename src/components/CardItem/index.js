import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
import Image from 'react-native-fast-image'
import { Surface } from '~/src/themes/ThemeComponent'
import { COLORS, SURFACE_STYLES } from '~/src/themes/common'
import { getElevation } from '~/src/utils'
import LinearGradient from 'react-native-linear-gradient'

export default class CardItem extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    _renderImage = () => {
        const { onPress, image, itemStyle, gradient = false } = this.props
        return (
            <TouchableOpacity onPress={onPress}>
                <Image
                    source={{ uri: image }}
                    resizeMode={'cover'}
                    style={[
                        {
                            width: 90, height: 68,
                            backgroundColor: COLORS.FEATURE_BACKGROUND,
                            borderRadius: 10,
                        },
                        itemStyle
                    ]} />
            </TouchableOpacity>
        )
    }

    render() {
        const { style, gradient = false } = this.props
        if (!gradient) {
            return (
                <Surface themeable={false} columnCenter style={[
                    {
                        padding: 3,
                        backgroundColor: COLORS.FEATURE_BACKGROUND,
                        borderRadius: 10,
                        width: 96,
                        height: 74,
                        margin: 5,
                        ...getElevation(4)
                    },
                    style
                ]}>
                    {this._renderImage()}
                </Surface>
            )
        }
        return (
            <LinearGradient
                colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                locations={[0.0, 1.0]}
                style={[
                    {
                        padding: 3,
                        backgroundColor: COLORS.FEATURE_BACKGROUND,
                        borderRadius: 10,
                        margin: 5,
                        ...SURFACE_STYLES.columnCenter,
                        ...getElevation(4)
                    },
                    style
                ]}
            >
                {this._renderImage()}
            </LinearGradient>
        )
    }
}