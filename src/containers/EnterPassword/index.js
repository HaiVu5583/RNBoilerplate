import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, BackHandler, } from 'react-native'
import { Surface, Toolbar, Text, Button, TextInput } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import PopupConfirm from '~/src/components/PopupConfirm'
import { DIALOG_MODE } from '~/src/constants'
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

    }

    onAgree = () => {

    }
    
    _renderBottomButtonByStep = () => {
        // const enableChargeButton = !!(this.state.money && this.state.password)
        const enableChargeButton = true // Set temp
        return (
            <Surface rowAlignEnd>
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
                    <Surface containerHorizontalSpace flex>
                        <Surface themeable={false} space20 />
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
                        <Surface themeable={false} space8 style={styles.lineSpace} />
                        <Surface flex themeable={true}/>
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
                </ImageBackground>
            </Surface >
        )
    }
}

export default connect(null, {})(ChargePhone)