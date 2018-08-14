import SplashScreen from '~/src/containers/SplashScreen'
import HomeScreen from '~/src/containers/Home'
import AnimatedScreen from '~/src/containers/AnimatedScreen'
import FeedScreen from '~/src/containers/FeedScreen'
import { Navigation } from 'react-native-navigation'
import { getHOCScreen } from '~/src/utils'
import React, { Component } from 'react';
import { Provider } from 'react-redux';

export function registerContainerWithRedux(
    containerName,
    comp,
    store,
) {
    const generatorWrapper = function () {
        const InternalComponent = comp;

        return class Scene extends Component {
            constructor(props) {
                super(props);
            }
            render() {
                return (
                    <Provider store={store}>
                        <InternalComponent
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
    registerContainerWithRedux(`gigabankclient.HomeScreen`, HomeScreen, store)
    registerContainerWithRedux(`gigabankclient.SplashScreen`, SplashScreen, store)
    registerContainerWithRedux(`gigabankclient.AnimatedScreen`, AnimatedScreen, store)
    registerContainerWithRedux(`gigabankclient.FeedScreen`, FeedScreen, store)
    
}