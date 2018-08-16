import React, { Component } from 'react'
import { Modal, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import I18n from '~/ui/I18n'
import PopupConfirm from '~/ui/components/PopupConfirm'

const {height, width} = Dimensions.get('window')

export default class WannaUsedCamera extends Component {
    constructor(props) {
        super(props)
        
    }

    onDisagree = () => {
        const {onClose} = this.props

        if (onClose) onClose()        
    }

    onAgree = () => {
        const {onAccept} = this.props
        if (onAccept) onAccept()
    }

    componentWillReceiveProps(nextProps) {
        if (!!nextProps.isShow) {
            this.popupConfirm.open();
        } else {
            this.popupConfirm.close();
        }
    }

    open = () => {
        this.popupConfirm.open();
    }

    close = () => {
        this.popupConfirm.close();
    }

    _renderPopupConfirm = () => {
        return (
            <PopupConfirm
                content={I18n.t('camera_permission_text')}
                textButton1={I18n.t('cancel').toUpperCase()}
                textButton2={I18n.t('ok_vietnamese').toUpperCase()}
                onPressButton1={this.onDisagree}
                onPressButton2={this.onAgree}
                ref={ref => this.popupConfirm = ref}
            />
        );
    }

    render() {
        // if (!this.props.isShow)
        //     return false;

        return this._renderPopupConfirm();

        // return(
        //     <Modal
        //         transparent = {true}
        //         animationType = {"fade"}
        //         onRequestClose = {() => {}}
        //     >
        //         <View style = {{backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center', flex: 1}}>
        //             <View style = {{backgroundColor: 'white', width: '80%', padding: 15}}>
        //                 <Text style = {{color: 'rgba(0, 0, 0, 0.9)', fontSize: 15}}>
        //                     {I18n.t('camera_permission_text')}
        //                 </Text>
        //
        //                 <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
        //                     <TouchableWithoutFeedback onPress = {() => {this.onDisagree()}} >
        //                         <View>
        //                             <Text style = {{color: '#f16654', fontSize: 16, padding: 10, paddingBottom: 0}}>
        //                                 HUỶ
        //                             </Text>
        //                         </View>
        //                     </TouchableWithoutFeedback>
        //
        //                     <TouchableWithoutFeedback onPress = {() => {this.onAgree()}} >
        //                         <View>
        //                             <Text style = {{color: '#f16654', fontSize: 16, padding: 10, paddingBottom: 0}}>
        //                                 ĐỒNG Ý
        //                             </Text>
        //                         </View>
        //                     </TouchableWithoutFeedback>
        //                 </View>
        //             </View>
        //         </View>
        //     </Modal>
        // )
    }
}