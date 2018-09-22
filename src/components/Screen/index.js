import React, { Component } from 'react';
import {
    Surface, Text, Toolbar
} from '~/src/themes/ThemeComponent'
import { ImageBackground, StatusBar, Animated } from 'react-native'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, COLORS, SIZES } from '~/src/themes/common'
import LoadingModal from '~/src/components/LoadingModal'
import Header from './Header'

export default class Screen extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.scrollY = new Animated.Value(0)
    }

    componentDidMount() {

    }

    render() {
        const { header, content, toolbarTitleT, hanleBack, componentId, loading } = this.props
        return (
            <Surface themeable={false} flex>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <LoadingModal visible={loading} />
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    <Animated.ScrollView
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                        )}
                        scrollEventThrottle={16}
                    >
                        <Surface themeable={false}>
                            <Header
                                scrollY={this.scrollY}
                                {...header}
                            />
                            <Surface themeable={false}>
                                {content()}
                            </Surface>
                        </Surface>
                    </Animated.ScrollView>
                </ImageBackground>
                <Animated.View style={{
                    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
                    backgroundColor: COLORS.BLUE,
                    opacity: this.scrollY.interpolate({
                        inputRange: [0, 70, 71],
                        outputRange: [0, 0, 1],
                    }),
                    height: SIZES.TOOLBAR_AND_STATUSBAR,

                }}>
                </Animated.View>
                <Surface themeable={false} style={{
                    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 200
                }}>
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: COLORS.WHITE }}
                        titleT={toolbarTitleT}
                        titleStyle={{ color: COLORS.WHITE }}
                        componentId={componentId}
                        onPressIconLeft={hanleBack}
                    />
                </Surface>
            </Surface>
        )
    }
}