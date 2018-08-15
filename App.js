// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';

// const instructions = Platform.select({
//     ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//     android:
//         'Double tap R on your keyboard to reload,\n' +
//         'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//     render() {
//         console.log('App Render')
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.welcome}>Welcome to React Native!</Text>
//                 <Text style={styles.instructions}>To get started, edit App.js</Text>
//                 <Text style={styles.instructions}>{instructions}</Text>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });

import { Navigation } from 'react-native-navigation'
import registerScreens from '~/src/containers'
import configStore from '~/src/store/configStore'
import { Colors } from 'react-native-ui-lib';
const store = configStore()

export const run = () => {
    registerScreens(store)
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setDefaultOptions({
            animations: {
            },
            topBar: {
                visible: false,
                animate: false,
                drawBehind: true,
                elevation: 2
            },
            layout: {
                // backgroundColor: 'red',
            },
            statusBar: {
                backgroundColor: Colors.orange30,
                drawBehind: false,
                visible: true
            },
        })
        Navigation.setRoot({
            root: {
                stack: {
                    id: 'mainStack',
                    options: {
                        topBar: {
                            visible: false,
                            animate: false
                        }
                    },
                    children: [
                        {
                            component: {
                                name: 'gigabankclient.SplashScreen',
                            }
                        },
                    ]
                },
            }
        })
    });
}