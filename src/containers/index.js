import { Navigation } from 'react-native-navigation'
import { getHOCScreen } from '~/src/utils'
import React, { Component } from 'react';
import { Provider } from 'react-redux';

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
    registerContainerWithRedux(`gigabankclient.Charge`, () => require('~/src/containers/Charge'), store)
    registerContainerWithRedux(`gigabankclient.AddCard`, () => require('~/src/containers/AddCard'), store)
    registerContainerWithRedux(`gigabankclient.AddCardSuccess`, () => require('~/src/containers/AddCardSuccess'), store)
    registerContainerWithRedux(`gigabankclient.AddCardFail`, () => require('~/src/containers/AddCardFail'), store)
    registerContainerWithRedux(`gigabankclient.WithDraw`, () => require('~/src/containers/WithDraw'), store)
    registerContainerWithRedux(`gigabankclient.WithDrawSearch`, () => require('~/src/containers/WithDrawSearch'), store)
    registerContainerWithRedux(`gigabankclient.ContactChooser`, () => require('~/src/containers/ContactChooser'), store)
    registerContainerWithRedux(`gigabankclient.WithDrawInfo`, () => require('~/src/containers/WithDrawInfo'), store)
    registerContainerWithRedux(`gigabankclient.AlertScreen`, () => require('~/src/containers/AlertScreen'), store)
    registerContainerWithRedux(`gigabankclient.ChangePassword`, () => require('~/src/containers/ChangePassword'), store)
    registerContainerWithRedux(`gigabankclient.WithDrawAuthen`, () => require('~/src/containers/WithDrawAuthen'), store)
    registerContainerWithRedux(`gigabankclient.ChargePhone`, () => require('~/src/containers/ChargePhone'), store)
    registerContainerWithRedux(`gigabankclient.EnterPassword`, () => require('~/src/containers/EnterPassword'), store)
    registerContainerWithRedux(`gigabankclient.ChargePhoneAuthen`, () => require('~/src/containers/ChargePhoneAuthen'), store)
    registerContainerWithRedux(`gigabankclient.Toast`, () => require('~/src/components/Toast'), store)
    // Money Source Flow
    registerContainerWithRedux(`gigabankclient.MoneySource`, () => require('~/src/containers/MoneySource'), store)
    registerContainerWithRedux(`gigabankclient.MoneySourceDeleteCard`, () => require('~/src/containers/MoneySource/DeleteCardConfirm'), store)
    registerContainerWithRedux(`gigabankclient.MoneySourceDeleteSuccess`, () => require('~/src/containers/MoneySource/DeleteSuccess'), store)
    // Money Transfer Flow
    registerContainerWithRedux(`gigabankclient.MoneyTransfer`, () => require('~/src/containers/MoneyTransfer'), store)
    registerContainerWithRedux(`gigabankclient.MoneyTransferInfo`, () => require('~/src/containers/MoneyTransfer/MoneyTransferInfo'), store)
    registerContainerWithRedux(`gigabankclient.MoneyTransferOTP`, () => require('~/src/containers/MoneyTransfer/MoneyTransferOTP'), store)
    registerContainerWithRedux(`gigabankclient.MoneyTransferResult`, () => require('~/src/containers/MoneyTransfer/MoneyTransferResult'), store)


}