import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, BackHandler, StatusBar, Platform } from 'react-native'
import { Surface, Toolbar, Text, Button, TextInput } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import PopupConfirm from '~/src/components/PopupConfirm'
import { DIALOG_MODE, SCREENS } from '~/src/constants'
import Denominations from '~/src/components/Denominations'

class ChargePhone extends React.PureComponent {
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
            authenCode: '',
            errorMessage: 'jkf jkffkl sks',
        }
    }

    _handleBack = () => {

    }
    
    _handlePressBankItem = (item) => {
        if (item.id != this.state.selecteCard) {
            this.setState({ selecteCard: item.id })
        }
    }

    _handleContinueChooseCard = () => {

    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }
    
    _handlePressButton = () => {
        // this.popupConfirm.open()
        Navigation.push(this.props.componentId, {
            component: {
                id: SCREENS.MONEY_SOURCE.id,
                name: SCREENS.MONEY_SOURCE.name,
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

    onAgree = () => {

    }
    
    _renderBottomButtonByStep = () => {
        // const enableChargeButton = !!(this.state.money && this.state.password)
        const enableChargeButton = true // Set temp
        return (
            <Surface containerHorizontalSpace rowAlignEnd flex>
                <Button
                    round full
                    noPadding
                    t={'continue'}
                    onPress={this._handlePressButton}
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

        const items = [
            {
                id: 1,
                isSeleected: false,
                text: '10.000',
            },
            {
                text: '20.000',
            },
            {
                text: '30.000',
            },
            {
                text: '40.000',
            },
            {
                text: '50.000',
            },
            {
                text: '60.000',
            },
        ]

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
                        titleT={'charge_phone'}
                        titleStyle={styles.titleStyle}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    <Surface themeable={false} style={styles.descriptionCover}>
                        <Text white description t={'with_draw_description'} style={styles.description} />
                    </Surface>
                    <Surface space40 />
                    <Surface containerHorizontalSpace style={styles.textInputCover}>
                        <TextInput
                            iconRight={'GB_contact'}
                            placeholderT={'charge_phone_money_hint'}
                            blackWithDarkblueIcon
                            onChangeText={text => this.setState({ authenCode: text })}
                            value={this.state.authenCode}
                            secureTextEntry={true}
                            hasError={this.state.errorMessage != '' ? true : false}
                            errorText={this.state.errorMessage}
                        />
                    </Surface>
                    <Surface space20 />
                    <Surface themeable={false} space8 style={styles.lineSpace} />
                    <Surface space24 />
                    <Surface>
                        <Text t={'choose_denominations'} style={styles.titleList} textTransform={String.prototype.toUpperCase}/>
                    </Surface>
                    <Surface space12 />
                    <Surface>
                        <Denominations
                            datas={items}
                            numColumns={4}
                        />
                    </Surface>
                    <Surface>
                        <Surface space12 />
                        <Text t={'limit_money'} style={styles.limitMoney} />
                    </Surface>
                    {this._renderBottomButtonByStep()}

                    <PopupConfirm
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