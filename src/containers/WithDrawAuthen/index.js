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
import PopupConfirm from '~/src/components/PopupConfirm'
import I18n from '~/src/I18n'
import { DIALOG_MODE } from '~/src/constants'
import OTPCountdown from '~/src/containers/Authentication/OTPCountdown'

const STEP = {
    WAIT_OTP: 'WAIT_OTP',
    ENTER_OTP: 'ENTER_OTP',
    RESULT: 'RESULT'
}

class WithDrawAuthen extends React.PureComponent {
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
            step: STEP.WAIT_OTP,
            authenCode: '',


            selecteCard: 1,
            bankAccount: '',
            accountName: '',
            moneyAmount: '',
            serviceFee: '',
            password: '',
            errorMessage: 'jkf jkffkl sks',
        }
        this.bankAccount = [
            {
                id: 1,
                bankImage: 'https://i1.wp.com/sysbox.com.au/wp-content/uploads/2017/06/inverted-old-visa1.png?fit: 500%2C316&ssl: 1',
                bankAccount: '7813737375432',
                expireDate: '09/19',
                bankName: 'Tài khoản Gigabank',
            },
            {
                id: 2,
                bankImage: 'https://banner2.kisspng.com/20171216/dcc/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg',
                bankAccount: '7813737375432',
                expireDate: '09/19',
                bankName: 'WB',
            },
            {
                id: 3,
                bankImage: 'https://i1.wp.com/sysbox.com.au/wp-content/uploads/2017/06/inverted-old-visa1.png?fit=500%2C316&ssl=1',
                bankAccount: '7813737375432',
                expireDate: '09/19',
                bankName: 'WB',
            }
        ]
    }

    _handleBack = () => {
        // if (this.state.step == STEP.CHOOSE_CARD) {
        //     console.log('Component Id', this.props.componentId)
        //     Navigation.pop(this.props.componentId)
        // } else if (this.state.step == STEP.INPUT) {
        //     this.setState({ step: STEP.CHOOSE_CARD })
        // } else if (this.state.step == STEP.RESULT) {
        //     this.setState({ step: STEP.INPUT })
        // }
        // return true
    }

    _handlePressAddCard = () => {
        console.log('Handle Press AddCard')
    }

    _handlePressBankItem = (item) => {
        if (item.id != this.state.selecteCard) {
            this.setState({ selecteCard: item.id })
        }
    }

    _handleContinueChooseCard = () => {
        console.log('Continue Choose Card')
        // this.setState({ step: STEP.INPUT })
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }
    
    getBankAccount = () => {
        return this.state.bankAccount
    }

    getAccountName = () => {
        return this.state.accountName
    }

    getMoneyAmount = () => {
        return this.state.moneyAmount
    }

    getServiceFee = () => {
        return this.state.serviceFee
    }

    getPassword = () => {
        return this.state.password
    }
    
    _handleWithDraw = () => {
        this.popupConfirm.open()
    }

    onAgree = () => {

    }
    
    _renderHeaderByStep = () => {
        if (this.state.step == STEP.WAIT_OTP || this.state.step == STEP.ENTER_OTP) {
            return (
                <Toolbar
                    themeable={false}
                    iconStyle={{ color: 'white' }}
                    titleT={'authen_transaction'}
                    titleStyle={{ color: 'white' }}
                    componentId={this.props.componentId}
                    onPressIconLeft={this._handleBack}
                />
            )
        } else if (this.state.step == STEP.RESULT) {
            return (
                <Toolbar
                    themeable={false}
                    iconStyle={{ color: 'white' }}
                    titleT={'transaction_result'}
                    titleStyle={{ color: 'white' }}
                    componentId={this.props.componentId}
                    onPressIconLeft={this._handleBack}
                />
            )
        }
    }
    
    _renderContentHeaderByStep = () => {
        const hintT = ((this.state.step == STEP.WAIT_OTP || this.state.step == STEP.ENTER_OTP) ? 'enter_otp' : 'send_account')
        const selectedCardItem = this.bankAccount.filter(item => item.id == this.state.selecteCard)[0]
        return (
            <Surface themeable={false} style={styles.imageBackgroundSmallFloat}>
                {this.state.step == STEP.RESULT
                    && <Surface themeable={false} style={{height: 35,}} />
                }
                {this.state.step != STEP.RESULT
                    && <Surface themeable={false} style={{height: 20,}} />
                }
                <Surface themeable={false} containerHorizontalSpace>
                    {this.state.step != STEP.RESULT
                        && <Text white description t={hintT}
                        style={{fontSize: 18}} />
                    }
                    {this.state.step == STEP.RESULT
                        && <Text white t={hintT} textTransform={String.prototype.toUpperCase}
                            style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10,}}
                        />
                    }
                </Surface>
                {this.state.step != STEP.RESULT
                    && <Surface themeable={false} style={{height: 20}} />
                }
                <Surface themeable={false} containerHorizontalMargin style={{ zIndex: 100 }}>
                    <BankAccountItem
                        bankImage={selectedCardItem.bankImage}
                        bankAccount={selectedCardItem.bankAccount}
                        // expireDate={selectedCardItem.expireDate}
                        bankName={selectedCardItem.bankName}
                        onPress={() => { }}
                        active={false}
                    />
                </Surface>
                <Surface style={styles.fakeFloatPart} />
            </Surface>
        )
    }

    _renderContentByStep = () => {
        if (this.state.step == STEP.WAIT_OTP || this.state.step == STEP.ENTER_OTP) {
            return (
                <Surface style={{paddingHorizontal: 16,}}>
                    <Surface themeable={false} space16 />
                    <Text style={{fontSize: 20, paddingLeft: 32,}} t='with_draw_info_title' textTransform={String.prototype.toUpperCase}/>
                    <Surface themeable={false} space20 />
                    <Surface rowSpacebetween >
                        <Text style={{fontSize: 18}} t={'account_number'} />
                        <Text style={{fontSize: 18}}>X12AA22</Text>
                    </Surface>
                    <Surface themeable={false} space10 />
                    <Surface rowSpacebetween>
                    <Text style={{fontSize: 18}} t={'bank_account'} />
                        <Text style={{fontSize: 18}}>X12AA22</Text>
                    </Surface>
                    <Surface themeable={false} space10 />
                    <Surface rowSpacebetween>
                    <Text style={{fontSize: 18}} t={'bank'} />
                        <Text style={{fontSize: 18}}>X12AA22</Text>
                    </Surface>
                    <Surface themeable={false} space24 />
                    <Surface themeable={false} style={{backgroundColor: '#29aae1', width: '100%', height: 1}}/>
                    <Surface themeable={false} space24 />
                    <Surface rowSpacebetween>
                    <Text style={{fontSize: 18}} t={'with_draw_money_amount'} />
                        <Text style={{fontSize: 18}}>X12AA22 VND</Text>
                    </Surface>
                    <Surface themeable={false} space10 />
                    <Surface rowSpacebetween>
                    <Text style={{fontSize: 18}} t={'service_fee'} />
                        <Text style={{fontSize: 18}}>X12AA22 VND</Text>
                    </Surface>
                </Surface>
            )
        } else if (this.state.step == STEP.RESULT) {
            return (
                <Surface style={{paddingHorizontal: 16,}}>
                    <Surface themeable={false} space16 />
                    <Text style={{fontSize: 20, paddingLeft: 32,}} t='receive_account' textTransform={String.prototype.toUpperCase}/>
                    <Surface themeable={false} space20 />
                    <Surface rowSpacebetween>
                        <Text style={{fontSize: 18}} t={'account_number'} />
                        <Text style={{fontSize: 18}}>X12AA22</Text>
                    </Surface>
                    <Surface themeable={false} space10 />
                    <Surface rowSpacebetween>
                    <Text style={{fontSize: 18}} t={'bank_account'} />
                        <Text style={{fontSize: 18}}>X12AA22</Text>
                    </Surface>
                    <Surface themeable={false} space10 />
                    <Surface rowSpacebetween>
                    <Text style={{fontSize: 18}} t={'bank'} />
                        <Text style={{fontSize: 18}}>X12AA22</Text>
                    </Surface>

                    <Surface themeable={false} space16 />
                    <Text style={{fontSize: 20, paddingLeft: 32,}} t='transaction_info' textTransform={String.prototype.toUpperCase}/>
                    <Surface themeable={false} space20 />
                    <Surface rowSpacebetween>
                        <Text style={{fontSize: 18}} t={'transaction_code'} />
                        <Text style={{fontSize: 18}}>X12AA22</Text>
                    </Surface>
                    <Surface themeable={false} space10 />
                    <Surface rowSpacebetween>
                    <Text style={{fontSize: 18}} t={'money_number'} />
                        <Text style={{fontSize: 18}}>X12AA22</Text>
                    </Surface>
                    <Surface themeable={false} space10 />
                    <Surface rowSpacebetween>
                    <Text style={{fontSize: 18}} t={'service_fee'} />
                        <Text style={{fontSize: 18}}>X12AA22</Text>
                    </Surface>
                    <Surface themeable={false} space10 />
                    <Surface rowSpacebetween>
                    <Text style={{fontSize: 18}} t={'gigabank_balance'} />
                        <Text style={{fontSize: 18}}>X12AA22</Text>
                    </Surface>
                    <Surface themeable={false} space10 />
                    <Surface rowSpacebetween>
                    <Text style={{fontSize: 18}} t={'transaction_time'} />
                        <Text style={{fontSize: 18}}>X12AA22</Text>
                    </Surface>
                </Surface>
            )
        }
    }

    _renderEnterCodeByStep = () => {
        if (this.state.step != STEP.RESULT) {
            // const enableChargeButton = !!(this.state.money && this.state.password)
            const enableChargeButton = true // Set temp
            return (
                <Surface flex style={{marginHorizontal: 16,}}>
                    <Surface themeable={false} space20 />
                    <TextInput
                        descriptionIcon={'GB_SMS'}
                        placeholderT={'authen_code'}
                        blackWithDarkblueIcon
                        onChangeText={text => this.setState({ authenCode: text })}
                        value={this.state.authenCode}
                        secureTextEntry={true}
                    />
                    <Surface themeable={false} fullWidth rowCenter>
                        <OTPCountdown time={60}
                        textColor={'black'}
                        secondColor={'yellow'}
                        onResend={() => {

                        }} />
                    </Surface>
                </Surface>
            )
        }
    }

    _renderBottomButtonByStep = () => {
        if (this.state.step == STEP.WAIT_OTP || this.state.step == STEP.ENTER_OTP) {
            // const enableChargeButton = !!(this.state.money && this.state.password)
            const enableChargeButton = true // Set temp
            return (
                <Surface containerHorizontalSpace rowAlignEnd>
                    <Button
                        round full
                        noPadding
                        t={'with_draw_money'}
                        onPress={this._handleWithDraw}
                        enable={enableChargeButton}
                        gradientButton={true}
                        rippleStyle={{ marginBottom: 10, width: '100%' }}
                    />
                </Surface>
            )
        } else if (this.state.step == STEP.RESULT) {
            return (
                <Surface containerHorizontalSpace rowAlignEnd flex>
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
        // const titleT = (this.state.step == STEP.CHOOSE_CARD ? 'charge_gigabank' :
        //     this.state.step == STEP.INPUT ? 'charge_info' : 'transaction_result'
        // )
        return (
            <Surface flex>
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    {/* <Toolbar
                        themeable={false}
                        iconStyle={{ color: 'white' }}
                        titleT={'with_draw_info_title'}
                        titleStyle={{ color: 'white' }}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    <Surface themeable={false} space20 /> */}
                    {this._renderHeaderByStep()}
                    {this._renderContentHeaderByStep()}
                    <Surface flex>
                        {this._renderContentByStep()}
                        <Surface themeable={false} space16 />
                        {this.state.step != STEP.RESULT
                            && <Surface themeable={false} space8 style={{backgroundColor: COLORS.LIGHT_GRAY}} />
                        }
                        {this._renderEnterCodeByStep()}
                        {this._renderBottomButtonByStep()}
                    </Surface>
                    
                    <PopupConfirm
                        // title={I18n.t('alert_block_account_title')}
                        titleT={'alert_block_account_title'}
                        contentT={'alert_block_account'}
                        textNoT={'cancel'}
                        textYesT={'call'}
                        onPressButton1={this.onDisagree}
                        onPressButton2={this.onAgree}
                        mode = {DIALOG_MODE.YES_NO}
                        ref={ref => this.popupConfirm = ref}
                    />


                    {/* <Surface style={{ height: 200 }}>
                        <Surface containerHorizontalSpace flex rowAlignEnd>
                            <Surface themeable={false} flex>
                                <BankAccountItem
                                    bankImage='https://i1.wp.com/sysbox.com.au/wp-content/uploads/2017/06/inverted-old-visa1.png?fit=500%2C316&ssl=1'
                                    bankAccount='7813737375432'
                                    expireDate='09/19'
                                    active={true}
                                />
                                <Button round full
                                    t={'add_card'}
                                    onPress={this._handlePressAddCard}
                                    enable={true}
                                    gradientButton={true}
                                    style={{marginBottom: 10}}
                                />
                            </Surface>
                        </Surface>
                    </Surface> */}
                </ImageBackground>
            </Surface >
        )
    }
}

export default connect(null, {})(WithDrawAuthen)