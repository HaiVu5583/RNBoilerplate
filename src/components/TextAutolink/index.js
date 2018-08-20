import React from 'react'
import {View, Text, Linking} from 'react-native'
import Autolink from 'react-native-autolink'
// import PopupConfirmCallPhone from '~/src/components/PopupConfirmCallPhone'
// import ClingmeUtils from '~/utils/ClingmeUtils'

export default class TextAutolink extends React.PureComponent {

    _isTel = (url) => {
        const search = url.search("tel");
        return search >= 0;
    }

    _linking = (match) => {
        const [
            url,
            fallback,
        ] = this.autolink.getUrl(match);

        // Call custom onPress handler or open link/fallback
        if (this.props.onPress) {
            this.props.onPress(url, match);
        } else if (this.props.webFallback) {        
            Linking.canOpenURL(url).then((supported) => {
                Linking.openURL(!supported && fallback ? fallback : url);
            });
        } else {
            //Linking.openURL(url);
            // ClingmeUtils.sendNotificationMessage(ClingmeUtils.MSG_PLAY_WEBVIEW_SCREEN, { url: url })
        }
    }

    _onPressPhoneNumber = (urlToLink, match) => {

        if (this._isTel(urlToLink)) {
            const number = urlToLink.replace('tel:', '')
            this._callPhoneUrl(number)
            return;
        }

        this._linking(match)
    }

    _callPhoneUrl(number) {
        alert('call phone ', number);
        if (this.popupConfirmCallPhone) {
            this.popupConfirmCallPhone.call(number, true);
        }
    }

    _renderPopupCallPhone() {
        return <View/>;

        return (
            <PopupConfirmCallPhone
                ref={ref => this.popupConfirmCallPhone = ref}
            />
        )
    }

    render() {

        const {children, text, style} = this.props;
        let content = text;
        if (!text && !!children) {
            content = children;
        }

        return (
            <View>
                {this._renderPopupCallPhone()}
                <Autolink
                    {...this.props}
                    ref={ref => this.autolink = ref}
                    style={style}
                    onPress={this._onPressPhoneNumber}
                    text={children}
                />
            </View>
        );

    }
}