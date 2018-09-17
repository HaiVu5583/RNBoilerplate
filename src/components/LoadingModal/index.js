import React, { Component } from 'react'
import { View, Modal, ActivityIndicator, Platform } from 'react-native'
import styles from './styles'
import { COLORS } from '~/src/themes/common'

export default class LoadingModal extends Component {
    constructor(props) {
        super(props)
        this.base_position = 300
        this.state = {
            visible: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible != this.state.visible) {
            this.setState({ visible: nextProps.visible })
            if (nextProps.visible) {
                console.log("show loading")
            }
        }
    }

    open = () => {
        this.setState({ visible: true })
    }
    close = () => {
        this.setState({ visible: false })
    }

    // _onCancel = () => {
    //     const { onCancel } = this.props
    //     if (onCancel) onCancel()
    // }

    render() {
        // const { canCancel } = this.props

        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => { }}>
                <View style={styles.modalOverlay}>
                    <View style={styles.spinnerContainer}>
                        <ActivityIndicator size={Platform.OS=='android' ? 60 : 'large'} color={COLORS.BLUE}/>
                    </View>

                    {/* {!!canCancel && <TouchableOpacity onPress={this._onCancel} style={styles.webviewCancelButton}>
                        <Text style={styles.webviewCancelText}>{I18n.t('webview_payment_cancel')}</Text>
                    </TouchableOpacity>
                    } */}
                </View>
            </Modal>
        )
    }
}