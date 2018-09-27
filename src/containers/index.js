import { Navigation } from 'react-native-navigation'
import { getHOCScreen } from '~/src/utils'
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {SCREENS} from '~/src/constants'

export function registerContainerWithRedux(
    containerName,
    requireComponentFunction,
    store,
    needPreloadComponent = false
) {

    const generatorWrapper = function () {
        const preloadComponent = needPreloadComponent ? requireComponentFunction().default : null
        return class Scene extends Component {
            static InternalComponent = null
            static initInternalComponent() {
                if (!Scene.InternalComponent) {
                    Scene.InternalComponent = preloadComponent || requireComponentFunction().default
                }
            }

            static get options() {
                Scene.initInternalComponent()
                return Scene.InternalComponent.options ? { ...Scene.InternalComponent.options } : {}
            }

            constructor(props) {
                super(props);
                Scene.initInternalComponent()
            }
            render() {
                return (
                    <Provider store={store}>
                        <Scene.InternalComponent
                            ref="child"
                            {...this.props}
                        />
                    </Provider>
                );
            }

            componentDidAppear(id) {
                instance = this.refs.child.getWrappedInstance();
                if (instance && instance.componentDidAppear) {
                    instance.componentDidAppear(id);
                }
            }

            componentDidDisappear(id) {
                instance = this.refs.child.getWrappedInstance();
                if (instance && instance.componentDidDisappear) {
                    instance.componentDidDisappear(id);
                }
            }

            navigationButtonPressed(id) {
                instance = this.refs.child.getWrappedInstance();
                if (instance && instance.navigationButtonPressed) {
                    instance.navigationButtonPressed(id);
                }
            }
        };
    };

    registerContainer(containerName, generatorWrapper);
}

function registerContainer(containerName, generator) {
    Navigation.registerComponent(containerName, generator);
}

export default registerScreens = (store) => {
    registerContainerWithRedux(`gigabankclient.HomeScreen`, () => require('~/src/containers/Home'), store)
    registerContainerWithRedux(`gigabankclient.SplashScreen`, () => require('~/src/containers/SplashScreen'), store)
    registerContainerWithRedux(`gigabankclient.AnimatedScreen`, () => require('~/src/containers/AnimatedScreen'), store)
    registerContainerWithRedux(`gigabankclient.FeedScreen`, () => require('~/src/containers/FeedScreen'), store)
    registerContainerWithRedux(`gigabankclient.PictureBrowserScreen`, () => require('~/src/containers/PictureBrowserScreen'), store)
    registerContainerWithRedux(`gigabankclient.Authentication`, () => require('~/src/containers/Authentication'), store)
    registerContainerWithRedux(`gigabankclient.Register`, () => require('~/src/containers/Authentication/Register'), store)
    registerContainerWithRedux(`gigabankclient.WebView`, () => require('~/src/containers/WebView'), store)
    registerContainerWithRedux(`gigabankclient.AccountScreen`, () => require('~/src/containers/Account'), store)
    registerContainerWithRedux(`gigabankclient.Drawer`, () => require('~/src/containers/Drawer'), store)
    registerContainerWithRedux(SCREENS.WITH_DRAW.name, () => require('~/src/containers/WithDraw'), store)
    registerContainerWithRedux(SCREENS.WITH_DRAW_ADD_CARD.name, () => require('~/src/containers/WithDrawAddCard'), store)
    registerContainerWithRedux(SCREENS.WITH_DRAW_SEARCH.name, () => require('~/src/containers/WithDrawSearch'), store)
    registerContainerWithRedux(SCREENS.WITH_DRAW_INFO.name, () => require('~/src/containers/WithDrawInfo'), store)
    registerContainerWithRedux(SCREENS.WITH_DRAW_AUTHEN.name, () => require('~/src/containers/WithDrawAuthen'), store)
    registerContainerWithRedux(`gigabankclient.ContactChooser`, () => require('~/src/containers/ContactChooser'), store)
    registerContainerWithRedux(SCREENS.ALERT.name, () => require('~/src/containers/AlertScreen'), store)
    registerContainerWithRedux(`gigabankclient.ChangePassword`, () => require('~/src/containers/ChangePassword'), store)
    registerContainerWithRedux(SCREENS.CHARGE_PHONE.name, () => require('~/src/containers/ChargePhone'), store)
    registerContainerWithRedux(SCREENS.ENTER_PASSWORD.name, () => require('~/src/containers/EnterPassword'), store)
    registerContainerWithRedux(SCREENS.CHARGE_PHONE_AUTHEN.name, () => require('~/src/containers/ChargePhoneAuthen'), store)
    registerContainerWithRedux(`gigabankclient.NoConnection`, () => require('~/src/components/NoConnection'), store)
    registerContainerWithRedux(`gigabankclient.Toast`, () => require('~/src/components/Toast'), store)
    // Money Source Flow
    registerContainerWithRedux(SCREENS.MONEY_SOURCE.name, () => require('~/src/containers/MoneySource'), store)
    registerContainerWithRedux(`gigabankclient.MoneySourceDeleteCard`, () => require('~/src/containers/MoneySource/DeleteCardConfirm'), store)
    registerContainerWithRedux(`gigabankclient.MoneySourceDeleteSuccess`, () => require('~/src/containers/MoneySource/DeleteSuccess'), store)
    registerContainerWithRedux(`gigabankclient.AddCard`, () => require('~/src/containers/AddCard'), store)
    registerContainerWithRedux(`gigabankclient.AddCardSuccess`, () => require('~/src/containers/AddCardSuccess'), store)
    registerContainerWithRedux(`gigabankclient.AddCardFail`, () => require('~/src/containers/AddCardFail'), store)
    // Money Transfer Flow
    registerContainerWithRedux(`gigabankclient.MoneyTransfer`, () => require('~/src/containers/MoneyTransfer'), store)
    registerContainerWithRedux(`gigabankclient.MoneyTransferInfo`, () => require('~/src/containers/MoneyTransfer/MoneyTransferInfo'), store)
    registerContainerWithRedux(`gigabankclient.MoneyTransferOTP`, () => require('~/src/containers/MoneyTransfer/MoneyTransferOTP'), store)
    registerContainerWithRedux(`gigabankclient.MoneyTransferResult`, () => require('~/src/containers/MoneyTransfer/MoneyTransferResult'), store)
    // Charge Flow
    registerContainerWithRedux(`gigabankclient.Charge`, () => require('~/src/containers/Charge'), store)
    registerContainerWithRedux(`gigabankclient.ChargeInfo`, () => require('~/src/containers/Charge/ChargeInfo'), store)
    registerContainerWithRedux(`gigabankclient.ChargeResult`, () => require('~/src/containers/Charge/ChargeResult'), store)
    // Buy Card
    registerContainerWithRedux(`gigabankclient.BuyCard`, () => require('~/src/containers/BuyCard'), store)

}