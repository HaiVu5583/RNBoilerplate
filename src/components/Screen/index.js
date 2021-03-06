import React, { Component, PureComponent } from 'react';
import { Surface, Text, Toolbar, Button } from '~/src/themes/ThemeComponent'
import { ImageBackground, StatusBar, Animated, Platform } from 'react-native'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, COLORS, SIZES, STATUS_BAR_HEIGHT } from '~/src/themes/common'
import LoadingModal from '~/src/components/LoadingModal'
import Header from './Header'
import KeyboardSpacer from 'react-native-keyboard-spacer'

export default class Screen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.scrollY = new Animated.Value(0)
    }

    componentDidMount() {
        if (this.scrollView && Platform.OS == 'ios') {
            this.scrollView._component.scrollTo({ x: 0, y: 1, animated: false })
            setTimeout(() => {
                this.scrollView._component.scrollTo({ x: 0, y: 0, animated: false })
            }, 10)
        }
    }

    render() {
        const { header, content, toolbarTitleT, hanleBack,
            componentId, loading, bottomButton } = this.props
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
                        contentInset={{ top: Platform.OS == 'ios' ? -STATUS_BAR_HEIGHT : 0 }}
                        ref={ref => this.scrollView = ref}
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
                    {(Platform.OS == 'ios') && <KeyboardSpacer />}
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
                {(!!bottomButton && !!bottomButton.show) && <Surface
                    containerHorizontalSpace
                    style={{
                        position: 'absolute', bottom: 16, left: 0, right: 0, zIndex: 200
                    }}
                    themeable={false}
                >
                    <Button
                        round full
                        noPadding
                        enable={true}
                        gradientButton={true}
                        {...bottomButton}
                    />
                </Surface>}
            </Surface>
        )
    }
}