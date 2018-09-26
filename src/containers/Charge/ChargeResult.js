import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, ScrollView, BackHandler, Platform } from 'react-native'
import { Surface, Toolbar, Text, Icon, Button, TextInput } from '~/src/themes/ThemeComponent'
import BankAccountItem from '~/src/components/BankAccountItem'
import { Navigation } from 'react-native-navigation'
import Screen from '~/src/components/Screen'

const STEP = {
    CHOOSE_CARD: 'CHOOSE_CARD',
    INPUT: 'INPUT',
    RESULT: 'RESULT'
}
class ChargeResult extends React.PureComponent {
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
            loading: false
        }
    }

    _handleBack = () => {
        Navigation.pop(this.props.componentId)
        return true
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }

    _getHeader = () => {
        return {
            render: this._renderHeaderByStep
        }
    }

    _renderHeaderByStep = () => {
        const hintT = (this.state.step == STEP.CHOOSE_CARD ? 'charge_gigabank_hint' :
            this.state.step == STEP.INPUT ? 'charge_input_hint' : ''
        )
        const { cardItem } = this.props
        return (
            <Surface themeable={false} imageBackground>
                <Surface themeable={false} fakeToolbar />
                <Surface themeable={false} space20 />
                <Surface themeable={false} containerHorizontalSpace>
                    <Text white description t={'send_account'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <Surface themeable={false} space16 />
                <Surface themeable={false} containerHorizontalMargin>
                    <BankAccountItem
                        bankImage={cardItem.bankImage}
                        bankAccount={cardItem.bankAccount}
                        expireDate={cardItem.expireDate}
                        onPress={() => { }}
                        active={false}
                        verticalMargin={false}
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
                            bankImage={cardItem.bankImage}
                            bankAccount={cardItem.bankAccount}
                            expireDate={cardItem.expireDate}
                            onPress={() => { }}
                            active={true}
                            verticalMargin={false}
                        />
                    </Surface>
                    <Surface floatBankItemPart />
                </Surface>
            </Surface>
        )


    }

    _renderContent = () => {
        return (
            <Surface content>
                <Surface containerHorizontalSpace titleInfoBlock>
                    <Text darkBlue titleInfo t={'transaction_info'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <Surface containerHorizontalMargin>
                    <Surface rowSpacebetween>
                        <Text infoResult t='transaction_code' />
                        <Text infoResult>X12AA22</Text>
                    </Surface>
                    <Surface rowSpacebetween>
                        <Text infoResult t='money_number' />
                        <Text infoResult>5.000.000VND</Text>
                    </Surface>
                    <Surface rowSpacebetween>
                        <Text infoResult t='discount' />
                        <Text infoResult>5.000VND</Text>
                    </Surface>

                    <Surface rowSpacebetween>
                        <Text infoResult t='fee' />
                        <Text infoResult>11.000VND</Text>
                    </Surface>
                    <Surface rowSpacebetween>
                        <Text infoResult t='gigabank_balance' />
                        <Text infoResult>30.000.000VND</Text>
                    </Surface>
                    <Surface rowSpacebetween>
                        <Text infoResult t='discount_balance' />
                        <Text infoResult>30.000VND</Text>
                    </Surface>
                    <Surface rowSpacebetween>
                        <Text infoResult t='transaction_time' />
                        <Text infoResult>15:11 17/07/2018</Text>
                    </Surface>
                </Surface>
            </Surface>
        )
    }

    _renderBottomButtonByStep = () => {
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

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }

    render() {

        return (
            <Screen
                content={this._renderContent}
                header={this._getHeader()}
                toolbarTitleT={'transaction_result'}
                hanleBack={this._handleBack}
                componentId={this.props.componentId}
                loading={this.state.loading}
            />
        )

        const titleT = 'transaction_result'
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
                </ImageBackground>
            </Surface >
        )
    }
}

export default connect(null, {})(ChargeResult)