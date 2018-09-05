import React from 'react';
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import styles from './styles'
import commonStyle, { COLORS } from '~/src/themes/common'

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

    render() {
        const { activeColor = 'rgba(255, 255, 255, 1)', numberDigit = 4, passiveColor = 'rgba(255, 255, 255, 0.6)', autoFocus = false, editable = false,
            hasError, errorText } = this.props
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

            <Surface themeable={false} columnStart style={commonStyle.textInput.textInputColumnContainer}>
                <Surface themeable={false} rowCenter fullWidth
                    style={[
                        styles.container,
                        this.props.style,
                        hasError ? { borderBottomColor: COLORS.ERROR } : (this.state.otp.length > 0) ? { borderBottomColor: activeColor } : { borderBottomColor: passiveColor }
                    ]}
                >
                    <Surface themeable={false} rowCenter>
                        {otpViews}
                    </Surface>
                </Surface>
                {!!hasError && <Surface themeable={false} rowSpacebetween fullWidth>
                    <Text themeable={false} error>{errorText}</Text>
                    <Icon name='report-error' style={commonStyle.textInput.iconError} />
                </Surface>}
            </Surface>
        )
    }
}
