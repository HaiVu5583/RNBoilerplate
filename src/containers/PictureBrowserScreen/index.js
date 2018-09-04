import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation'
import { FlatList, Colors } from 'react-native'
import styles from './styles'
import { Switch } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ErrorBoundary from '~/src/components/ErrorBoundary'
import { Surface, Background, Text, Button, Toolbar } from '~/src/themes/ThemeComponent'
import { changeTheme } from '~/src/store/actions/ui'
import { THEMES } from '~/src/themes/common.js'
import { connect } from 'react-redux'
import { themeSelector } from '~/src/store/selectors/ui'
import { changeBottomTabColor } from '~/src/utils'
import { getTheme } from '~/src/themes/utils'
import PictureBrowser from '~/src/components/PictureBrowser'

class PictureBrowserScreen extends Component {

    static get options() {
        return {
            topBar: {
                visible: false,
                drawBehind: false,
                animate: false,
            },
        };
    }

    constructor(props) {
        super(props)
        this.view = React.createRef()
    }

    _handleShowModal = () => {

        Navigation.showModal({
            component: {
                name: 'gigabankclient.SplashScreen',
                options: {
                    modalPresentationStyle: 'pageSheet', // Supported styles are: 'formSheet', 'pageSheet', 'overFullScreen', 'overCurrentContext', 'currentContext', 'popOver', 'fullScreen' and 'none'. On Android, only overCurrentContext and none are supported.
                    overrideBackPress: true
                }
            }
        })
    }

    _onPictureSelected = (args) => {
        if (typeof this.props.handlePictureList == 'function') {
            this.props.handlePictureList(args);
        }

        this._onPictureBrowserClosed();
    }

    _onPictureBrowserClosed = () => {
        Navigation.pop(this.props.componentId);
    }

    _renderPictureBrowser = () => {
        const POPUP_TYPE_PICTURE_BROWSER = 5;
        return (
            <PictureBrowser
                isShow={true}
                params={{selectedPictures: []}}
                onPictureSelected={this._onPictureSelected}
                onClosed={this._onPictureBrowserClosed}
            />
        )
    }

    render() {

        const { theme } = this.props
        return (
            <ErrorBoundary>
                <Background style={{ flex: 1 }}>
                    <Toolbar title='Home Feed' iconRight={'3dots'} componentId={this.props.componentId} />
                    {/*<Text>line</Text>*/}
                    {this._renderPictureBrowser()}
                </Background>
            </ErrorBoundary>
        )
    }
}

export default connect(state => ({
    theme: themeSelector(state)
}), { changeTheme })(PictureBrowserScreen)
