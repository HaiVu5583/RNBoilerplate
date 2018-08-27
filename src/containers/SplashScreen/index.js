
import React, { Component } from 'react';
import {
    StyleSheet,
    Image, BackHandler
} from 'react-native';
import {Icon} from '~/src/themes/ThemeComponent'
import { Colors } from 'react-native-ui-lib';
import { View } from '~/src/themes/ThemeComponent'

export default class SplashScreen extends Component {

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
        super(props);
    }

    componentDidAppear() {
        console.log('Splash Screen Did Appear')
    }

    _onBack = () => {
        console.log('Call _onBack')
        return false
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBack)
    }

    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBack)
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon name="the-bank" style={{ color: Colors.orange30, fontSize: 120 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
