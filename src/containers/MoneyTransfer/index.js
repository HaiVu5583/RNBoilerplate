import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION } from '~/src/themes/common'
import { BackHandler, Platform } from 'react-native'
import { Surface, TextInput } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import Permissions from 'react-native-permissions'
import { PERMISSION_RESPONSE } from '~/src/constants'
import { formatPhoneNumber, isValidPhoneNumer } from '~/src/utils'
import I18n from '~/src/I18n'
import Screen from '~/src/components/Screen'
import PopupConfirm from '~/src/components/PopupConfirm'
import { DIALOG_MODE } from '~/src/constants'

class MoneyTransfer extends React.PureComponent {
    static get options() {
        if (Platform.OS == 'android') {
            return {
                animations: {
                    push: DEFAULT_PUSH_ANIMATION,
                    pop: DEFAULT_POP_ANIMATION
                }
            }
        }
        return {}
    }

    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            errPhone: '',
            loading: false
        }
        this.fakeBankAccount = {
            id: 2,
            bankImage: 'https://banner2.kisspng.com/20171216/dcc/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg',
            bankAccount: '7813737375432',
            expireDate: '09/19',
            active: false
        }
    }

    _handleBack = () => {
        Navigation.pop(this.props.componentId)
        return true
    }

    _handleContinuePhoneInput = () => {
        console.log('Continue Choose Card')
        const phoneNumber = this.state.phone.replace(/\s/g, '')
        if (!isValidPhoneNumer(phoneNumber)) {
            this.setState({ errPhone: I18n.t('err_invalid_phone_number') })
        } else {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'gigabankclient.MoneyTransferInfo'
                }
            })
        }
    }

    _openContactChooser = () => {
        Navigation.push(this.props.componentId, {
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
        console.log('Choose Contact', contact)
        this.setState({ phone: contact })
    }

    _handlePressContact = async () => {
        Permissions.check('contacts').then(response => {
            if (response != PERMISSION_RESPONSE.AUTHORIZED) {
                this.popupContactPermission && this.popupContactPermission.open()
            }else{
                this._openContactChooser()
            }
        })
    }

    _getHeader = () => {
        return {
            titleT: 'money_transfer_hint',
            floatBankItem: true,
            bankItemInfo: this.fakeBankAccount
        }
    }

    _renderContent = () => {
        return (
            <Surface containerHorizontalSpace content flex>
                <Surface themeable={false} space40 />
                <TextInput
                    placeholderT={'phone_receive_money_hint'}
                    blackWithDarkblueIcon
                    onChangeText={text => this.setState({ phone: text, errPhone: '' })}
                    keyboardType='number-pad'
                    value={formatPhoneNumber(this.state.phone)}
                    iconRight={'GB_contact'}
                    onPressIconRight={this._handlePressContact}
                    showIconRight={true}
                    hasError={!!this.state.errPhone}
                    errorText={this.state.errPhone}
                />
            </Surface>
        )
    }


    _getBottomButtonByStep = () => {
        return {
            show: true,
            t: 'continue',
            onPress: this._handleContinuePhoneInput,
            enable: !!this.state.phone
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }

    render() {
        return (
            <Surface themeable={false} flex>
                <PopupConfirm
                    animationType='none'
                    contentT={'grant_contact_permission_hint'}
                    titleT={'grant_permission'}
                    textYesT={'popup_confirmed'}
                    textNoT={'cancel'}
                    onPressYes={this._requestPermission}
                    mode={DIALOG_MODE.YES_NO}
                    ref={ref => this.popupContactPermission = ref} />
                <Screen
                    content={this._renderContent}
                    header={this._getHeader()}
                    toolbarTitleT={'money_transfer'}
                    hanleBack={this._handleBack}
                    componentId={this.props.componentId}
                    loading={this.state.loading}
                    bottomButton={this._getBottomButtonByStep()}
                />
            </Surface>
        )
    }
}

export default connect(null, {})(MoneyTransfer)