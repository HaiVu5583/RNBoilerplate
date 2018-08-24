import React from 'react';
import { Dimensions, WebView, BackHandler, Linking, ActivityIndicator, Platform } from 'react-native'
import { connect } from 'react-redux'
import ToolBarWithBack from '~/src/components/ToolBarWithBack'
import { chainParse } from '~/src/utils'
import Spinner from '~/src/components/Spinner'
import { requestConvertUrlToId } from '~/src/store/actions/query'
import I18n from '~/src/I18n'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground } from 'react-native'
import { TextInput, Surface, Background, Button, Toolbar } from '~/src/themes/ThemeComponent'
import { View, Text } from 'react-native'
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient'

const { height, width } = Dimensions.get('window')
const urlCache = []

class CardInfo extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            failMessage: '',
            webViewLoading: true,
            url: this.props.url
        }
    }
    
    _handleBack = async () => {
        // const isTopView = await ClingmeUtils.nativeViewIsTopView('' + this.props.clingmeIdentifier)
        // if (isTopView) {
        //     ClingmeUtils.nativeViewGoBack("" + this.props.clingmeIdentifier)
        // }
    }

    _closeScreen = async () => {
        // const isTopView = await ClingmeUtils.nativeViewIsTopView('' + this.props.clingmeIdentifier)
        // if (isTopView) {
        //     ClingmeUtils.nativeViewGoBack("" + this.props.clingmeIdentifier)
        // }
    }

    _handleOpenURL = (e) => {
        console.log('Handle Open URL', e)
    }

    _changeStep = (obj) => {
        this.setState(obj)
    }

    componentDidMount() {
        const { getBankList } = this.props
        console.log('Current AddCard Props', this.props)
        
        Linking.addEventListener('url', this._handleOpenURL);
        // BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }

    // End Load Webview AddCard
    _onLoadEnd = (e) => {
        console.log('On load end', e.nativeEvent)
        this.setState({ webViewLoading: false })
        this._clearWebviewTimeout()
    }

    _onError = (e) => {
        console.log('On Error', e)
        this._clearWebviewTimeout()
        this.setState({ webViewLoading: false })
    }  

    _openByUrl = (url) => {
        if (urlCache[url]) {
            this._openFromObject(urlCache[url])
        } else {
            this.props.requestConvertUrlToId(encodeURI(url), (err, data) => {
                if (!err) {
                    this._openFromObject(url, chainParse(data, ['updated', 'item']))
                } else {

                }
            })
        }
    }

    _openFromObject = (generalUrl, obj) => {
        if (!obj) return

        urlCache[generalUrl] = obj

        switch (obj.type) {
            case 1: //deal
            {
                const params = {
                    screenName: 'dealDetail',
                    isSlided: true,
                    placeId: obj.itemId,
                }

                // ClingmeUtils.sendNotificationMessage(ClingmeUtils.MSG_PLAY_CLINGME_20_UNIVERSAL_VIEW_MEDIATOR, params)
            }
            break
            case 2: //place
            {
                const params = {
                    screenName: 'PlaceDetail',
                    isSlided: true,
                    placeId: obj.itemId,
                }

                // ClingmeUtils.sendNotificationMessage(ClingmeUtils.MSG_PLAY_CLINGME_20_UNIVERSAL_VIEW_MEDIATOR, params)
            }
            break
            default: 
                this.setState({url: generalUrl})
            break
        }
    }

    _onLoadStart = (e) => {
        console.log('On load start', e.nativeEvent)
        //Case pay success
        
        //const lowUrl = e.nativeEvent.url.toLowerCase()
        const lowUrl = e.url.toLowerCase()

        if (lowUrl.indexOf('webview://close') > -1) {
            this._closeScreen()
            return false
        } else if (lowUrl.indexOf('/place/detail/') > -1 || lowUrl.indexOf('web/?place=') > -1) {
            //open place detail
            this._openByUrl(lowUrl)
            return false
        } else if (lowUrl.indexOf('/deal/detail/') > -1) {
            this._openByUrl(lowUrl)
            return false
        } else if (lowUrl.indexOf('https://itunes.apple.com') > -1 || lowUrl.indexOf('https://play.google.com/store/apps/') > -1) {
            //open store
        }

        this.setState({ webViewLoading: true })

        return true
    }
    

    _onLoadEnd = (e) => {
        
        this.setState({ webViewLoading: false })        
    }


    _onWebViewBack = () => {
        this._closeScreen()
    }
    
    _renderWebViewToolbar = () => {
        let title = 'This is Title'
        if (!!this.props.params && !!this.props.params.title) {
            title = this.props.params.title
        }

        return <ToolBarWithBack
            title={title}
            iconColor='rgba(0,0,0,0.6)'
            backgroundColor={'rgba(0,0,0,0)'}
            onPressIconLeft={this._onWebViewBack}
        />
    }
    
    _renderNetwordError = () => {
        
    }

    _onWebViewError = (err) => {
        console.log('webview: ', err)
    }

    _onGoBack = () => {
        // ClingmeUtils.nativeViewGoBack("" + this.props.clingmeIdentifier)
    }

    _getUrl = () => {
        let url = 'http://dantri.com.vn/'
        // if (!!this.props.params && !!this.props.params.url) {
        //     url = this.props.params.url
        // }

        if (url.indexOf('?') > 0) {
            url += '&'
        } else {
            url += '?'
        }
        this.setState({url: url})
        // ClingmeUtils.getUserData().then(userData => {

        //     url += 'cxuserId=' + userData.userId
        //     url += '&cxsession=' + userData.encodedSession
        //     url += '&cxlang=vi'
        //     url += '&xversion=' + userData.app_version

        //     this.setState({url: url})
        // })

//         os << "cxuserId=" << m_oUserProxy->getUserData()->userId << "&cxsession=" << encodedSession << "&cxlang=" << WalleLocalization::sharedInstance()->getLanguage() << "&xversion=" << GigUtils::getApplicationVersion().c_str();
    }

    render() {

        const url = this.state.url
        console.log('url', url)
        //onLoadStart={this._onLoadStart}
        
        return (
            <View>
            <LinearGradient
                        start={{x: 0.65, y: 0}} end={{x: 0, y: 0.9}}
                        locations={[0.5, 0.5]}
                        // colors={['transparent', 'green', 'transparent']}
                        colors={['green', 'red']}
                        style={{width: '100%', height: 200}}
                    />
            <ImageBackground source={ASSETS.MAIN_BACKGROUND}
                style={{ marginLeft: 30, marginRight: 30, height: 200, padding: 18}}
                imageStyle={{ borderRadius: 25 }}>
                <Surface themeable={false} flex>
                    <Text style={{fontSize: 26, color: '#ffffff', fontWeight: 'bold', marginTop: 20}} >
                        1234 5678 1234 5678
                    </Text>
                    <Text style={{fontSize: 15, color: '#ffffff',}}>
                        12/20
                    </Text>
                    <Text style={{fontSize: 18, color: '#ffffff', fontWeight: 'bold', marginTop: 30}}>
                        HOANG THANH GIANF
                    </Text>
                </Surface>
            </ImageBackground>
            {/* // </LinearGradient> */}
            </View>
        )
    }
}

export default connect(null, {})(CardInfo)