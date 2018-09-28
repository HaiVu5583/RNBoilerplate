import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import {
    ImageBackground,
    BackHandler,
    StatusBar, Platform,
    FlatList,
    Image,
    SectionList,
} from 'react-native'
import { Surface, Toolbar, Text, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS, SURFACE_STYLES, SIZES } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import OTPCountdown from '~/src/containers/Authentication/OTPCountdown'
import {SCREENS} from '~/src/constants'
import LinearGradient from 'react-native-linear-gradient'
import Ripple from 'react-native-material-ripple'
import { maskBankAccount, getElevation } from '~/src/utils'
import PopupCopy from './PopupCopy'
import Carousel from 'react-native-snap-carousel'

class BuyCardCodes extends React.PureComponent {
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
            activeBrand: 0,
        }

        this.cardBrands = [
            {
                id: 1,
                brandName: 'MobiFone',
                brandIcon: 'http://images1.cafef.vn/Images/Uploaded/DuLieuDownload/LogoCorpLarge/MOBIFONE.png',
            },
            {
                id: 2,
                brandName: 'VinaPhone',
                brandIcon: 'https://upload.wikimedia.org/wikipedia/vi/thumb/c/c7/Vinaphone_Logo.svg/1280px-Vinaphone_Logo.svg.png',
            },
            {
                id: 3,
                brandName: 'Viettel',
                brandIcon: 'http://tieudungplus.vn/media/uploaded/17/2016/09/23/viettel-dat-90-trieu-thue-bao-lot-top-30-nha-mang-co-nhieu-khach-hang-nhat-the-gioi-1-tieudungplus.jpg',
            },
            {
                id: 4,
                brandName: 'Vietnamobile',
                brandIcon: 'https://upload.wikimedia.org/wikipedia/vi/thumb/a/a8/Vietnamobile_Logo.svg/1280px-Vietnamobile_Logo.svg.png',
            },
            {
                id: 5,
                brandName: 'Gmobile',
                brandIcon: 'https://naptien24h.vn/Uploads/2017-06/20170602114406huong-dan-mua-the-nap-tien-gmobile-online.jpg',
            }
        ]

        this.sectionDatas = [
            {
                header: 'header 1',
                data: [
                    {
                        id: 1,
                        brandName: 'MobiFone',
                        brandIcon: 'http://images1.cafef.vn/Images/Uploaded/DuLieuDownload/LogoCorpLarge/MOBIFONE.png',
                        seriNumber: '8393938383',
                        expireDate: '21/11/2019',
                        cardCode: '112345123123123'
                    },
                    {
                        id: 2,
                        brandName: 'MobiFone',
                        brandIcon: 'http://images1.cafef.vn/Images/Uploaded/DuLieuDownload/LogoCorpLarge/MOBIFONE.png',
                        seriNumber: '8393938383',
                        expireDate: '21/11/2019',
                        cardCode: '112345123123123'
                    },
                ]
            },
            {
                header: 'header 2',
                data: [
                    {
                id: 2,
                brandName: 'VinaPhone',
                brandIcon: 'https://upload.wikimedia.org/wikipedia/vi/thumb/c/c7/Vinaphone_Logo.svg/1280px-Vinaphone_Logo.svg.png',
                seriNumber: '8393938383',
                        expireDate: '21/11/2019',
                        cardCode: '112345123123123'
                    },
                    {
                        id: 2,
                        brandName: 'VinaPhone',
                        brandIcon: 'https://upload.wikimedia.org/wikipedia/vi/thumb/c/c7/Vinaphone_Logo.svg/1280px-Vinaphone_Logo.svg.png',
                        seriNumber: '8393938383',
                                expireDate: '21/11/2019',
                                cardCode: '112345123123123'
                            },
                        ]
            },
            {
                header: 'header 3',
                data: [
                    {
                id: 3,
                brandName: 'Viettel',
                brandIcon: 'http://tieudungplus.vn/media/uploaded/17/2016/09/23/viettel-dat-90-trieu-thue-bao-lot-top-30-nha-mang-co-nhieu-khach-hang-nhat-the-gioi-1-tieudungplus.jpg',
                seriNumber: '8393938383',
                                expireDate: '21/11/2019',
                                cardCode: '112345123123123',
                },
                {
                    id: 3,
                    brandName: 'Viettel',
                    brandIcon: 'http://tieudungplus.vn/media/uploaded/17/2016/09/23/viettel-dat-90-trieu-thue-bao-lot-top-30-nha-mang-co-nhieu-khach-hang-nhat-the-gioi-1-tieudungplus.jpg',
                    seriNumber: '8393938383',
                                    expireDate: '21/11/2019',
                                    cardCode: '112345123123123',
                    },
                ]
            },
            {
                header: 'header 4',
                data: [
                    {
                id: 4,
                brandName: 'Vietnamobile',
                brandIcon: 'https://upload.wikimedia.org/wikipedia/vi/thumb/a/a8/Vietnamobile_Logo.svg/1280px-Vietnamobile_Logo.svg.png',
                seriNumber: '8393938383',
                                expireDate: '21/11/2019',
                                cardCode: '112345123123123',
                    },
                    {
                        id: 4,
                        brandName: 'Vietnamobile',
                        brandIcon: 'https://upload.wikimedia.org/wikipedia/vi/thumb/a/a8/Vietnamobile_Logo.svg/1280px-Vietnamobile_Logo.svg.png',
                        seriNumber: '8393938383',
                                        expireDate: '21/11/2019',
                                        cardCode: '112345123123123',
                            }
                        ]
            },
            {
                header: 'header 5',
                data: [
                    {
                id: 5,
                brandName: 'Gmobile',
                brandIcon: 'https://naptien24h.vn/Uploads/2017-06/20170602114406huong-dan-mua-the-nap-tien-gmobile-online.jpg',
                seriNumber: '8393938383',
                                        expireDate: '21/11/2019',
                                        cardCode: '112345123123123',
                    },
                    {
                        id: 5,
                        brandName: 'Gmobile',
                        brandIcon: 'https://naptien24h.vn/Uploads/2017-06/20170602114406huong-dan-mua-the-nap-tien-gmobile-online.jpg',
                        seriNumber: '8393938383',
                        expireDate: '21/11/2019',
                        cardCode: '112345123123123',
                    },
                ]
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

    _handleCopy = () => {
        this.popupCopyRef.open()
    }

    _handleChargeNow = () => {
        alert('Charge Now is real')
    }

    onPressOverlay = () => {
        this.popupCopyRef.close()
    }

    copyChargeSyntax = () => {
        alert('_copyChargeSyntax')
    }

    copyChargeCode = () => {
        alert('_copyChargeCode')
    }

    copySeri = () => {
        alert('_copySeri')
    }

    copyChargeCodeSeri = () => {
        alert('_copyChargeCodeSeri')
    }

    _renderContentHeader = () => {
        return (
            <Surface themeable={false} imageBackgroundSmallFloat>
                <Surface themeable={false} space10 />
                <Surface themeable={false} containerHorizontalSpace>
                    <Text white t='bought_cards' style={{marginBottom: 10,}}
                    />
                </Surface>
                <Surface themeable={false} space24 />
                {/* <Surface themeable={false} style={{ zIndex: 100, }} style={{height: 100, backgroundColor: '#455433'}}> */}
                    {this._renderCardBrand()}
                {/* </Surface> */}
                <Surface style={{...styles.fakeFloatPart, height: 58}} />
            </Surface>
        )
    }
    
    _renderCardBrand = () => {
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.cardBrands}
                renderItem={this._renderItemCardBrand}
                sliderWidth={DEVICE_WIDTH}
                itemWidth={81}
                onSnapToItem={(index) => this.setState({ activeBrand: index })}
                loop={false}
                containerCustomStyle={{
                    zIndex: 100,
                }}
            />

            // <FlatList
            //     data={this.cardBrands}
            //     renderItem={this._renderItemCardBrand}
            //     showsHorizontalScrollIndicator={false}
            //     keyExtractor={(item, index) => item.id + '_' + index}
            //     bounces={false}
            //     horizontal={true}                
            //     style={{
            //         marginLeft: DEVICE_WIDTH/2 - 54/2 - SIZES.CONTAINER_HORIZONTAL_MARGIN
            //     }}
            // />
        )
    }

    _renderItemCardBrand = ({item, index}) => {
        return (
            <Surface themeable={false} flex>
                <Ripple>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.05)']}
                        start={{ x: 0.0, y: 0.0 }}
                                end={{ x: 1.0, y: 0.0 }}
                                locations={[0.0, 1.0]}
                                style={{
                                    width: 80,
                                    height: 54,
                                    borderRadius: 17,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                        <Image
                            source={{ uri: item.brandIcon }}
                            style={{
                                width: 76,
                                height: 50,
                                borderRadius: 15,
                            }}
                        />
                    </LinearGradient>
                </Ripple>
            </Surface>
        )
    }
    
    _renderContent = () => {
        return (
            <SectionList
                sections={this.sectionDatas}
                renderSectionHeader={({section: {header}}) => (
                    <Text style={styles.headerSection}>{header}</Text>
                )}
                renderItem={this._renderItemSection}
                keyExtractor={(item, index) => item + index}
            />
        )
    }

    _renderItemSection = ({item, index, section}) => {
        return (
            <Surface themeable={false} containerHorizontalMargin flex style={{marginTop: 20}}>
                    <LinearGradient
                        colors={['#455992', '#893822']}
                        start={{ x: 0.0, y: 0.0 }}
                                end={{ x: 1.0, y: 0.0 }}
                                locations={[0.0, 1.0]}
                                style={{
                                    width: '100%',
                                    // height: 54,
                                    borderRadius: 17,
                                    paddingBottom: 10,
                                    paddingTop: 10,
                                    ...getElevation(4),
                                }}
                            >
                        
                        <Surface themeable={false} rowSpacebetween>
                            <Image source={{ uri: item.brandIcon }}
                                style={{
                                    width: 50,
                                    height: 40,
                                    marginLeft: 30,
                                }}
                            />
                        <Surface themeable={false}>
                        <Surface themeable={false} style={styles.seriCover}>
                            <Text white t='seri_number'/><Text white>{item.seriNumber}</Text>
                        </Surface>
                        <Surface themeable={false} style={styles.seriCover}>
                        <Text white t='expire_date'/><Text white>{item.expireDate}</Text>
                        </Surface>
                        </Surface>
                        </Surface>
                        <Surface rowSpacebetween style={styles.cardCodeCover}>
                            <Text t='card_code' />
                            <Text style={{color: '#1d76bb'}}>{item.cardCode}</Text>
                        </Surface>
                        <Surface rowSpacebetween themeable={false} style={{paddingTop: 10,}}>
                            <Ripple style={{flex: 1, height: 30, justifyContent: 'center'}}
                                onPress={this._handleCopy}
                            >
                                <Text white t='copy' style={{alignSelf: 'center',}} />
                            </Ripple>
                            <Surface style={{width: 1, height: 30,}} />
                            <Ripple style={{flex: 1, height: 30, justifyContent: 'center'}}
                                onPress={this._handleChargeNow}
                            >
                                <Text white t='charge_now' style={{alignSelf: 'center',}} />
                            </Ripple>
                        </Surface>
                    </LinearGradient>
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
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: 'white' }}
                        titleT={'card_codes'}
                        titleStyle={{ color: 'white' }}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                    />
                    {this._renderContentHeader()}
                    <Surface flex>
                        {this._renderContent()}
                    </Surface>

                    <PopupCopy
                        ref={ref => this.popupCopyRef = ref}
                        copyChargeSyntax={this.copyChargeSyntax}
                        copyChargeCode={this.copyChargeCode}
                        copySeri={this.copySeri}
                        copyChargeCodeSeri={this.copyChargeCodeSeri}
                        onPressOverlay={this.onPressOverlay}
                    />

                </ImageBackground>
            </Surface >
        )
    }
}

export default connect(null, {})(BuyCardCodes)