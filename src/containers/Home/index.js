// import React, {Component} from 'react';
// import {
//     TagsInput, Button, Card, Colors,
//     Carousel, Constants, PageControl
// } from 'react-native-ui-lib';
// import { Surface, Background, View, Text, TextInput, Icon, Image } from '~/src/themes/ThemeComponent'
// import { Navigation } from 'react-native-navigation'
// import { ScrollView, ActivityIndicator, Platform, PixelRatio } from 'react-native'
// import styles from './styles'
// import {connect} from 'react-redux'
// import {getData, getTestData} from '~/src/store/actions/home'
// import BottomSheet from '~/src/components/BottomSheet'
// import TagSelect from '~/src/components/TagSelect'
// import PreparePictureList from '~/src/components/PreparedPictureList'
// import RichText from '../../components/RichText'
// import AutoGrowTextInput from '../../components/AutoGrowTextInput'
import I18n from '~/src/I18n'
// import Tooltip from '../../components/Tooltip'
import Toast from 'react-native-toast-native'
import { toastStyle } from '../../themes/common'

// // import FastImage from "~/src/components/FastImage";
// // import PictureBrowser from '~/src/components/PictureBrowser'


// // import Icon from '~/src/components/FontIcon'
// import PreparedPictureList from '~/src/components/PreparedPictureList'

import React, { Component } from 'react';
import { Surface, Text, Toolbar, Button, Icon } from '~/src/themes/ThemeComponent'
import { Navigation } from 'react-native-navigation'
import { ImageBackground, FlatList } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { getData, getTestData } from '~/src/store/actions/home'
import { ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import Carousel, { Pagination } from 'react-native-snap-carousel'
const COLUMN_WIDTH = DEVICE_WIDTH / 3
import Ripple from 'react-native-material-ripple'

class Home extends Component {
    static get options() {
        return {
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false
            }
        };
    }

    constructor(props) {
        super(props)
        this.state = {
            activeBanner: 0
        }

    // }

    // navigationButtonPressed({buttonId}) {
    //     console.log('Back Button Press', buttonId)
    // }

    // onChangePage = (index) => {
    //     console.log('Page Control', this.pageControl)
    //     this.setState({page: index});
    // }
    
    // _handleOpenWebview = () => {
    //     console.log('W', new Date().getTime())
    //     Navigation.push('mainStack', {
    //         component: {
    //             name: 'gigabankclient.WebView',
    //             passProps: {
    //                 url: 'https://dantri.com.vn/',
    //             }
    //         }
    //     })
    // }

    // _handlePressButton = () => {
    //     console.log('Call Push Animated Screen', new Date().getTime())
    //     Navigation.push('mainStack', {
    //         component: {
    //             name: 'gigabankclient.AnimatedScreen',

        this.bannerData = [
            'Banner 1', 'Banner 2', 'Banner 3', 'Banner 4', 'Banner 5'
        ]
        this.feature = [
            {
                id: 1,
                icon: 'map',
                name: 'Feature 1'
            },
            {
                id: 2,
                icon: 'gift-code-line',
                name: 'Feature 2'
            },
            {
                id: 3,
                icon: 'group-line',
                name: 'Feature 3'
            },
            {
                id: 4,
                icon: 'about-line',
                name: 'Feature 4'
            },
            {
                id: 5,
                icon: 'email-line',
                name: 'Feature 5'
            },
            {
                id: 6,
                icon: 'Clingmepay-line',
                name: 'Feature 6'
            },
            {
                id: 7,
                icon: 'help-line',
                name: 'Feature 7'
            }
        ]
    }

    get pagination() {
        const { activeBanner } = this.state;
        return (
            <Pagination
                dotsLength={this.bannerData.length}
                activeDotIndex={activeBanner}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    padding: 0,
                    margin: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                dotContainerStyle={{
                    padding: 0,
                    margin: 0
                }}
                containerStyle={{
                }}

                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <Surface white themeable={false} rowCenter style={{ height: 150, borderRadius: 4 }}>
                <Text center>{item}</Text>
            </Surface>
        )
    }

    _handlePressHambergerIcon = () => {
        Navigation.mergeOptions('sideMenu', {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        })
    }

    _handleOpenFeed = () => {
        Navigation.push('mainStack', {
            component: {
                name: 'gigabankclient.FeedScreen',
            }
        });
    }

    componentDidMount() {
        this.props.getData()
        Toast.show(I18n.t('delete_card_success'), Toast.LONG, Toast.BOTTOM, toastStyle.toastStyle);
    }

    _handlePressFeature = (item) => {

    }

    _renderFeatureItem = ({ item, index }) => {
        return (
            <Ripple onPress={() => this._handlePressFeature(item)} rippleColor={'white'}>
                <Surface themeable={false} columnCenter style={{ width: COLUMN_WIDTH, paddingVertical: 20 }}>
                    <Icon white name={item.icon} style={{ color: 'white', fontSize: 24 }} />
                    <Text body2 white light>{item.name}</Text>
                </Surface>
            </Ripple>
        )
    }

    _onChangeBottomTab = () => {
        // Navigation.mergeOptions('bottomTabs', {
        //     bottomTabs: {
        //         currentTabIndex: 1,
        //     }
        // })

        Navigation.mergeOptions('tab1', {
            bottomTabs: {
                backgroundColor: 'black',
            },
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
                background: {
                    color: 'black'
                }
            }
        })
        Navigation.mergeOptions('tab4', {
            bottomTabs: {
                backgroundColor: 'black',
            },
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
                background: {
                    color: 'black'
                }
            }
        })
        Navigation.mergeOptions('tab2', {
            bottomTabs: {
                backgroundColor: 'black',
            },
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
                background: {
                    color: 'black'
                }
            }
        })
        Navigation.mergeOptions('tab3', {
            bottomTabs: {
                backgroundColor: 'black',
            },
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
                background: {
                    color: 'black'
                }
            }
        })

        // Navigation.mergeOptions('bottomTabs', {
        //     bottomTabs: {
        //         backgroundColor: 'black',
        //     }
        // })
    }

    // _renderFastImage = () => {

        //uri = 'http://genknews.genkcdn.vn/2018/6/13/photo-1-1528877482828630191491.jpg'
        //uri = 'https://vnn-imgs-f.vgcloud.vn/2018/07/27/16/nghe-an-samu-co-thu-ua-mau-tren-dinh-phu-lon-2.jpg'
        //uri = 'https://static01.clingme.vn/images/picture/bannernhomuudai.png' // load max low


    _renderLogo = () => {
        return (
            <Surface themeable={false} flex rowCenter>
                <Text center h5 white bold>GIGA</Text>
                <Text center h5 white thin>BANK</Text>
            </Surface>
        )
    }

    _onPictureSelected = () => {
        alert('on picture selected');
    }

    _onPictureBrowserClosed = () => {
        alert('on picture browser closed');
    }

    _handleLoadGoogle = () => {
        this.props.getTestData((err, data) => {
            console.log('Google Err', err)
            console.log('Google Data', data)
        })
    }

    // _renderPictureBrowser = () => {
    //     const POPUP_TYPE_PICTURE_BROWSER = 5;
    //     return (
    //         <PictureBrowser
    //             isShow={true}
    //             params={{selectedPictures: []}}
    //             onPictureSelected={this._onPictureSelected}
    //             onClosed={this._onPictureBrowserClosed}
    //         />
    //     )
    // }

    _handleLoadGoogle = () => {
        this.props.getTestData((err, data) => {
            console.log('Google Err', err)
            console.log('Google Data', data)
        })
    }

    _handleAddPicturePressed = () => {
        this._handlePressOpenPictureBrowserScreen()
    }

