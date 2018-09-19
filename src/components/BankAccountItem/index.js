import React from 'react'
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import Image from 'react-native-fast-image'
import { maskBankAccount, getElevation } from '~/src/utils'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { SURFACE_STYLES } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple';
import { Animated, PanResponder, View } from 'react-native'

export default class BankAccountItem extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.translateX = new Animated.Value(0)
        this.animationRunning = false
        this.showingIconFunction = false

        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
            },
            onPanResponderMove: (evt, gestureState) => {
                if (this.animationRunning) return
                if (!this.showingIconFunction && gestureState.dx < 0) {
                    this.animationRunning = true
                    Animated.spring(this.translateX, {
                        toValue: -70,
                        useNativeDriver: true
                    }).start(() => {
                        this.animationRunning = false
                        this.showingIconFunction = true
                    })
                } else if (this.showingIconFunction && gestureState.dx > 0) {
                    this.animationRunning = true
                    Animated.spring(this.translateX, {
                        toValue: 0,
                        useNativeDriver: true
                    }).start(() => {
                        this.animationRunning = false
                        this.showingIconFunction = false
                    })
                }

            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
            },
            onPanResponderTerminate: (evt, gestureState) => { },
        });
    }

    _handlePressAddCard = () => {
        console.log('Handle Press AddCard')
    }

    render() {
        const { bankImage, expireDate, bankName, bankAccount, active = false, onPress, draggable = false, onDelete } = this.props
        if (draggable) {
            return (
                <View>
                    <Animated.View
                        style={{
                            transform: [{
                                translateX: this.translateX
                            }]
                        }}
                    >
                        <LinearGradient
                            colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                            start={{ x: 0.0, y: 0.0 }}
                            end={{ x: 1.0, y: 0.0 }}
                            locations={[0.0, 1.0]}
                            {...this._panResponder.panHandlers}
                            style={{
                                ...styles.container,
                                ...SURFACE_STYLES.rowStart,
                                ...getElevation(4),
                                marginHorizontal: 2,
                                marginTop: 2,
                                marginBottom: 5,
                            }}
                        >
                            <Image
                                source={{ uri: bankImage }}
                                style={styles.image}
                            />
                            <Surface columnAlignEnd flex themeable={false}>
                                <Text description white>{bankName}</Text>
                                <Text description white>{maskBankAccount(bankAccount)}</Text>
                                <Text description white>VALID {expireDate}</Text>
                            </Surface>
                        </LinearGradient>
                    </Animated.View>
                    <View style={{
                        ...styles.iconContainer,
                    }}>
                        <Ripple onPress={() => {
                            Animated.spring(this.translateX, {
                                toValue: 0,
                                useNativeDriver: true
                            }).start(() => {
                                this.animationRunning = false
                                this.showingIconFunction = false
                                onDelete && onDelete()
                            })
                        }}
                            rippleColor={'white'}>
                            <Icon name='GB_trash' style={styles.icon} />
                        </Ripple>
                    </View>
                </View>
            )
        }

        if (active) {
            return (
                <Ripple onPress={onPress} rippleColor={'white'}>
                    <LinearGradient
                        colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 1.0, y: 0.0 }}
                        locations={[0.0, 1.0]}
                        {...this._panResponder.panHandlers}
                        style={{
                            ...styles.container,
                            ...SURFACE_STYLES.rowStart,
                            ...getElevation(4),
                            marginHorizontal: 2,
                            marginTop: 2,
                            marginBottom: 5,

                        }}
                    >
                        <Image
                            source={{ uri: bankImage }}
                            style={styles.image}
                        />
                        <Surface columnAlignEnd flex themeable={false}>
                            <Text description white>{bankName}</Text>
                            <Text description white>{maskBankAccount(bankAccount)}</Text>
                            <Text description white>VALID {expireDate}</Text>
                        </Surface>
                    </LinearGradient>
                </Ripple>
            )
        }
        return (
            <Ripple onPress={onPress} rippleColor={'white'}>
                <Surface rowStart style={{
                    ...styles.container,
                    marginHorizontal: 2,
                    marginTop: 2,
                    marginBottom: 5
                }}>
                    <Image
                        source={{ uri: bankImage }}
                        style={styles.image}
                    />
                    <Surface columnAlignEnd flex themeable={false}>
                        <Text description>{bankName}</Text>
                        <Text description>{maskBankAccount(bankAccount)}</Text>
                        <Text description>VALID {expireDate}</Text>
                    </Surface>
                </Surface>
            </Ripple>
        )
    }
}