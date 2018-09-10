import React from 'react';
import { Dimensions, Image, TouchableOpacity, } from 'react-native'
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
                style={{ marginLeft: 15, flexDirection: 'row', marginTop: 20, backgroundColor: 'rgba(0,0,0,0.8)',
                    borderBottomLeftRadius: 45, borderTopLeftRadius: 45, height: 90}}>
                <View style={styles.coverAvatar}>
                    <Image source={{uri: 'https://previews.123rf.com/images/gresei/gresei1509/gresei150900067/45224138-beautiful-close-up-red-rose.jpg'}}
                        style={{ height: 60, width: 60, borderRadius: 30,}} />
                </View>
                <View style={styles.cover}>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Icon name='phone' style={styles.iconPhone}/>
                        <Text style={styles.phone} >
                            0987654321
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Icon name='mail' style={styles.iconMail} />
                        <Text style={styles.mail}>
                            ltgiang@gmail.com
                        </Text>
                    </View>
                </View>
                <View style={styles.coverIconEdit}>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <Icon name='edit' style={styles.iconEdit} />
                    </TouchableOpacity>
                </View>
            </Surface>
        )
    }
}

export default connect(null, {})(AccountInfo)