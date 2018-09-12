import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, ScrollView, BackHandler } from 'react-native'
import { Surface, Toolbar, Text, Icon, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import MaskBalanceView from '~/src/components/MaskBalanceView'
import { Navigation } from 'react-native-navigation'


const STEP = {
    CHOOSE_CARD: 'CHOOSE_CARD',
    INPUT: 'INPUT'
}
class Charge extends React.PureComponent {
    static get options() {
        return {
            animations: {
                push: DEFAULT_PUSH_ANIMATION,
                pop: DEFAULT_POP_ANIMATION
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            selecteCard: 1,
            step: STEP.CHOOSE_CARD,
            money: '',
            password: ''
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
        if (this.state.step == STEP.CHOOSE_CARD) {
            Navigation.pop(this.props.componentId)
        } else if (this.state.step == STEP.INPUT) {
            this.setState({ step: STEP.CHOOSE_CARD })
        }
        return true
    }

    _handlePressAddCard = () => {
        console.log('Handle Press AddCard')
    }

    _handlePressBankItem = (item) => {
        console.log('Press Item', item)
        if (item.id != this.state.selecteCard) {
            this.setState({ selecteCard: item.id })
        }
    }

    _handleContinueChooseCard = () => {
        console.log('Continue Choose Card')
        this.setState({ step: STEP.INPUT })
    }

    _handleChargeMoney = () => {
        console.log('Press Charge Money')
    }

    _renderHeaderByStep = () => {
        const hintT = (this.state.step == STEP.CHOOSE_CARD ? 'charge_gigabank_hint' :
            this.state.step == STEP.INPUT ? 'charge_input_hint' : ''
        )
        const selectedCardItem = this.bankAccount.filter(item => item.id == this.state.selecteCard)[0]
        return (
            <Surface themeable={false}>
                <Surface themeable={false} containerHorizontalSpace>
                    <Text white description t={hintT} />
                </Surface>
                <Surface themeable={false} space16 />
                {(this.state.step == STEP.CHOOSE_CARD) && <MaskBalanceView money={'120000'} />}
                {(this.state.step == STEP.INPUT) && <Surface themeable={false}>
                    <Surface themeable={false} containerHorizontalMargin style={{ zIndex: 100 }}>
                        <BankAccountItem
                            bankImage={selectedCardItem.bankImage}
                            bankAccount={selectedCardItem.bankAccount}
                            expireDate={selectedCardItem.expireDate}
                            onPress={() => { }}
                            active={true}
                        />
                    </Surface>
                    <Surface style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 35,
                        zIndex: 0
                    }} />
                </Surface>
                }
            </Surface>
        )
    }

    _renderContentByStep = () => {
        if (this.state.step == STEP.CHOOSE_CARD) {
            return (
                <ScrollView>
                    <Surface containerHorizontalMargin flex>
                        <Surface themeable={false} space20 />
                        {this.bankAccount.map((item) => (
                            <Surface themeable={false} key={item.id}>
                                <BankAccountItem
                                    bankImage={item.bankImage}
                                    bankAccount={item.bankAccount}
                                    expireDate={item.expireDate}
                                    onPress={() => this._handlePressBankItem(item)}
                                    active={this.state.selecteCard == item.id}
                                />
                                <Surface themeable={false} space16 />
                            </Surface>
                        ))}
                        <Button
                            flat
                            rowStart
                            leftComponent={() => (
                                <Icon name='GB_icon-41' style={{ fontSize: 24, color: COLORS.BLUE }} />
                            )}
                            centerComponent={() => (
                                <Text blue t='add_link_card' />
                            )}
                            style={{ paddingLeft: 0, paddingRight: 0 }}
                        />
                    </Surface>
                </ScrollView>
            )
        } else if (this.state.step == STEP.INPUT) {
            return (
                <Surface containerHorizontalSpace flex>
                    <Surface themeable={false} space16 />
                    <TextInput
                        descriptionIcon={'GB_icon-14'}
                        placeholderT={'charge_input_money_hint'}
                        blackWithDarkblueIcon
                        onChangeText={text => this.setState({ money: text })}
                        keyboardType='number-pad'
                        value={this.state.money}
                        iconRight={'GB_icon-31'}
                        onPressIconRight={() => this.setState({ money: '' })}
                        showIconRight={(this.state.money && this.state.money.trim())}
                    />
                    <TextInput
                        descriptionIcon={'GB_icon-28'}
                        placeholderT={'hint_input_password'}
                        blackWithDarkblueIcon
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </Surface>
            )
        }
    }

    _renderBottomButtonByStep = () => {
        if (this.state.step == STEP.CHOOSE_CARD) {
            return (
                <Surface containerHorizontalSpace rowAlignEnd>
                    <Button
                        round full
                        noPadding
                        t={'continue'}
                        onPress={this._handleContinueChooseCard}
                        enable={true}
                        gradientButton={true}
                        rippleStyle={{ marginBottom: 10, width: '100%' }}
                    />
                </Surface>
            )
        } else if (this.state.step == STEP.INPUT) {
            const enableChargeButton = !!(this.state.money && this.state.password)
            return (
                <Surface containerHorizontalSpace rowAlignEnd>
                    <Button
                        round full
                        noPadding
                        t={'charge_money'}
                        onPress={this._handleChargeMoney}
                        enable={enableChargeButton}
                        gradientButton={true}
                        rippleStyle={{ marginBottom: 10, width: '100%' }}
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
        const titleT = (this.state.step == STEP.CHOOSE_CARD ? 'charge_gigabank' :
            this.state.step == STEP.INPUT ? 'charge_info' : ''
        )
        return (
            <Surface flex>
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: 'white' }}
                        titleT={titleT}
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

export default connect(null, {})(Charge)