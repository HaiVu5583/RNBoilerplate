import React, { Component } from 'react'
import { Modal, View, Text, Dimensions, TouchableOpacity, Platform } from 'react-native'
import I18n from '~/ui/I18n'

const {height, width} = Dimensions.get('window')

export default class Deal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: props.show
        }

        // setInterval(() => {
        //     console.log('onInterval')
        //
        //     if (this.state.isShow == true) {
        //         this.setState({isShow: false})
        //         clearInterval()
        //     }
        // }, 3500)
    }

    componentWillReceiveProps(props) {
        this.setState({isShow: props.show})
        if (props.show == true) {
            this.open()
        }
    }

    changeState = () => {
        this.setState({isShow: !this.state.isShow})
    }

    open = () => {
        this.setState({isShow: true},
            () => {
                setTimeout(()=>this.setState({isShow: false}), 3000)
            }
        )
    }

    render() {
        const {maxImage} = this.props

        const alertText = I18n.t('upload_photo_limited').replace('xxx', maxImage)

        return (
            <Modal
                transparent = {true}
                visible = {this.state.isShow}
                animationType = {"fade"}
                onRequestClose = {() => {}}
                >
                <TouchableOpacity
                    onPress = {() => {this.changeState()}}
                >
                <View style = {{width, height, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {{backgroundColor: 'rgba(0, 0, 0, 0.6)', textAlign: 'center', width: '80%', padding: 15, fontSize: 15, color: 'white', overflow: 'hidden', borderRadius: 2}}>
                        {alertText}
                    </Text>
                </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}