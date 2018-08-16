import React, { Component } from 'react'
import { View, Text, Switch, StyleSheet, WebView, Modal, TouchableOpacity, ActivityIndicator, CameraRoll, FlatList, Image, Button, Dimensions } from 'react-native'
import Icon from '~/ui/components/ClingmeFont2'
import { toElevation } from "~/ui/shared/utils";
import I18n from '~/ui/I18n'
const { height, width } = Dimensions.get('window')

export default class AcceptToViewAlbum extends Component {

    onBack = () => {
        const { onClose } = this.props
        if (onClose) onClose()
    }

    onAccept = () => {
        const { onRequestPermission } = this.props
        if (onRequestPermission)
            onRequestPermission()
    }

    render() {

        if (!this.props.isShow)
            return false

        return (
            <View style={{ width, height }}>
                <View style={{ flexDirection: 'row', ...toElevation(4), alignItems: 'center', backgroundColor: '#ffffff', marginBottom: 4, paddingTop: 8, paddingBottom: 8 }}>
                    <TouchableOpacity onPress={() => { this.onBack() }}
                    >
                        <Icon name='back' style={{ color: 'rgba(0, 0, 0, 0.9)', fontSize: 15, padding: 10 }} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.9)', textAlign: 'center', flex: 1 }}>
                        {I18n.t('upload_photo')}
                    </Text>

                    <Icon name='back' style={{ color: '#f5f5f5', fontSize: 15, padding: 10 }} />
                </View>

                <View style={{ alignItems: 'center', flex: 1, marginTop: 2, backgroundColor: 'white' }}>
                    <Text style={{ width: width * 0.7, fontSize: 14, color: 'rgba(0, 0, 0, 0.9)', textAlign: 'center', paddingTop: 40 }}>
                        {I18n.t('request_album_permission')}
                    </Text>

                    <TouchableOpacity onPress={() => { this.onAccept() }}>
                        <Text style={{ width: 0.6 * width, color: 'white', fontSize: 14, paddingTop: 10, paddingBottom: 10, backgroundColor: '#f16654', overflow: 'hidden', borderRadius: 3, marginTop: 15, textAlign: 'center' }}>
                            {I18n.t('str_ok_button').toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}