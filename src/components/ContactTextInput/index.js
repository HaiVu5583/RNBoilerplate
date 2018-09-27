import React from 'react';
import { TextInput, Surface } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import Permissions from 'react-native-permissions'
import { PERMISSION_RESPONSE } from '~/src/constants'
import PopupConfirm from '~/src/components/PopupConfirm'
import { DIALOG_MODE } from '~/src/constants'

export default class ContactTextInput extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    _openContactChooser = () => {
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.ContactChooser',
                passProps: {
                    onChooseContact: this._handleChooseContact
                }
            }
        })
    }

    _requestPermission = () => {
        Permissions.request('contacts').then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            console.log('check request permsion callback', { response });
            if (response == PERMISSION_RESPONSE.AUTHORIZED) {
                this._openContactChooser()
            } else {
                console.log('Permission Deny')
            }
        })
    }

    _handleChooseContact = (contact) => {
        const { onChooseContact } = this.props
        onChooseContact && onChooseContact(contact)
    }

    _handlePressContact = async () => {
        Permissions.check('contacts').then(response => {
            if (response != PERMISSION_RESPONSE.AUTHORIZED) {
                this.popupContactPermission && this.popupContactPermission.open()
            } else {
                this._openContactChooser()
            }
        })
    }


    render() {
        const { placeholderT = 'phone_receive_money_hint', error, ...rest} = this.props
        // onChangeText = { text => this.setState({ phone: text, errPhone: '' }) }
        // value = { formatPhoneNumber(this.state.phone) }
        return (
            <Surface themeable={false}>
                <PopupConfirm
                    animationType='none'
                    contentT={'grant_contact_permission_hint'}
                    titleT={'grant_permission'}
                    textYesT={'popup_confirmed'}
                    textNoT={'cancel'}
                    onPressYes={this._requestPermission}
                    mode={DIALOG_MODE.YES_NO}
                    ref={ref => this.popupContactPermission = ref} />
                <TextInput
                    placeholderT={placeholderT}
                    blackWithDarkblueIcon
                    keyboardType='number-pad'
                    iconRight={'GB_contact'}
                    onPressIconRight={this._handlePressContact}
                    showIconRight={true}
                    hasError={!!this.props.error}
                    errorText={this.props.error}
                    {...rest}
                />
            </Surface>
        )
    }
}