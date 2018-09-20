import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, ScrollView, BackHandler, Platform } from 'react-native'
import { Surface, Toolbar, Text, Icon, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import MaskBalanceView from '~/src/components/MaskBalanceView'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import { PermissionsAndroid } from 'react-native'
import Permissions from 'react-native-permissions'
import { PERMISSION_RESPONSE } from '~/src/constants'


const STEP = {
    PHONE_INPUT: 'PHONE_INPUT',
    DELETE_CARD: 'DELETE_CARD',
    INPUT: 'INPUT',
    RESULT: 'RESULT',
}
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
            selecteCard: 1,
            step: STEP.PHONE_INPUT,
            money: '',
            password: '',
            phone: ''
        }
        this.bankAccount = [
            {
                id: 1,
                bankImage: 'https://i1.wp.com/sysbox.com.au/wp-content/uploads/2017/06/inverted-old-visa1.png?fit: 500%2C316&ssl: 1',
                bankAccount: '7813737375432',
                expireDate: '09/19',
            },
            {
                id: 2,
                bankImage: 'https://banner2.kisspng.com/20171216/dcc/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg',
                bankAccount: '7813737375432',
                expireDate: '09/19',
            },
            {
                id: 3,
                bankImage: 'https://i1.wp.com/sysbox.com.au/wp-content/uploads/2017/06/inverted-old-visa1.png?fit=500%2C316&ssl=1',
                bankAccount: '7813737375432',
                expireDate: '09/19',
            }
        ]
    }

    _handleBack = () => {
        if (this.state.step == STEP.PHONE_INPUT) {
            console.log('Component Id', this.props.componentId)
            Navigation.pop(this.props.componentId)
        }
        return true
    }

    _handlePressAddCard = () => {
        console.log('Handle Press AddCard')
    }

    _handlePressBankItem = (item) => {
        if (item.id != this.state.selecteCard) {
            this.setState({ selecteCard: item.id })
        }
    }

    _handleContinuePhoneInput = () => {
        console.log('Continue Choose Card')
        this.setState({ step: STEP.INPUT })
    }

    _handleChargeMoney = () => {
        console.log('Press Charge Money')
        this.setState({ step: STEP.RESULT })
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }

    _handleDeleteCard = (item) => {
        console.log('Deleting', item)
        this.setState({
            selecteCard: item.id
        }, () => {
            this.setState({ step: STEP.DELETE_CARD })
        })
    }

    _deleteCard = () => {

    }

    _handleAddCard = () => {
        console.log('Pressing Add Card')
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.AddCard',
            }
        })
    }

    _handleChooseContact = (contact) => {
        console.log('Choose Contact', contact)
    }

    _handlePressContact = async () => {
        Permissions.request('contacts').then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            console.log('check request permsion callback', { response });
            if (response == PERMISSION_RESPONSE.AUTHORIZED) {
                Navigation.push(this.props.componentId, {
                    component: {
                        name: 'gigabankclient.ContactChooser',
                        passProps: {
                            onChooseContact: this._handleChooseContact
                        }
                    }
                })
            } else {
                console.log('Permission Deny')
            }
        })
    }

    _renderHeaderByStep = () => {

        let hintT = ''
        switch (this.state.step) {
            case STEP.PHONE_INPUT:
            default:
                hintT = 'money_transfer_hint'
                break
            case STEP.DELETE_CARD:
                hintT = 'delete_linked_card_hint'
                break
        }
        const selectedCardItem = this.bankAccount.filter(item => item.id == this.state.selecteCard)[0]
        if (this.state.step == STEP.PHONE_INPUT) {
            return (
                <Surface themeable={false} style={styles.imageBackgroundSmall}>
                    <Surface themeable={false} containerHorizontalSpace>
                        <Text white description t={hintT} />
                    </Surface>
                    <Surface themeable={false} space16 />
                </Surface>
            )
        } else if (this.state.step == STEP.RESULT) {
            return (
                <Surface themeable={false} style={styles.imageBackgroundSmallFloat}>
                    <Surface themeable={false} containerHorizontalSpace>
                        <Text white description t={'send_account'} textTransform={String.prototype.toUpperCase} />
                    </Surface>
                    <Surface themeable={false} space16 />
                    <Surface themeable={false} containerHorizontalMargin>
                        <BankAccountItem
                            bankImage={selectedCardItem.bankImage}
                            bankAccount={selectedCardItem.bankAccount}
                            expireDate={selectedCardItem.expireDate}
                            onPress={() => { }}
                            active={false}
                        />
                    </Surface>
                    <Surface themeable={false} space16 />
                    <Surface themeable={false} containerHorizontalSpace>
                        <Text white description t={'receive_account'} textTransform={String.prototype.toUpperCase} />
                    </Surface>
                    <Surface themeable={false} space16 />
                    <Surface themeable={false}>
                        <Surface themeable={false} containerHorizontalMargin style={{ zIndex: 100 }}>
                            <BankAccountItem
                                bankImage={selectedCardItem.bankImage}
                                bankAccount={selectedCardItem.bankAccount}
                                expireDate={selectedCardItem.expireDate}
                                onPress={() => { }}
                                active={true}
                            />
                        </Surface>
                        <Surface style={styles.fakeFloatPart} />
                    </Surface>
                </Surface>
            )
        }
    }

    _renderContentByStep = () => {
        if (this.state.step == STEP.PHONE_INPUT) {
            return (
                <Surface containerHorizontalSpace flex>
                    <Surface themeable={false} space16 />
                    <TextInput
                        placeholderT={'charge_input_money_hint'}
                        blackWithDarkblueIcon
                        onChangeText={text => this.setState({ phone: text })}
                        keyboardType='number-pad'
                        value={this.state.phone}
                        iconRight={'GB_contact'}
                        onPressIconRight={this._handlePressContact}
                        showIconRight={true}
                    />
                </Surface>
            )
        } else if (this.state.step == STEP.RESULT) {
            return (
                <ScrollView>
                    <Surface themeable={false} space20 />
                    <Surface containerHorizontalSpace>
                        <Text darkBlue description t={'transaction_info'} textTransform={String.prototype.toUpperCase} />
                    </Surface>
                    <Surface themeable={false} space20 />
                    <Surface containerHorizontalMargin>
                        <Surface rowSpacebetween>
                            <Text description t='transaction_code' />
                            <Text description>X12AA22</Text>
                        </Surface>
                        <Surface rowSpacebetween>
                            <Text description t='money_number' />
                            <Text description>5.000.000VND</Text>
                        </Surface>
                        <Surface rowSpacebetween>
                            <Text description t='discount' />
                            <Text description>5.000VND</Text>
                        </Surface>

                        <Surface rowSpacebetween>
                            <Text description t='fee' />
                            <Text description>11.000VND</Text>
                        </Surface>
                        <Surface rowSpacebetween>
                            <Text description t='gigabank_balance' />
                            <Text description>30.000.000VND</Text>
                        </Surface>
                        <Surface rowSpacebetween>
                            <Text description t='discount_balance' />
                            <Text description>30.000VND</Text>
                        </Surface>
                        <Surface rowSpacebetween>
                            <Text description t='transaction_time' />
                            <Text description>15:11 17/07/2018</Text>
                        </Surface>
                    </Surface>
                </ScrollView>
            )
        }
    }

    _renderBottomButtonByStep = () => {
        if (this.state.step == STEP.PHONE_INPUT) {
            return (
                <Surface containerHorizontalSpace rowAlignEnd>
                    <Button
                        round full
                        noPadding
                        t={'continue'}
                        onPress={this._handleContinuePhoneInput}
                        enable={!!this.state.phone}
                        gradientButton={true}
                        rippleStyle={{ marginBottom: 10, width: '100%' }}
                    />
                </Surface>
            )
        } else if (this.state.step == STEP.RESULT) {
            return (
                <Surface containerHorizontalSpace rowAlignEnd>
                    <Button
                        round full outline-blue
                        noPadding
                        t={'go_back_home'}
                        onPress={this._handleGoHome}
                        enable={true}
                        style={{ marginBottom: 10 }}
                    />
                </Surface>
            )
        }


    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }

    render() {
        let titleT = ''
        switch (this.state.step) {
            case STEP.PHONE_INPUT:
            default:
                titleT = 'money_transfer'
                break
            case STEP.DELETE_CARD:
                titleT = 'delete_linked_card'
                break
        }
        return (
            <Surface flex>
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: COLORS.WHITE }}
                        titleT={titleT}
                        titleStyle={{ color: COLORS.WHITE }}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    <Surface themeable={false} space20 />
                    {this._renderHeaderByStep()}
                    <Surface flex>
                        {this._renderContentByStep()}
                        <Surface themeable={false} space16 />
                        {this._renderBottomButtonByStep()}
                    </Surface>
                </ImageBackground>
            </Surface >
        )
    }
}

export default connect(null, {})(MoneyTransfer)