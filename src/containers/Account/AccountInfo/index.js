import React from 'react';
import { Dimensions, Image, } from 'react-native'
import { connect } from 'react-redux'
import { View, Text, Surface, Background, Button, Toolbar, Icon } from '~/src/themes/ThemeComponent'
import styles from './styles';
import I18n from '~/src/I18n'


const { height, width } = Dimensions.get('window')

class AccountInfo extends React.PureComponent {

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
                style={{ marginLeft: 30, flexDirection: 'row', marginTop: 20, backgroundColor: 'rgba(0,0,0,0.8)',
                    borderBottomLeftRadius: 35, borderTopLeftRadius: 35, height: 70}}>
                <Image source={{uri: 'https://previews.123rf.com/images/gresei/gresei1509/gresei150900067/45224138-beautiful-close-up-red-rose.jpg'}}
                    style={{ height: 70, width: 70, borderRadius: 35 }} />
                <View style={{ marginLeft: 30, backgroundColor: 'transparent'}}>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Icon name='phone' style={{color: 'white'}}/>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white',}} >
                            0987654321
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Icon name='email-line' style={{color: 'white'}} />
                        <Text style={{fontSize: 15, color: 'white',}}>
                            ltgiang@gmail.com
                        </Text>
                    </View>
                    <View style={{backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center', }}>
                        <Icon name='edit' style={{color: 'white'}} />
                    </View>
                </View>
            </Surface>
        )
    }
}

export default connect(null, {})(AccountInfo)