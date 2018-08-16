import React, { Component } from 'react'
import { View, Text, Switch, StyleSheet, WebView, Modal, TouchableOpacity, ActivityIndicator, CameraRoll, FlatList, Image, Button, Dimensions } from 'react-native'
import Icon from '~/ui/components/ClingmeFont2'
import styles from './styles'
import {toElevation} from "~/ui/shared/utils";
import I18n from '~/ui/I18n'
const {height, width} = Dimensions.get('window')


export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSlected: this.props.state,
            textHeader: this.props.headerText
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({isSlected: nextProps.state, textHeader: nextProps.headerText})
    }

    onBack = () => {
        this.props.onBack()
    }

    onChooseAlbum = () => {
        this.props.onOpenListAlbum()
    }

    onFinishSelectImage = () => {
        if (this.state.isSlected) {
            console.log('finish ok')
            this.props.onFinish()
        }
    }

    render() {
        let styleText = styles.rightButtonDisable
        if (this.state.isSlected) {
            styleText = styles.rightButtonEnable
        }

        const {showRightButton} = this.props
        return (
            <View style = {{...styles.headerBar, marginBottom: 15}}>
                <TouchableOpacity onPress = {() => {this.onBack()}} style={styles.backContainer}>
                    <View>
                        <Icon name = 'back' style={styles.leftButton}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress = {() => {this.onChooseAlbum()}} style = {{alignItems:'center', paddingTop:0}}>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{color: 'rgba(0, 0, 0, 0.6)', fontSize: 18, fontWeight: '400', textAlign: 'center'}}>
                            {this.state.textHeader + ' '}
                        </Text>
                        <Icon name = 'arrow-down' style={{color: 'rgba(0, 0, 0, 0.6)', fontSize: 5, paddingTop: 10}}/>
                    </View>
                </TouchableOpacity>

                {showRightButton && <TouchableOpacity onPress = {() => {this.onFinishSelectImage()}} style={styles.rightContainer}>
                    <View >
                        <Text style = {styleText}>{I18n.t('photo_browser_header_done')}</Text>
                    </View>
                </TouchableOpacity>
                }
            </View>
        )
    }
}