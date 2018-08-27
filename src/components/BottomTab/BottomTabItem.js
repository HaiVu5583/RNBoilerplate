import React from 'react';
import { View } from 'react-native'
import { Surface, Text } from '~/src/themes/ThemeComponent'
import styles from './styles'
import Icon from '~/src/components/FontIcon'
import Ripple from 'react-native-material-ripple'

export default class BottomTabItem extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        console.log('Bottom Tab Item Props', this.props)
        return (
            <Ripple
                rippleColor={'white'}
                style={[this.props.style, { borderRadis: 40 }]}
                onPress={this.props.onPress}
            >
                {this.props.children}
            </Ripple>
        )
    }
}
