import React from 'react'
import { Text, Button } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'

export default class OTPCountdown extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            time: props.time
        }
        this.intervalID = -1
    }

    componentDidMount() {
        this.intervalID = setInterval(() => {
            const { onCountToEnd } = this.props
            if (this.state.time <= 0) {
                this._stopCount()
                onCountToEnd && onCountToEnd()
                return
            }
            this.setState({
                time: this.state.time - 1
            })
        }, 1000)
    }

    _stopCount = () => {
        clearInterval(this.intervalID)
        this.intervalID = -1
    }

    componentWillUnmount() {
        this._stopCount()
    }

    _handlePressResend = () => {
        this.props.onResend && this.props.onResend()
    }

    render() {
        const { textColor, secondColor } = this.props
        if (this.state.time <= 0) {
            return <Button
                flat textStyle={{ color: COLORS.BLUE }}
                t={'resend_otp'}
                onPress={this._handlePressResend}
            />
        }
        let textStyle = {}, textCountStyle = {}
        if (textColor) {
            textStyle = { color: textColor }
        }
        if (secondColor) {
            textCountStyle = { color: secondColor }
        }
        
        return (
            <Text themeable={false}>
                <Text white description t='hint_not_receive_otp' style={textStyle} />
                <Text yellow description style={textCountStyle}> {this.state.time}</Text>
            </Text>
        )
    }
}