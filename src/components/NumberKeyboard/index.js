import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Surface, Text, Button } from '~/src/themes/ThemeComponent'
import { DEVICE_WIDTH, DEVICE_HEIGHT, COLORS } from '~/src/themes/common'
const KEY_WIDTH = DEVICE_WIDTH / 3
import LinearGradient from 'react-native-linear-gradient'

const KEY_TYPES = {
    NUMBER: 'NUMBER',
    EMPTY: 'EMPTY',
    CLEAR: 'CLEAR'
}

export default class NumberKeyboard extends React.PureComponent {

    constructor(props) {
        super(props)
        this.value = ''
        this.keyboardData = [
            {
                keyID: 1,
                keyValue: 1,
                keyType: KEY_TYPES.NUMBER
            },
            {
                keyID: 2,
                keyValue: 2,
                keyType: KEY_TYPES.NUMBER
            },
            {
                keyID: 3,
                keyValue: 3,
                keyType: KEY_TYPES.NUMBER
            },
            {
                keyID: 4,
                keyValue: 4,
                keyType: KEY_TYPES.NUMBER
            },
            {
                keyID: 5,
                keyValue: 5,
                keyType: KEY_TYPES.NUMBER
            },
            {
                keyID: 6,
                keyValue: 6,
                keyType: KEY_TYPES.NUMBER
            },
            {
                keyID: 7,
                keyValue: 7,
                keyType: KEY_TYPES.NUMBER
            },
            {
                keyID: 8,
                keyValue: 8,
                keyType: KEY_TYPES.NUMBER
            },
            {
                keyID: 9,
                keyValue: 9,
                keyType: KEY_TYPES.NUMBER
            },
            {
                keyID: 10,
                keyValue: '',
                keyType: KEY_TYPES.EMPTY
            },
            {
                keyID: 0,
                keyValue: 0,
                keyType: KEY_TYPES.NUMBER
            },
            {
                keyID: 11,
                keyValue: '',
                keyType: KEY_TYPES.CLEAR
            },


        ]
    }

    _handlePressKey = (item) => {
        if (item.keyType == KEY_TYPES.EMPTY) return
        if (item.keyType == KEY_TYPES.NUMBER) {
            this.value += ('' + item.keyValue)
            this._onChangValue(this.value)
        } else if (item.keyType == KEY_TYPES.CLEAR) {
            if (this.value.length > 0) {
                this.value = this.value.substring(0, this.value.length - 1)
                this._onChangValue(this.value)
            }
        }
    }

    _onChangValue = (newValue) => {
        const { onChangeValue } = this.props
        onChangeValue && onChangeValue(newValue)
    }

    _renderKeyboard = ({ item, index }) => {
        if (item.keyType == KEY_TYPES.CLEAR) {
            return (
                <Button flat
                    icon='GB_icon-43'
                    iconStyle={{ color: 'white', fontSize: 20 }}
                    style={{ width: KEY_WIDTH, height: 45 }}
                    onPress={() => this._handlePressKey(item)}
                />
            )
        }
        return (
            <Button flat
                text={item.keyValue}
                textStyle={{ color: 'white', fontSize: 24 }}
                style={{ width: KEY_WIDTH, height: 45 }}
                onPress={() => this._handlePressKey(item)}
            />
        )
    }

    render() {
        const totalHeight = 45 * 4 + 2 * 3
        return (
            <Surface themeable={false} style={{ height: totalHeight }}>

                <FlatList
                    ItemSeparatorComponent={() => (
                        <LinearGradient
                            start={{ x: 0.0, y: 0.5 }} end={{ x: 1.0, y: 0.5 }}
                            locations={[0.0, 0.5, 1.0]}
                            colors={['transparent', COLORS.BLUE, 'transparent']}
                            style={{
                                width: '100%',
                                height: 2,
                            }}
                        />
                    )}
                    data={this.keyboardData}
                    renderItem={this._renderKeyboard}
                    keyExtractor={item => item.keyID}
                    numColumns={3}
                />
            </Surface>
        )
    }
}
