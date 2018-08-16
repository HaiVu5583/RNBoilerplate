import React from 'react'
import { View, Text, Platform } from 'react-native'
import ReactNativeShimmer from 'react-native-shimmer'

export default class Shimmer extends React.PureComponent {

    render() {

        const {
            width = '100%',
            height = 50,
            marginLeft = 0,
            marginRight = 0,
            marginTop = 0,
            marginBottom = 0,
            margin = 0,
            flex = null,
            direction = 'right',
        } = this.props.style;

        return (
            <View
                style={{
                    width,
                    height,
                    marginLeft,
                    marginRight,
                    marginTop,
                    marginBottom,
                    margin,
                    flex
                }}
            >
                <ReactNativeShimmer
                    direction={direction}

                >
                    <Text
                        style={{
                            width,
                            height,
                            backgroundColor: Platform.OS == 'ios' ? 'rgba(0, 0, 0, 0.2)' : 'lightgray',
                            color: 'transparent'
                        }}
                    />
                </ReactNativeShimmer>
            </View>
        )
    }
}