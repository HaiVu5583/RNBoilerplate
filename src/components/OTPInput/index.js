import React from 'react';
import { TextInput, TouchableWithoutFeedback } from 'react-native';
import { Surface, Text, } from '~/src/themes/ThemeComponent'
import styles from './styles'

export default class OTPInput extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            otp: '',
        }
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }

    static getDerivedStateFromProps(props, state) {
        if (props.otp !== state.otp) {
            return {
                otp: props.otp
            }
        }
        return null
    }

    _onChangeText = (text) => {
        const validText = text.toString().replace(/\D/g, '')
        this.setState({
            otp: validText
        })
        this.props.onChangeText && this.props.onChangeText(validText)
    }

    _handlePressOTP = () => {
        this.input.blur()
        this.input.focus()
    }

    render() {
        const { activeColor = 'rgba(255, 255, 255, 1)', numberDigit = 4, passiveColor = 'rgba(255, 255, 255, 0.6)', autoFocus = false, editable = false } = this.props
        let otpViews = []
        for (let i = 0; i < this.props.numberDigit; i++) {
            if (i <= this.state.otp.length - 1) {
                otpViews.push(
                    <Surface themeable={false} style={styles.otpItem} key={i}>
                        <Text themeable={false} style={[styles.otpText, { color: activeColor }]}>{this.state.otp.charAt(i)}</Text>
                    </Surface>
                )
            } else {
                otpViews.push(
                    <Surface themeable={false} style={styles.otpItem} key={i}>
                        <Surface themeable={false} style={[styles.otpTextPlaceholder, { color: passiveColor }]} />
                    </Surface>
                )
            }
        }

        return (
            <TouchableWithoutFeedback onPress={this._handlePressOTP}>
                <Surface themeable={false} rowCenter
                    style={[
                        styles.container,
                        this.props.style,
                        this.state.otp.length > 0 ? { borderBottomColor: activeColor } : { borderBottomColor: passiveColor }
                    ]}
                >
                    <TextInput
                        underlineColorAndroid='transparent'
                        ref={ref => this.input = ref}
                        autoCorrect={false}
                        autoFocus={autoFocus}
                        style={{ position: 'absolute', width: 0, height: 0 }}
                        value={this.state.otp}
                        onChangeText={this._onChangeText}
                        maxLength={numberDigit}
                        keyboardType={'numeric'}
                        editable={editable}
                    />
                    <Surface themeable={false} rowCenter>
                        {otpViews}
                    </Surface>
                </Surface>
            </TouchableWithoutFeedback>
        )
    }
}
