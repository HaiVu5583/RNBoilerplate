import React from 'react'
import { Modal, TouchableWithoutFeedback, Dimensions, Animated, TouchableHighlight, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Colors } from 'react-native-ui-lib';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text } from '~/src/themes/ThemeComponent'
export default class TagItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    _handlePressTagItem = () => {
        const { data } = this.props
        this.props.onPress && this.props.onPress(data)
    }

    render() {
        const {
            data,
            activeBackgroundColor = Colors.orange30,
            activeIconColor = 'white',
            passiveBackgroundColor = 'white',
            passiveIconColor = 'rgba(0, 0, 0, 0.6)',
            selected = false } = this.props
        const { icon, text } = data
        return (
            <TouchableOpacity
                underlayColor={activeBackgroundColor}
                onPress={this._handlePressTagItem}
                style={{
                    borderRadius: 20,
                }}
            >
                <View
                    themeable={false}
                    style={[
                        {
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderRadius: 20,
                            borderColor: selected ? 'transparent' : passiveIconColor,
                            backgroundColor: selected ? activeBackgroundColor : passiveBackgroundColor,
                            borderWidth: 1,
                        },
                        this.props.style
                    ]}>
                    <Icon name={icon} size={28} color={selected ? activeIconColor : passiveIconColor} />
                    <Text
                        themeable={false}
                        style={{
                            marginLeft: 5,
                            color: selected ? activeIconColor : passiveIconColor,
                            flex: 1
                        }}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}