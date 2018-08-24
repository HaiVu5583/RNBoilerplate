import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { View, Text, Surface, Background, Button, Toolbar, Icon } from '~/src/themes/ThemeComponent'
import styles from './styles';
import I18n from '~/src/I18n'
import LinearGradient from 'react-native-linear-gradient'


const { height, width } = Dimensions.get('window')

class Option extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillUnmount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <Surface themeable={false}
                style={{ marginLeft: 10, marginTop: 15, backgroundColor: 'transparent', }}>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Icon name='edit' style={{color: 'white', fontSize: 18}} />
                        <TouchableOpacity onPress={this.props.onPress}>
                            <Text style={{color: 'white', fontSize: 16, marginLeft: 10,}}>{this.props.title}</Text>
                        </TouchableOpacity>
                    </View>
                    <LinearGradient
                        start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}}
                        locations={[0.0, 0.5, 1.0]}
                        colors={['transparent', 'green', 'transparent']}
                        style={{width: '100%', height: 2, marginTop: 15}}
                    />
            </Surface>
        )
    }
}

export default connect(null, {})(Option)