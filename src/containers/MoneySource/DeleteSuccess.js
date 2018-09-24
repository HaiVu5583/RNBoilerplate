import React from 'react';
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { BackHandler, Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Screen from '~/src/components/Screen'
import DeleteCardSuccess from '~/src/components/DeleteCardSuccess'

export default class MoneySource extends React.PureComponent {
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

    _handlePressBankItem = (item) => {
        if (item.id != this.state.selecteCard) {
            this.setState({ selecteCard: item.cardId })
        }
    }

    _handleGoHome = () => {
        Navigation.popTo('HomeScreen')
    }

    _handleBackToList = () => {
        // this.setState({ step: STEP.LIST_CARD })
        Navigation.popTo('gigabankclient.MoneySource')
    }

    _getHeaderByStep = () => {
        return {
            enable: false
        }
    }

    _renderContent = () => {
        return (
            <DeleteCardSuccess onPress={this._handleBackToList} />
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
                header={this._getHeaderByStep()}
                toolbarTitleT={'delete_linked_card'}
                hanleBack={this._handleBack}
                componentId={this.props.componentId}
                loading={this.state.loading}
            />
        )
    }
}