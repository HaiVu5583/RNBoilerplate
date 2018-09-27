import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, ScrollView, BackHandler, Platform, StatusBar } from 'react-native'
import { Surface, Toolbar, Text, Icon, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import MaskBalanceView from '~/src/components/MaskBalanceView'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import PopupConfirm from '~/src/components/PopupConfirm'
import I18n from '~/src/I18n'
import { DIALOG_MODE, SCREENS } from '~/src/constants'

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
            moneyAmount: '',
            serviceFee: '',
            password: '',
            errorMessage: 'jkf jkffkl sks',

            // selecteCard: 1,
            // bankAccount: '',
            // accountName: '',
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

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }
    
    // getBankAccount = () => {
    //     return this.state.bankAccount
    // }

    // getAccountName = () => {
    //     return this.state.accountName
    // }

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

    onDisagree = () => {
        Navigation.push(this.props.componentId, {
            component: {
                id: SCREENS.ALERT.id,
                name: SCREENS.ALERT.name,
                passProps: {
                    // const {headerTitle, title, image, description, buttonTitle} = this.props
                    headerTitle: 'transaction_result',
                    title: 'transaction_fail',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bing_logo_%282016%29.svg/1280px-Bing_logo_%282016%29.svg.png',
                    description: 'something_wrong',
                    buttonTitle: 'go_back_home',
                    goHome: this._handleGoHome
                },
            }
        })
    }

    onAgree = () => {
        Navigation.push(this.props.componentId, {
            component: {
                id: SCREENS.WITH_DRAW_AUTHEN.id,
                name: SCREENS.WITH_DRAW_AUTHEN.name,
                passProps: {
                    // const {headerTitle, title, image, description, buttonTitle} = this.props
                    headerTitle: 'transaction_result',
                    title: 'transaction_fail',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bing_logo_%282016%29.svg/1280px-Bing_logo_%282016%29.svg.png',
                    description: 'something_wrong',
                    buttonTitle: 'go_back_home',
                    goHome: this._handleGoHome
                },
            }
        })
    }
    
    _renderHeaderByStep = () => {
        const selectedCardItem = this.bankAccount.filter(item => item.id == this.state.selecteCard)[0]
            return (
                <Surface themeable={false} style={styles.imageBackgroundSmallFloat}>
                    <Surface themeable={false} containerHorizontalSpace>
                        <Text white description t={'with_draw_info_description'} />
                    </Surface>
                    <Surface themeable={false} flex />
                    <Surface themeable={false} containerHorizontalMargin style={{ zIndex: 100 }}>
                        <BankAccountItem
                            bankImage={selectedCardItem.bankImage}
                            bankAccount={selectedCardItem.bankAccount}
                            // expireDate={selectedCardItem.expireDate}
                            bankName={selectedCardItem.bankName}
                            onPress={() => { }}
                            active={true}
                        />
                    </Surface>
                    <Surface style={styles.fakeFloatPart} />
                </Surface>
            )
    }

    _renderContentByStep = () => {
        return (
            <Surface containerHorizontalSpace flex>
                <Surface themeable={false} space16 />
                {/* <TextInput
                    placeholderT={'bank_number'}
                    blackWithDarkblueIcon
                    onChangeText={text => this.setState({ bankAccount: text })}
                    keyboardType='number-pad'
                    value={this.state.bankAccount }
                    iconRight={'GB_close'}
                    onPressIconRight={() => this.setState({ bankAccount: '' })}
                    showIconRight={(this.state.bankAccount && this.state.bankAccount.trim())}
                    hasError={this.state.errorMessage != '' ? true : false}
                    errorText={this.state.errorMessage}
                /> */}
                {/* <TextInput
                    placeholderT={'bank_account'}
                    blackWithDarkblueIcon
                    onChangeText={text => this.setState({ accountName: text })}
                    value={this.state.accountName}
                    secureTextEntry={true}
                /> */}
                <TextInput
                    placeholderT={'with_draw_money'}
                    blackWithDarkblueIcon
                    onChangeText={text => this.setState({ moneyAmount: text })}
                    value={this.state.moneyAmount}
                    secureTextEntry={true}
                    hasError={this.state.errorMessage != '' ? true : false}
                    errorText={this.state.errorMessage}
                />
                <TextInput
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
    }

    _renderBottomButtonByStep = () => {
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
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }

    render() {
        return (
            <Surface flex>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    <Toolbar
                        themeable={false}
                        iconStyle={styles.iconStyle}
                        titleT={'with_draw_info_title'}
                        titleStyle={styles.titleStyle}
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
                        titleT={'alert_block_account_title'}
                        contentT={'alert_block_account'}
                        textNoT={'cancel'}
                        textYesT={'call'}
                        onPressNo={this.onDisagree}
                        onPressYes={this.onAgree}
                        mode = {DIALOG_MODE.YES_NO}
                        ref={ref => this.popupConfirm = ref}
                    />
                </ImageBackground>
            </Surface >
        )
    }
}

export default connect(null, {})(WithDrawInfo)