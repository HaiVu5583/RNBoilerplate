import PopupConfirm from './index'
import React from 'react'
import { Modal, View, Text } from 'react-native'
import ClingmeUtils from '~/utils/ClingmeUtils'
import ClingmeTracking from '~/utils/ClingmeTracking'

export default class DialogBox extends React.PureComponent {
	constructor(props) {
        super(props);
                
    }


    componentDidMount() {
        ClingmeUtils.getUserData().then(data => {
            const {screen, type, msg} = this.props.params
        
            ClingmeTracking.errorNotified(screen, data.deviceId, data.userId, data.nickName, type, JSON.stringify(msg))            
        })
        
    }

    _onButtonPressed = (buttonIndex) => {
    	const {clingmeIdentifier} = this.props
    	ClingmeUtils.nativeViewSendMessage('' + clingmeIdentifier, 'button_clicked', { buttonIndex: buttonIndex})
    }


    render() {
    	let {message, firstButton, secondButton, thirdButton} = this.props.params

    	if (!!firstButton)
    		firstButton = firstButton.toUpperCase()

    	if (!!secondButton)
    		secondButton = secondButton.toUpperCase()

    	if (!!thirdButton)
    		thirdButton = thirdButton.toUpperCase()

    	return (
    		<PopupConfirm
                    useNormalView={true}
    				visible={true}
                    content={message}
                    boldPart={""}
                    textButton1={firstButton}
                    textButton2={secondButton}
                    textButton3={thirdButton}
                    onPressButton1={() => this._onButtonPressed(0)}
                    onPressButton2={() => this._onButtonPressed(1)}
                    onPressButton3={() => this._onButtonPressed(2)}
                    ref={ref => this._popup = ref} />
            )
    }
}