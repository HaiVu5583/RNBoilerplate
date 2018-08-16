import React from 'react';
import { Image, ActivityIndicator, NetInfo, Platform, View } from 'react-native';
// import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import ResponsiveImage from 'react-native-responsive-image';
import PropTypes from 'prop-types'
import ReactNaitveFastImage from 'react-native-fast-image'
import Shimmer from '~/src/components/Shimmer'

// const SHA1 = require("crypto-js/sha1");
// const URL = require('url-parse');

const MAX_RETRY_COUNT = 10

export default class FastImage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            uri: null,
            loadingData: false
        }
        this.retryCount = 0
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.source.uri !== nextProps.source.uri) {
            //this.setState({loadingData: false})
            this.retryCount = 0
        }
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    _onLoadStart = (event) => {
        this.setState({loadingData: true})
    }
    _onProgress = (e) => {
        const isLoadedFull = e.nativeEvent.loaded == e.nativeEvent.total


        if (!this.state.loadingData) {
            if (e.nativeEvent.loaded  > e.nativeEvent.total / 4) {
                this.setState({loadingData: false})
            }
        }

        /*
        if (!this.state.loadingData && !isLoadedFull) {
            //this.setState({loadingData: true})
        } else if (isLoadedFull) {
            this.setState({loadingData: false})
        }*/
    }

    _onLoadEnd = (event) => {
        this.setState({loadingData: false})
        this.retryCount = 0
    }

    _onLoadError = (event) => {
        if (this.retryCount < MAX_RETRY_COUNT && !!this.props.source.uri) {
            this.retryCount ++
            let newUrl = this.props.source.uri
            if (newUrl.indexOf('?') > 0) {
                newUrl += "&retry=" + this.retryCount
            } else {
                newUrl += "?retry=" + this.retryCount
            }

            this.setState({uri: newUrl , loadingData: true})
        } else {
            console.log('load image error: ', event)
        }


    }

    _renderIndicator = () => {
        //const { resizeMode, ...remainStyle } = this.props.style
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Shimmer style={{width: '100%', height: '100%'}}/>
            </View>
        )

        //<Spinner />
    }
    renderLoadingIndicator() {
        const Loading = this.props.loading

        if (this.state.loadingData && !!this.props.source.uri) {
            return (

                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>

                    {/*
                    !!Loading ? <Loading /> : <Shimmer style={{width: '100%', height: '100%'}}/>
                */}
                    <Shimmer style={{width: '100%', height: '100%'}}/>

                </View>
            )

        } else {
            return false
        }
    }

    render() {

        let {resizeMode, backgroundColor, ...styles} = this.props.style

        if (!backgroundColor) {
            backgroundColor = 'rgba(0,0,0,0)'
        }
        //let resizeMode = styles.resizeMode
        //styles.resizeMode = undefine
        //styles = {...styles, resizeMode: undefined}

        let uri = this.state.uri? this.state.uri : this.props.source.uri
        if (!uri) uri = ''

        //uri = 'http://genknews.genkcdn.vn/2018/6/13/photo-1-1528877482828630191491.jpg'
        //uri = 'https://vnn-imgs-f.vgcloud.vn/2018/07/27/16/nghe-an-samu-co-thu-ua-mau-tren-dinh-phu-lon-2.jpg'
        //uri = 'https://static01.clingme.vn/images/picture/bannernhomuudai.png' // load max low

        return (
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...styles,
                }}
            >
                {!uri&&<View style={{
                    width: styles.width || '100%',
                    height: styles.height || '100%',
                    backgroundColor: backgroundColor,
                }} />
                }

                {!!uri&&<ReactNaitveFastImage
                    onLoadStart={this._onLoadStart}
                    onProgress={this._onProgress}
                    onLoadEnd={this._onLoadEnd}
                    onError={this._onLoadError}
                    style={{
                        width: styles.width || '100%',
                        height: styles.height || '100%',
                        backgroundColor: backgroundColor,
                    }}
                    source={{
                        uri: uri,
                        priority: ReactNaitveFastImage.priority.normal,
                    }}
                    resizeMode={resizeMode}
                    borderRadius={(styles && styles.borderRadius != null) ? styles.borderRadius : 0}
                />}

                {

                    this.renderLoadingIndicator()
                }

            </View>
        )
        /*
        console.log('Current State', this.state)

        if (!this.state.isRemote && !this.props.defaultSource) {
            console.log('Render Local')
            return this.renderLocal();
        }

        if (this.state.cacheable && this.state.cachedImagePath) {
            console.log('Render cacheable')
            return this.renderCache();
        }

        if (this.props.defaultSource) {
            console.log('Render defaultSource')
            return this.renderDefaultSource();
        }

        console.log('Render Loading', this.state)
        console.log('Render Loading', this.props)
        */



        if (Loading){
            return <Loading />
        }
        return (
            <ActivityIndicator {...this.props.activityIndicatorProps} />
        );
    }

    renderCache() {
        const { children, defaultSource, checkNetwork, networkAvailable, downloadInBackground, activityIndicatorProps, ...props } = this.props;
        return (
            <ResponsiveImage {...props} source={{ uri: 'file://' + this.state.cachedImagePath }}>
                {children}
            </ResponsiveImage>
        );
    }

    renderLocal() {
        const { children, defaultSource, checkNetwork, networkAvailable, downloadInBackground, activityIndicatorProps, ...props } = this.props;
        return (
            <ResponsiveImage {...props}>
                {children}
            </ResponsiveImage>
        );
    }

    renderDefaultSource() {
        const { children, defaultSource, checkNetwork, networkAvailable, ...props } = this.props;
        return (
            <FastImage {...props} source={defaultSource} checkNetwork={false} networkAvailable={this.networkAvailable} >
                {children}
            </FastImage>
        );
    }
}

FastImage.propTypes = {
    activityIndicatorProps: PropTypes.object,
    defaultSource: Image.propTypes.source,
    useQueryParamsInCacheKey: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.array
    ]),
    checkNetwork: PropTypes.bool,
    networkAvailable: PropTypes.bool,
    downloadInBackground: PropTypes.bool
};

FastImage.defaultProps = {
    style: { backgroundColor: 'transparent' },
    activityIndicatorProps: {
        style: { backgroundColor: 'transparent', flex: 1 }
    },
    useQueryParamsInCacheKey: false, // bc
    checkNetwork: true,
    networkAvailable: false,
    downloadInBackground: (Platform.OS === 'ios') ? false : true
};
