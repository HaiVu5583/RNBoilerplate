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

// const STEP = {
//     CHOOSE_CARD: 'CHOOSE_CARD',
//     INPUT: 'INPUT',
//     RESULT: 'RESULT'
// }

class WithDrawInfo extends React.PureComponent {
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
            // step: STEP.CHOOSE_CARD,
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
                bankName: 'WB',
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
        // const hintT = (this.state.step == STEP.CHOOSE_CARD ? 'charge_gigabank_hint' :
        //     this.state.step == STEP.INPUT ? 'charge_input_hint' : ''
        // )
        const selectedCardItem = this.bankAccount.filter(item => item.id == this.state.selecteCard)[0]
        // if (this.state.step == STEP.CHOOSE_CARD) {
        //     return (
        //         <Surface themeable={false} style={styles.imageBackgroundSmall}>
        //             <Surface themeable={false} containerHorizontalSpace>
        //                 <Text white description t={hintT} />
        //             </Surface>
        //             <Surface themeable={false} space16 />
        //             <MaskBalanceView money={'120000'} />
        //         </Surface>
        //     )
        // } else if (this.state.step == STEP.INPUT) {
            return (
                <Surface themeable={false} style={styles.imageBackgroundSmallFloat}>
                    <Surface themeable={false} containerHorizontalSpace>
                        <Text white description t={'with_draw_info_description'} />
                    </Surface>
                    <Surface themeable={false} flex />
                    <Surface themeable={false} containerHorizontalMargin style={{ zIndex: 100 }}>
                        <BankAccountItem
                            bankImage={selectedCardItem.bankImage}
                            // bankAccount={selectedCardItem.bankAccount}
                            // expireDate={selectedCardItem.expireDate}
                            bankName={selectedCardItem.bankName}
                            onPress={() => { }}
                            active={true}
                        />
                    </Surface>
                    <Surface style={styles.fakeFloatPart} />
                </Surface>
            )
        // } else if (this.state.step == STEP.RESULT) {
        //     return (
        //         <Surface themeable={false} style={styles.imageBackgroundSmall}>
        //             <Surface themeable={false} containerHorizontalSpace>
        //                 <Text white description t={'send_account'} textTransform={String.prototype.toUpperCase} />
        //             </Surface>
        //             <Surface themeable={false} space16 />
        //             <Surface themeable={false} containerHorizontalMargin>
        //                 <BankAccountItem
        //                     bankImage={selectedCardItem.bankImage}
        //                     bankAccount={selectedCardItem.bankAccount}
        //                     expireDate={selectedCardItem.expireDate}
        //                     onPress={() => { }}
        //                     active={false}
        //                 />
        //             </Surface>
        //             <Surface themeable={false} space16 />
        //             <Surface themeable={false} containerHorizontalSpace>
        //                 <Text white description t={'receive_account'} textTransform={String.prototype.toUpperCase} />
        //             </Surface>
        //             <Surface themeable={false} space16 />
        //             <Surface themeable={false}>
        //                 <Surface themeable={false} containerHorizontalMargin style={{ zIndex: 100 }}>
        //                     <BankAccountItem
        //                         bankImage={selectedCardItem.bankImage}
        //                         bankAccount={selectedCardItem.bankAccount}
        //                         expireDate={selectedCardItem.expireDate}
        //                         onPress={() => { }}
        //                         active={true}
        //                     />
        //                 </Surface>
        //                 <Surface style={styles.fakeFloatPart} />
        //             </Surface>
        //         </Surface>
        //     )
        // }
    }

    _renderContentByStep = () => {
        // if (this.state.step == STEP.CHOOSE_CARD) {
        //     return (
        //         <ScrollView>
        //             <Surface containerHorizontalMargin flex>
        //                 <Surface themeable={false} space20 />
        //                 {this.bankAccount.map((item) => (
        //                     <Surface themeable={false} key={item.id}>
        //                         <BankAccountItem
        //                             bankImage={item.bankImage}
        //                             bankAccount={item.bankAccount}
        //                             expireDate={item.expireDate}
        //                             onPress={() => this._handlePressBankItem(item)}
        //                             active={this.state.selecteCard == item.id}
        //                         />
        //                         <Surface themeable={false} space16 />
        //                     </Surface>
        //                 ))}
        //                 <Button
        //                     flat
        //                     rowStart
        //                     leftComponent={() => (
        //                         <Icon name='GB_plus' style={{ fontSize: 24, color: COLORS.BLUE }} />
        //                     )}
        //                     centerComponent={() => (
        //                         <Text blue t='add_link_card' />
        //                     )}
        //                     style={{ paddingLeft: 0, paddingRight: 0 }}
        //                 />
        //             </Surface>
        //         </ScrollView>
        //     )
        // } else if (this.state.step == STEP.INPUT) {
            return (
                <Surface containerHorizontalSpace flex>
                    <Surface themeable={false} space16 />
                    <TextInput
                        // descriptionIcon={'GB_recharge'}
                        placeholderT={'bank_number'}
                        blackWithDarkblueIcon
                        onChangeText={text => this.setState({ bankAccount: text })}
                        keyboardType='number-pad'
                        value={this.state.bankAccount }
                        iconRight={'GB_close'}
                        onPressIconRight={() => this.setState({ bankAccount: '' })}
                        showIconRight={(this.state.bankAccount && this.state.bankAccount.trim())}
                        hasError={true}
                        errorText={this.state.errorMessage}
                    />
                    <TextInput
                        // descriptionIcon={'GB_pass'}
                        placeholderT={'bank_account'}
                        blackWithDarkblueIcon
                        onChangeText={text => this.setState({ accountName: text })}
                        value={this.state.accountName}
                        secureTextEntry={true}
                    />
                    <TextInput
                        // descriptionIcon={'GB_pass'}
                        placeholderT={'with_draw_money'}
                        blackWithDarkblueIcon
                        onChangeText={text => this.setState({ moneyAmount: text })}
                        value={this.state.moneyAmount}
                        secureTextEntry={true}
                    />
                    <TextInput
                        // descriptionIcon={'GB_pass'}
                        placeholderT={'service_fee'}
                        blackWithDarkblueIcon
                        onChangeText={text => this.setState({ serviceFee: text })}
                        value={this.state.serviceFee}
                        secureTextEntry={true}
                    />
                    <TextInput
                        descriptionIcon={'GB_pass'}
                        placeholderT={'enter_pass'}
                        blackWithDarkblueIcon
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </Surface>
            )
        // } else if (this.state.step == STEP.RESULT) {
        //     return (
        //         <ScrollView>
        //             <Surface themeable={false} space20 />
        //             <Surface containerHorizontalSpace>
        //                 <Text darkBlue description t={'transaction_info'} textTransform={String.prototype.toUpperCase} />
        //             </Surface>
        //             <Surface themeable={false} space20 />
        //             <Surface containerHorizontalMargin>
        //                 <Surface rowSpacebetween>
        //                     <Text description t='transaction_code' />
        //                     <Text description>X12AA22</Text>
        //                 </Surface>
        //                 <Surface rowSpacebetween>
        //                     <Text description t='money_number' />
        //                     <Text description>5.000.000VND</Text>
        //                 </Surface>
        //                 <Surface rowSpacebetween>
        //                     <Text description t='discount' />
        //                     <Text description>5.000VND</Text>
        //                 </Surface>

        //                 <Surface rowSpacebetween>
        //                     <Text description t='fee' />
        //                     <Text description>11.000VND</Text>
        //                 </Surface>
        //                 <Surface rowSpacebetween>
        //                     <Text description t='gigabank_balance' />
        //                     <Text description>30.000.000VND</Text>
        //                 </Surface>
        //                 <Surface rowSpacebetween>
        //                     <Text description t='discount_balance' />
        //                     <Text description>30.000VND</Text>
        //                 </Surface>
        //                 <Surface rowSpacebetween>
        //                     <Text description t='transaction_time' />
        //                     <Text description>15:11 17/07/2018</Text>
        //                 </Surface>
        //             </Surface>
        //         </ScrollView>
        //     )
        // }
    }

    _renderBottomButtonByStep = () => {
        // if (this.state.step == STEP.CHOOSE_CARD) {
        //     return (
        //         <Surface containerHorizontalSpace rowAlignEnd>
        //             <Button
        //                 round full
        //                 noPadding
        //                 t={'continue'}
        //                 onPress={this._handleContinueChooseCard}
        //                 enable={true}
        //                 gradientButton={true}
        //                 rippleStyle={{ marginBottom: 10, width: '100%' }}
        //             />
        //         </Surface>
        //     )
        // } else if (this.state.step == STEP.INPUT) {
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
        // } else if (this.state.step == STEP.RESULT) {
        //     return (
        //         <Surface containerHorizontalSpace rowAlignEnd>
        //             <Button
        //                 round full outline-blue
        //                 noPadding
        //                 t={'go_back_home'}
        //                 onPress={this._handleGoHome}
        //                 enable={true}
        //                 style={{ marginBottom: 10 }}
        //             />
        //         </Surface>
        //     )
        // }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
        this.popupConfirm.open()
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
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: 'white' }}
                        titleT={'with_draw_info_title'}
                        titleStyle={{ color: 'white' }}
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

export default connect(null, {})(WithDrawInfo)