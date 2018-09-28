import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import {
    ImageBackground,
    BackHandler,
    StatusBar, Platform,
    FlatList,
} from 'react-native'
import { Surface, Toolbar, Text, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import OTPCountdown from '~/src/containers/Authentication/OTPCountdown'
import {SCREENS} from '~/src/constants'

class BuyCardResult extends React.PureComponent {
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
            selecteCard: 1,
            bankAccount: '',
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

        this.cardDenominations = [
            {
                denominations: '10.000 VND',
                quantily: '3',
                discount: '10%',
            },
            {
                denominations: '500.000 VND',
                quantily: '2',
                discount: '11%',
            },
            {
                denominations: '200.000 VND',
                quantily: '2',
                discount: '19%',
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
    
    _handlePay = () => {
        Navigation.push(this.props.componentId, {
            component: {
                id: SCREENS.ALERT.id,
                name: SCREENS.ALERT.name,
                passProps: {
                    // const {headerTitle, title, image, description, buttonTitle} = this.props
                    headerTitle: 'transaction_result',
                    title: 'transaction_fail',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bing_logo_%282016%29.svg/1280px-Bing_logo_%282016%29.svg.png',
                    description: 'transaction_unclear',
                    actionTitle: 'you_need_support',
                    buttonTitle: 'go_back_home',
                    goHome: this._handleGoHome
                },
            }
        })
    }

    _handleViewCardCode = () => {
        Navigation.push(this.props.componentId, {
            component: {
                id: SCREENS.BUY_CARD_CODES.id,
                name: SCREENS.BUY_CARD_CODES.name,
                // passProps: {
                //     // const {headerTitle, title, image, description, buttonTitle} = this.props
                //     headerTitle: 'transaction_result',
                //     title: 'transaction_fail',
                //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bing_logo_%282016%29.svg/1280px-Bing_logo_%282016%29.svg.png',
                //     description: 'transaction_unclear',
                //     actionTitle: 'you_need_support',
                //     buttonTitle: 'go_back_home',
                //     goHome: this._handleGoHome
                // },
            }
        })
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }

    _renderHeaderByStep = () => {
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
    
    _renderContentHeaderByStep = () => {
        const selectedCardItem = this.bankAccount.filter(item => item.id == this.state.selecteCard)[0]
        return (
            <Surface themeable={false} imageBackgroundSmallFloat>
                <Surface themeable={false} style={{height: 35,}} />
                <Surface themeable={false} containerHorizontalSpace>
                    <Text white t='send_account' textTransform={String.prototype.toUpperCase}
                        style={{fontWeight: 'bold', marginBottom: 10,}}
                    />
                </Surface>
                <Surface themeable={false} style={{height: 17}} />
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
                <Surface style={{...styles.fakeFloatPart, height: 52}} />
            </Surface>
        )
    }

    _renderContentByStep = () => {
        return (
            <Surface style={{paddingHorizontal: 16,}}>
                <Surface themeable={false} space16 />
                <Text style={styles.chargePhoneInfo} t='transaction_info'
                    textTransform={String.prototype.toUpperCase}/>
                <Surface themeable={false} space20 />
                <Surface rowSpacebetween>
                    <Text description t={'transaction_code'} />
                    <Text description>X12AA22</Text>
                </Surface>
                <Surface themeable={false} space8 />
                <Surface rowSpacebetween>
                    <Text description flex t={'card_denominations'} style={{fontWeight: 'bold',}} />
                <Surface flex style={{alignItems: 'center',}}>
                    <Text description flex t={'sort_quantily'} style={{fontWeight: 'bold',}} />
                </Surface>
                <Surface flex>
                    <Text description flex t={'charge_phone_discount'} style={{fontWeight: 'bold', alignSelf: 'flex-end',}} />
                </Surface>
            </Surface>
            <FlatList
                data={this.cardDenominations}
                renderItem={this._renderItemCardDenominations}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id + '_' + index}
                bounces={false}
                style={{
                    marginRight: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                }}
            />
            <Surface themeable={false} space8 />
            <Surface rowSpacebetween>
            <Text description t={'transaction_time'} />
                <Text description>X12AA22</Text>
            </Surface>
            <Surface themeable={false} space8 />
            <Surface rowSpacebetween>
            <Text description t={'gigabank_balance'} />
                <Text description>X12AA22</Text>
            </Surface>
        </Surface>
        )
    }

    _renderItemCardDenominations = ({item, index}) => {
        return (
            <Surface rowSpacebetween style={{marginTop: 8,}}>
                <Text description flex>{item.denominations}</Text>
                <Surface flex style={{alignItems: 'center',}}>
                    <Text description>{item.quantily}</Text>
                </Surface>
                <Surface flex>
                    <Text description style={{alignSelf: 'flex-end',}}>{item.discount}</Text>
                </Surface>
            </Surface>
        )
    }

    _renderBottomButtonByStep = () => {
        return (
            <Surface containerHorizontalSpace flex style={{justifyContent: 'flex-end'}}>
                <Button
                    round full
                    noPadding
                    enable={true}
                    gradientButton={true}
                    t={'view_card_code'}
                    onPress={this._handleViewCardCode}
                />
                <Surface space16 />
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
        
        // Temp
        // let gen = Math.floor(Math.random() * Math.floor(2))
        // if (gen == 0) {
        //     this.setState({
        //         step: STEP.WAIT_OTP
        //     })
        // } else if (gen == 1) {
        //     this.setState({
        //         step: STEP.RESULT
        //     })
        // }
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
                    {this._renderHeaderByStep()}
                    {this._renderContentHeaderByStep()}
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

export default connect(null, {})(BuyCardResult)