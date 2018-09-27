import React from 'react'
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import Image from 'react-native-fast-image'
import { maskBankAccount, getElevation } from '~/src/utils'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { SURFACE_STYLES, COLORS } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple';
import { Animated, PanResponder, View } from 'react-native'
import { MONEY_SOURCE_TYPE } from '~/src/constants'
import I18n from '~/src/I18n'

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

    _renderImage = () => {
        const { bankImage } = this.props
        return (
            <Image
                source={{ uri: bankImage }}
                style={styles.image}
            />
        )
    }

    _renderInfo = () => {
        const { expireDate, bankName, bankAccount, active = false,
            draggable = false, isGigabank, type = MONEY_SOURCE_TYPE.CREDIT_CARD
        } = this.props
        const iconName = (type == MONEY_SOURCE_TYPE.BANK) ? 'GB_bank' : 'GB_paycard'
        const iconColor = active ? COLORS.WHITE : COLORS.DARK_BLUE
        const textColor = active ? COLORS.WHITE : COLORS.BLACK
        const bankNameDisplay = isGigabank ? I18n.t('gigabank_account') : bankName
        const bankAccountDisplay = (type == MONEY_SOURCE_TYPE.BANK) ? bankAccount : maskBankAccount(bankAccount)
        return (
            <Surface columnAlignStart flex themeable={false}>
                <Surface rowStart themeable={false}>
                    <Text info style={{ flex: 1, color: textColor }}>{bankNameDisplay}</Text>
                    <Icon name={iconName} style={{ ...styles.iconBank, color: iconColor }} />
                </Surface>
                <Text body16 style={{ color: textColor }}>{bankAccountDisplay}</Text>
                {(!!expireDate && (type == MONEY_SOURCE_TYPE.CREDIT_CARD))
                    && <Text info style={{ color: textColor }}>VALID {expireDate}</Text>
                }
            </Surface>
        )
    }

    _renderDragableFunction = () => {
        const { active = false, onDelete } = this.props
        const iconColor = active ? COLORS.DARK_BLUE : COLORS.WHITE
        return (
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
                <Icon name='GB_trash' style={{ ...styles.icon, color: iconColor }} />
            </Ripple>
        )
    }

    render() {
        const { active = false, onPress, draggable = false,
            moreStyle, index, verticalMargin = true } = this.props
        const marginTop = (verticalMargin && index == 0) ? 24 : 0
        const marginBottom = verticalMargin ? 20 : 0
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
                        {active ?
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
                                    marginTop,
                                    marginBottom
                                }}
                            >
                                {this._renderImage()}
                                {this._renderInfo()}
                            </LinearGradient> :
                            <Surface
                                rowStart
                                {...this._panResponder.panHandlers}
                                style={{
                                    ...styles.container,
                                    ...getElevation(4),
                                    marginTop,
                                    marginBottom
                                }}
                            >
                                {this._renderImage()}
                                {this._renderInfo()}
                            </Surface>
                        }
                    </Animated.View>
                    {active ?
                        <View style={{
                            ...styles.iconContainer,
                            top: marginTop,
                            bottom: marginBottom
                        }}>
                            {this._renderDragableFunction()}
                        </View> :
                        <LinearGradient
                            colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                            start={{ x: 0.0, y: 0.0 }}
                            end={{ x: 1.0, y: 0.0 }}
                            locations={[0.0, 1.0]}
                            style={{
                                ...styles.iconContainer,
                                top: marginTop,
                                bottom: marginBottom
                            }}>
                            {this._renderDragableFunction()}
                        </LinearGradient>
                    }
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
                            marginTop,
                            marginBottom,
                            ...moreStyle
                        }}
                    >
                        {this._renderImage()}
                        {this._renderInfo()}
                    </LinearGradient>
                </Ripple>
            )
        }
        return (
            <Ripple onPress={onPress} rippleColor={'white'}>
                <Surface rowStart style={{
                    ...styles.container,
                    marginTop,
                    marginBottom,
                    ...moreStyle
                }}>
                    {this._renderImage()}
                    {this._renderInfo()}
                </Surface>
            </Ripple>
        )
    }
}