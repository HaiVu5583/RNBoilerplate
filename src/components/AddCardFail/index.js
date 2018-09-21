import React, { Component } from 'react';
import { Surface, Text } from '~/src/themes/ThemeComponent'
import { ImageBackground, StatusBar, View, FlatList, WebView } from 'react-native'
import Image from 'react-native-fast-image'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, COLORS, SIZES } from '~/src/themes/common'
const STEP = {
    LIST_BANK: 'LIST_BANK',
    WEBVIEW_ADD_CARD: 'WEBVIEW_ADD_CARD'
}

export default class AddCardFail extends Component {


    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            step: STEP.LIST_BANK
        }
        this.webviewAddCardInfo = {}
        this.numberItems = 0
    }



    render() {
        return (
            <Surface themeable={false} flex>
                <Text white></Text>
            </Surface>

        )
    }
}