//     render() {

//         return (
//             <Background style={{flex: 1}}>
//                 {/*{this._renderFilter()}*/}
//                 <ScrollView>
//                     <PreparePictureList />
//                     <RichText content='<rt>Hello <b>world</b></rt>' />
//                     <AutoGrowTextInput>
//                         AutoGrowTextInput
//                     </AutoGrowTextInput>
//                     <Tooltip
//                         ref={ref => this.tooltip = ref}
//                         content={'tooltip quick menu | action block'}
//                     />
//                     <View>
//                         <PreparedPictureList
//                             dataList={this.state.preparePictureListData}
//                             onImageRemoved={e => false}
//                             onPicturePress={e => false}
//                             ref={ref => this._pictureList = ref}
//                             onAddPicturePressed={this._handleAddPicturePressed}
//                         />
//                         <Surface>
//                             <Carousel loop onChangePage={(index => this.onChangePage(index))}>
//                                 <Surface width={Constants.screenWidth} height={200}>
//                                     <Text>PAGE 1</Text>
//                                 </Surface>
//                                 <Surface width={Constants.screenWidth} height={200}>
//                                     <Text>PAGE 2</Text>
//                                 </Surface>
//                                 <Surface width={Constants.screenWidth} height={200}>
//                                     <Text>PAGE 3</Text>
//                                 </Surface>
//                                 <Surface width={Constants.screenWidth} height={200}>
//                                     <Text>PAGE 4</Text>
//                                 </Surface>
//                                 <Surface width={Constants.screenWidth} height={200}>
//                                     <Text>PAGE 5</Text>
//                                 </Surface>
//                                 <Surface width={Constants.screenWidth} height={200}>
//                                     <Text>PAGE 6</Text>
//                                 </Surface>
//                             </Carousel>
//                             <PageControl width={Constants.width} containerStyle={styles.pageControl} numOfPages={6}
//                                 currentPage={this.state.page} color={Colors.orange30} size={10}
//                                 ref={ref => this.pageControl = ref}
//                             />
//                         </Surface>
//                         <Surface style={{flexDirection: 'row', ...styles.block}}>
//                             <Icon name="the-bank" style={{fontSize: 30, marginRight: 10}}/>
//                             <Icon name="clingme-building" style={{fontSize: 30, marginRight: 10}}/>
//                             <ActivityIndicator size={Platform.OS == 'ios' ? 'large' : 50} color={'#F16654'}/>
//                         </Surface>
//                         <TextInput
//                             placeholder={'Input something here...'}
//                         />
                        
