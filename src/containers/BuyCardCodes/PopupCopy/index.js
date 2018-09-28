import React from 'react'
import { Modal, View, Platform } from 'react-native'

import styles from './styles'
import { TouchableWithoutFeedback } from 'react-native-vector-icons/lib/react-native';
import TextAutolink from '~/src/components/TextAutolink'
import SvgUri from 'react-native-svg-uri'
import { Text, Surface, Button } from '~/src/themes/ThemeComponent'
import I18n from '~/src/I18n'
import { DIALOG_MODE } from '~/src/constants'
import Ripple from 'react-native-material-ripple';

export default class PopupCopy extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: !!props.visible ? true : false,
        }
        this.callbacks = {}
    }

    open(callbacks) {
        this.setState({
            visible: true
        })

        this.callbacks = {}

        if (!!callbacks) {
            if (callbacks.button1 && (typeof callbacks.button1 === 'function')) {
                this.callbacks.button1 = callbacks.button1
            }

            if (callbacks.button2 && (typeof callbacks.button2 === 'function')) {
                this.callbacks.button2 = callbacks.button2
            }

            if (callbacks.button3 && (typeof callbacks.button3 === 'function')) {
                this.callbacks.button3 = callbacks.button3
            }
        }
    }

    close() {
        this.setState({
            visible: false
        })
    }

    setVisible(visible) {
        this.setState({
            visible: visible
        })
    }

    _copyChargeSyntax = () => {
        if (!!this.props.copyChargeSyntax) {
            this.props.copyChargeSyntax()
        }
    }

    _copyChargeCode = () => {
        if (!!this.props.copyChargeCode) {
            this.props.copyChargeCode()
        }
    }

    _copySeri = () => {
        if (!!this.props.copySeri) {
            this.props.copySeri()
        }
    }

    _copyChargeCodeSeri = () => {
        if (!!this.props.copyChargeCodeSeri) {
            this.props.copyChargeCodeSeri()
        }
    }
    
    _onPressOverlay = () => {
        if (!!this.props.onPressOverlay) {
            this.props.onPressOverlay()
        }
    }

    _renderDialogContent = () => {
        const {overlayColor} = this.props;
        const modalBackgroundStyle = !!overlayColor ? { ...styles.backgroundModal, backgroundColor: overlayColor } : styles.backgroundModal

        return (
            <TouchableWithoutFeedback onPress={this._onPressOverlay}>
                <View style={modalBackgroundStyle}>
                    <Ripple style={styles.copyChargeSyntax}
                        onPress={this._copyChargeSyntax}
                    >
                        <Text description t='copy_charge_syntax' style={styles.textButton} />
                        <Text description style={styles.textButton}>*100*</Text>
                    </Ripple>
                    <Ripple style={styles.copyChargeSyntax}
                        onPress={this._copyChargeCode}
                    >
                        <Text description t='copy_charge_code' style={styles.textButton} />
                        <Text description style={styles.textButton}>*100*</Text>
                    </Ripple>
                    <Ripple style={styles.copyChargeSyntax}
                        onPress={this._copySeri}
                    >
                        <Text description t='copy_seri' style={styles.textButton} />
                        <Text description style={styles.textButton}>*100*</Text>
                    </Ripple>
                    <Ripple style={styles.copyChargeSyntax}
                        onPress={this._copyChargeCodeSeri}
                    >
                        <Text description t='copy_charge_code_seri' style={styles.textButton} />
                    </Ripple>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        const { useNormalView } = this.props

        if (!!useNormalView) {
            return (
                <View
                    style={styles.fullViewScreen}
                >
                    {this._renderDialogContent()}
                </View>
            )
        } else {
            return (
                <Modal
                    animationType={this.props.animationType || 'fade'}
                    visible={this.state.visible}
                    transparent={true}
                    onRequestClose={() => this.close()}
                >
                    {this._renderDialogContent()}
                </Modal>
            )
        }
    }
}