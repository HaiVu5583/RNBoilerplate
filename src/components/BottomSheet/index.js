import React from 'react'
import { Modal, TouchableWithoutFeedback, Dimensions, FlatList, Platform, Animated, Easing } from 'react-native'
import styles from './styles'
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text } from '~/src/themes/ThemeComponent'
// import Icon from 'react-native-vector-icons/FontAwesome5Pro'
const DEFAULT_Y = 1000

export default class BottomSheet extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: !!props.visible ? true : false,
            translateY: new Animated.Value(DEFAULT_Y),
        }
    }

    open() {
        this.setState({
            visible: true,
        }, () => {
            Animated.timing(this.state.translateY, {
                toValue: 0,
                useNativeDriver: true,
                duration: 450,
                easing: Easing.linear,
            }).start()
        })
    }

    close = () => {
        Animated.timing(this.state.translateY, {
            toValue: DEFAULT_Y,
            useNativeDriver: true,
            duration: 450,
            easing: Easing.linear,
        }).start(() => {
            this.setState({
                visible: false,
            })
        })
    }

    setVisible(visible) {
        this.setState({
            visible: visible
        })
    }

    _onPressOverlay = () => {
        this.close()
    }

    _handleCancel = () => {
        this.close()
    }

    _handleConfirm = () => {
        this.props.onConfirm &&
            this.props.onConfirm(this.props.valueList1[this.index1], this.props.valueList2[this.index2])
        this.close()
    }

    render() {
        const { showHeader, title } = this.props
        return (
            <Modal
                animationType={'none'}
                visible={this.state.visible}
                transparent={true}
                onRequestClose={() => this.close()}
            >
                <TouchableWithoutFeedback onPress={this.close}>
                    <View style={styles.modalBackground} themeable={false}>
                        <Animated.View
                            style={[
                                styles.defaultContainer,
                                {
                                    transform: [{
                                        translateY: this.state.translateY.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 1],
                                        }),
                                    }],
                                }
                            ]}
                        >
                            {!!showHeader && < View style={styles.header} themeable={false}>
                                <Text style={styles.textHeader}>{title}</Text>
                                <View
                                    themeable={false}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 10,
                                        bottom: 0,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon name='window-close' size={28} color={'rgba(0, 0, 0, 0.6)'} onPress={this.close} light />
                                </View>
                            </View>}
                            <View style={{ padding: 10 }} themeable={false}>
                                {this.props.children}
                            </View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal >
        )
    }
}