import React from 'react';
import { Dimensions, WebView, BackHandler, Linking, } from 'react-native'
import { connect } from 'react-redux'
// import ClingmeUtils from '~/utils/ClingmeUtils'
import ToolBarWithBack from '~/src/components/ToolBarWithBack'
import { chainParse } from '~/src/utils'
import Spinner from '~/src/components/Spinner'
import { requestConvertUrlToId } from '~/src/store/actions/query'
import { View, Toolbar } from '~/src/themes/ThemeComponent'

const { height, width } = Dimensions.get('window')
const urlCache = []

class ClingmeWebView extends React.PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            failMessage: '',
            webViewLoading: false,
            url: 'http://dantri.com.vn/'
        }

        // this._getUrl()
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

        return (<View style={{ width, height }}>
            {/* {this._renderWebViewToolbar()} */}
            <Toolbar title='Animated Screen' componentId={this.props.componentId} />
            {!!this.state.webViewLoading && <View style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1000,
                elevation: 10,
            }}>
                <Spinner />
            </View>}
            {!!url&&
            <WebView
                startInLoadingState={true}
                onShouldStartLoadWithRequest={this._onLoadStart}
                onLoadEnd={this._onLoadEnd}
                onError={this._onWebViewError}
                source={{ uri: url }}
                ref={ref => this.webView = ref}
                scalesPageToFit={false}
            />
            }
        </View>
        )
    }
}

export default connect(null, {requestConvertUrlToId,})(ClingmeWebView)