import React from 'react';
import {
    TouchableWithoutFeedback,
    Animated,
    Dimensions,
} from 'react-native';
import { View, Text, } from '~/src/themes/ThemeComponent'
import styles from './styles'

const {height, width} = Dimensions.get('window');
const cubicSize = 20;
const cubicRadius = cubicSize * Math.sqrt(2) / 2;

export const ORIENTATION = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
}

export default class Tooltip extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            dx: 10,
            dy: 10,
            translateX: -20,
            translateY: 0,
            layoutHeight: 0,
            orientation: ORIENTATION.DOWN,
            animate: new Animated.Value(0),
            content: props.content,
            jumpAnimate: new Animated.Value(0)
        }
    }

    componentDidMount() {
        // setTimeout(() => this.close(), 3000);
        // setTimeout(() => this.setState({isVisible: false}), 2000);

    }

    _startJumpAnimate = () => {
        if (!this.state.isVisible) {
            return;
        }

        Animated.sequence([
            Animated.timing(this.state.jumpAnimate, {
                toValue: 1,
                duration: 600
            }),
            Animated.timing(this.state.jumpAnimate, {
                toValue: 0,
                duration: 600
            }),

        ]).start(() => {
            this._startJumpAnimate();
        })
    }

    open = ({x, y, orientation = ORIENTATION.DOWN, translateX = -15, translateY = 0, isModal = false, callback = () => {}, content = this.state.content}) => {

        const translateXAdvance = (x + translateX < 16) ? 16 - x : translateX;

        this.setState({
            isVisible: true,
            dx: x + 2.5,
            dy: y,
            orientation,
            translateX: translateXAdvance,
            translateY,
            animate: new Animated.Value(0),
            isModal,
            callback,
            content
        }, () => {
            Animated.timing(this.state.animate, {toValue: 1, duration: 300}).start(() => setTimeout(this.close, 120000));
            this._startJumpAnimate();
        });
    }

    updateXY = (x, y) => {
        if (this.state.isVisible == false) {
            return;
        }

        this.setState({
            dx: x,
            dy: y,
        })
    }

    _callback = () => {
        if (typeof this.state.callback == 'function') {
            this.state.callback();
        }
    }

    close = () => {

        if (!this.state.isVisible) {
            return;
        }

        Animated.timing(this.state.animate, {
            toValue: 2,
            duration: 500,
        }).start(
            () => this.setState(
                {isVisible: false},
                this._callback
            )
        );
    }

    _renderDown = () => {

        const translateX = this.state.translateX;

        const opacity = this.state.animate.interpolate({
            inputRange: [0, 1, 1, 2],
            outputRange: [0, 1, 1, 0],
        })

        const containerTranslateY = this.state.jumpAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [10, 0]
        })

        return (

            <Animated.View
                ref={ref => this.container = ref}
                style={{
                    position: 'absolute',
                    top: this.state.dy,
                    left: this.state.dx - cubicRadius + translateX,
                    backgroundColor: 'rgba(0,0,0,0)',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    zIndex: 500,
                    elevation: 20,
                    // borderWidth: 1,
                    // borderColor: 'rgba(0,0,0,0)',
                    opacity: !!this.state.layoutWidth ? opacity : 0,
                    transform: [{translateY: containerTranslateY}]
                }}
            >
                <View
                    style={{
                        marginLeft: - translateX,
                        marginBottom: - 0.5,
                        width: cubicSize,
                        height: cubicSize,
                        backgroundColor: 'rgba(0,0,0,0)'
                    }}
                >
                    <View
                        style={{
                            width: cubicSize,
                            height: cubicSize,
                            // margin: cubicRadius,

                            transform: [{rotate: '45deg'}],
                            backgroundColor: '#3E83E8',
                            // marginBottom: - cubicRadius,
                            bottom: - cubicRadius,
                            position: 'absolute'
                        }}
                    />
                </View>

                {!!this.state.content &&
                <View
                    onLayout={this._onRenderLayout}
                    style={styles.textContainer}
                >
                    <Text
                        onPress={this.close}
                        numberOfLines={10}
                        style={styles.text}
                    >
                        {this.state.content}
                    </Text>
                </View>
                }

                {!!this.props.children && this.props.children}
            </Animated.View>

        )
    }

    _onRenderLayout = (e) => {

        if (!!this.state.layoutHeight && !!this.state.layoutWidth) {
            return; // because width and height would not change
        }

        const layoutHeight = e.nativeEvent.layout.height;

        const layoutWidth = e.nativeEvent.layout.width;

        const {dx, translateX} = this.state;

        const translateXAdvance = (dx + layoutWidth + translateX > width) ? width - dx - layoutWidth + 12 : translateX;
        // alert (JSON.stringify({dx, layoutWidth, translateX, width, translateXAdvance}, null, 2));

        this.setState({
            translateX: translateXAdvance <  - width ? - width : translateXAdvance,
            layoutHeight,
            layoutWidth
        });
    }

    _renderUp = () => {
        const translateX = this.state.translateX;
        const translateY = this.state.translateY;

        const opacity = this.state.animate.interpolate({
            inputRange: [0, 1, 1, 2],
            outputRange: [0, 1, 1, 0],
        })

        const containerTranslateY = this.state.jumpAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, 0]
        })

        return (

            <Animated.View
                ref={ref => this.container = ref}
                style={{
                    position: 'absolute',
                    top: this.state.dy - this.state.layoutHeight - cubicRadius + translateY,
                    left: this.state.dx - cubicRadius + translateX,
                    backgroundColor: 'rgba(0,0,0,0)',
                    opacity: !!this.state.layoutHeight ? opacity : 0,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    zIndex: 500,
                    elevation: 20,
                    // borderWidth: 1,
                    // borderColor: 'rgba(0,0,0,0)',
                    transform: [{translateY: containerTranslateY}]
                }}
            >
                {!!this.state.content &&
                <View
                    onLayout={this._onRenderLayout}
                    style={styles.textContainer}
                >
                    <Text
                        onPress={this.close}
                        numberOfLines={10}
                        style={styles.text}
                    >
                        {this.state.content}
                    </Text>
                </View>
                }

                {!!this.props.children && this.props.children}
                <View
                    style={{
                        marginTop: - 0.5,
                        marginLeft: - translateX,
                        width: cubicSize,
                        height: cubicSize,
                        backgroundColor: 'rgba(0,0,0,0)'
                    }}
                >
                    <View style={{
                        width: cubicSize,
                        height: cubicSize,
                        transform: [{rotate: '45deg'}],
                        backgroundColor: '#3E83E8',
                        top: - cubicRadius,
                        position: 'absolute'
                    }}/>
                </View>
            </Animated.View>

        )
    }

    render() {

        if (!this.state.isVisible) {
            return <View/>;
        }

        let result;

        switch (this.state.orientation) {
            case ORIENTATION.UP:
                result = this._renderUp();
                break;
            case ORIENTATION.DOWN:
                result = this._renderDown();
                break;
            default:
                break;
        }

        if (this.state.isModal) {
            return (
                <TouchableWithoutFeedback
                    onPress={this.close}
                >
                <View
                    style={{
                        position: 'absolute',
                        flex: 1,
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: 500,
                        elevation: 20
                    }}
                >
                    {result}
                </View>
                </TouchableWithoutFeedback>
            )
            // return (
            //     <Modal
            //         transparent={true}
            //         visible={this.state.isVisible}
            //         onRequestClose={this.close}
            //     >
            //         <TouchableWithoutFeedback onPress={() => this.close()}>
            //             <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0)'}}>
            //                 {result}
            //             </View>
            //         </TouchableWithoutFeedback>
            //     </Modal>
            // );
        } else {
            return result;
        }

        return false;
    }
}