//                         <Surface style={styles.block}>
//                             <Button text70 white background-orange30 label="Open Web view"
//                                 onPress={this._handleOpenWebview}/>
//                                 <Button text70 white background-orange30 label="Open Screen"
//                                     onPress={this._handlePressButton}/>
//                                 <Button
//                                     outline
//                                     outlineColor={Colors.orange30}
//                                     label="Open Feed"
//                                     marginT-20
//                                     text70
//                                     onPress={this._handleOpenFeed}
//                                 />
//                         </Surface>
//                         <Surface style={styles.block}>
//                             <Text h6>Text H6</Text>
//                             <Text h5>Text H5</Text>
//                             <Text body1>Text body1</Text>
//                             <Text body2>Text body2</Text>
//                             <Text overline>Text Overline</Text>
//                         </Surface>
//                     </View>
//                     {this._renderFastImage()}
//                     <Surface style={{flexDirection: 'row', ...styles.block}}>
//                         <Icon name="the-bank" style={{fontSize: 30, marginRight: 10}}/>
//                         <Icon name="clingme-building" style={{fontSize: 30, marginRight: 10}}/>
//                         <ActivityIndicator size={Platform.OS == 'ios' ? 'large' : 50} color={'#F16654'}/>
//                     </Surface>
//                     <TextInput placeholder={'Input something here...'}/>

//                         {/* <Surface style={styles.block}> */}
//                             <Surface style={styles.block}>
//                                 <Button
//                                     text70 white background-orange30 label="Open Screen"
//                                     onPress={this._handlePressButton}
//                                 />

//                                 <Button
//                                     outline
//                                     outlineColor={Colors.orange30}
//                                     label="Open Feed"
//                                     marginT-20
//                                     text70
//                                     onPress={this._handleOpenFeed}
//                                 />

//                                 <Button
//                                     text70
//                                     white
//                                     background-orange30
//                                     marginT-20
//                                     label="Open BottomSheet"
//                                     onPress={this._handleOpenBottomSheet}
//                                 />

//                                 <Button
//                                     text70
//                                     white
//                                     background-orange30
//                                     marginT-20
//                                     label="Change Tab"
//                                     onPress={this._onChangeBottomTab}
//                                 />

//                                 <Button
//                                     text70
//                                     white
//                                     background-orange30
//                                     marginT-20
//                                     label="Load Google"
//                                     onPress={this._handleLoadGoogle}
//                                 />

//                             </Surface>
// <Surface style={styles.block}>
//                             <Text h6>Text H6</Text>
//                             <Text h5>Text H5</Text>
//                             <Text body1>Text body1</Text>
//                             <Text body2>Text body2</Text>
//                             <Text overline>Text Overline</Text>

//                             {this._renderFastImage()}

//                             <Button text70 white background-orange30 label="Open Picture Browser"
//                                     onPress={this._handlePressOpenPictureBrowserScreen}/>
//                         </Surface>
//                     {/* </Surface> */}

//                 </ScrollView>
//             </Background>
    render() {

        return (
            <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: '100%', height: '100%' }}>
                <Toolbar
                    themeable={false}
                    iconLeft='menu'
                    iconRight='ring'
                    onPressIconLeft={this._handlePressHambergerIcon}
                    iconStyle={{ color: 'white' }}
                    centerComponent={this._renderLogo}
                />
                <Surface themeable={false} style={{ height: 250 }}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.bannerData}
                        renderItem={this._renderItem}
                        sliderWidth={DEVICE_WIDTH}
                        itemWidth={DEVICE_WIDTH - 60}
                        itemHeight={150}
                        sliderHeight={150}
                        onSnapToItem={(index) => this.setState({ activeBanner: index })}
                        loop={true}
                    />
                    {this.pagination}
                </Surface>
                <FlatList
                    data={this.feature}
                    renderItem={this._renderFeatureItem}
                    keyExtractor={item => '' + item.id}
                    numColumns={3}
                />
            </ImageBackground>
        );
    }
}

export default connect(null, { getData, getTestData }, null, { withRef: true })(Home)
