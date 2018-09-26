import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, BackHandler, StatusBar } from 'react-native'
import { Surface, Toolbar, Text, Button, TextInput } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import PopupConfirm from '~/src/components/PopupConfirm'
import { DIALOG_MODE, SCREENS } from '~/src/constants'
import Denominations from '~/src/components/Denominations'

class ChargePhone extends React.PureComponent {
    // static get options() {
    //     if (Platform.OS == 'android') {
    //         return {
    //             animations: {
    //                 push: DEFAULT_PUSH_ANIMATION,
    //                 pop: DEFAULT_POP_ANIMATION
    //             }
    //         }
    //     }
    //     return {}
    // }

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            errorMessage: 'jkf jkffkl sks',
        }
    }

    _handleBack = () => {

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
                    description: 'gigabank_balance_not_enough',
                    buttonTitle: 'go_back_home',
                    goHome: this._handleGoHome
                },
            }
        })
    }

    onAgree = () => {
        Navigation.push(this.props.componentId, {
            component: {
                id: SCREENS.CHARGE_PHONE_AUTHEN.id,
                name: SCREENS.CHARGE_PHONE_AUTHEN.name,
                // passProps: {
                //     // const {headerTitle, title, image, description, buttonTitle} = this.props
                //     headerTitle: 'transaction_result',
                //     title: 'transaction_fail',
                //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bing_logo_%282016%29.svg/1280px-Bing_logo_%282016%29.svg.png',
                //     description: 'gigabank_balance_not_enough',
                //     buttonTitle: 'go_back_home',
                //     goHome: this._handleGoHome
                // },
            }
        })
    }
    
    _renderBottomButtonByStep = () => {
        const enableChargeButton = true // Set temp
        return (
            <Surface containerHorizontalSpace rowAlignEnd flex>
                <Button
                    round full
                    noPadding
                    t={'continue'}
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
                        titleT={'hint_input_password'}
                        titleStyle={styles.titleStyle}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    <Surface themeable={false} space20 />
                    <Text white description t={'enter_password_please'} style={styles.description} />
                    <Surface themeable={false} space50 />
                    <Surface themeable={false} space20 />
                    <Surface space24 />
                    <Surface containerHorizontalSpace style={styles.textInputCover}>
                        <TextInput
                            descriptionIcon={'GB_pass'}
                            placeholderT={'hint_input_password'}
                            blackWithDarkblueIcon
                            onChangeText={text => this.setState({ password: text })}
                            value={this.state.password}
                            secureTextEntry={true}
                            hasError={this.state.errorMessage != '' ? true : false}
                            errorText={this.state.errorMessage}
                        />
                        </Surface>
                        
                        {this._renderBottomButtonByStep()}
                    
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

export default connect(null, {})(ChargePhone)