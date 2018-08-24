import React from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import Icon from '~/src/components/FontIcon'
import styles from './styles'
import { languageSelector } from '~/src/store/selectors/ui'
import { connect } from 'react-redux'
import I18n from '~/src/I18n'

export default class Password extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            showing: false,
            selectionShowing: { start: 0, end: 0 },
            selectionHiding: { start: 0, end: 0 }
        }

        this.passwordHidingSelection = { start: 0, end: 0 }
        this.passwordShowingSelection = { start: 0, end: 0 }
    }

    _onPressShowHide = () => {
        if (!this.state.showing) {
            this.changeHideToShow = true
            this.passwordShowingSelection = this.passwordHidingSelection
        } else {
            this.changeShowToHide = true
            this.passwordHidingSelection = this.passwordShowingSelection
        }

        this.setState({ showing: !this.state.showing })
    }

    componentDidUpdate() {
        if (this.changeHideToShow) this.changeHideToShow = false
        if (this.changeShowToHide) this.changeShowToHide = false
    }

    render() {
        const { placeholder, placeholderT, ...restProps } = this.props
        if (!this.state.showing) {

            return (
                <View style={{ ...styles.inputContainer, ...this.props.containerStyle }}>
                    <TextInput
                        ref={ref => this.passwordHiding = ref}
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={this.props.onChangeText}
                        value={this.props.value}
                        style={{ flex: 1, padding: 2 }}
                        secureTextEntry={true}
                        onSelectionChange={(e) => {
                            this.passwordHidingSelection = e.nativeEvent.selection
                            this.setState({ selectionHiding: e.nativeEvent.selection })
                        }}
                        selection={this.changeShowToHide ? this.passwordShowingSelection : this.state.selectionHiding}
                        placeholder={placeholderT ? I18n.t(placeholderT) : (placeholder || '')}
                        {...restProps}
                    />
                    <TouchableWithoutFeedback onPress={this._onPressShowHide}>
                        <View style={styles.iconContainer}>
                            <Icon name='eye-off' style={[styles.iconShowHide, this.props.iconStyle]} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }

        return (
            <View style={{ ...styles.inputContainer, ...this.props.containerStyle }}>
                <TextInput
                    ref={ref => this.passwordShowing = ref}
                    underlineColorAndroid='transparent'
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    style={{ flex: 1, padding: 2 }}
                    secureTextEntry={false}
                    onSelectionChange={(e) => {
                        this.passwordShowingSelection = e.nativeEvent.selection
                        this.setState({ selectionShowing: e.nativeEvent.selection })
                    }}
                    selection={this.changeHideToShow ? this.passwordHidingSelection : this.state.selectionShowing}
                    placeholder={placeholderT ? I18n.t(placeholderT) : (placeholder || '')}
                    {...restProps}
                />
                <TouchableWithoutFeedback onPress={this._onPressShowHide}>
                    <View style={styles.iconContainer}>
                        <Icon name='eye-on' style={[styles.iconShowHide, this.props.iconStyle]} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const ConnectedPassword = connect(state => ({
    language: languageSelector(state)
}))(Password)

export default React.forwardRef((props, ref) => {
    return <ConnectedPassword {...props} forwardedRef={ref} />
})