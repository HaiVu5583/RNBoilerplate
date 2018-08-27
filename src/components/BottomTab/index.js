import React from 'react';
import { View } from 'react-native'
import { Surface, Text } from '~/src/themes/ThemeComponent'
import styles from './styles'
import Icon from '~/src/components/FontIcon'
import Ripple from 'react-native-material-ripple'
const TABS = [
    {
        id: 1,
        name: 'Home',
        icon: 'home-active',
        route: 'Home'
    },
    {
        id: 2,
        name: 'Camera',
        icon: 'camera',
        route: 'Splash'
    },
    {
        id: 3,
        name: 'Notification',
        icon: 'ring-active',
        route: 'Animated'
    }
]

export default class BottomTab extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _handlePressTab = (item) => {
        this.props.navigation.navigate(item.route)
    }

    _renderTabItem = (item, index) => {
        // transform: [{
        //                     {/* translateY: 20 */ }
        //                 }]
        if (index == 1) {
            return (
                <Ripple
                    key={item.id}
                    rippleColor={'white'}
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 100, width: 100, borderRadius: 50,
                        backgroundColor: 'white',
                        transform: [
                            {
                                translateY: 20
                            }
                        ]
                    }}
                    onPress={() => this._handlePressTab(item)}
                >
                    <Icon name={item.icon} style={{ fontSize: 24 }} />
                    <Text>{item.name}</Text>
                </Ripple>
            )
        }
        return (
            <Ripple
                key={item.id}
                rippleColor={'white'}
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 56,
                    backgroundColor: 'white',
                }}
                onPress={() => this._handlePressTab(item)}
            >
                <Icon name={item.icon} style={{ fontSize: 24 }} />
                <Text>{item.name}</Text>
            </Ripple>
        )
    }


    render() {
        console.log('Bottom Tab Props', this.props)
        return (
            <View
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    height: 80
                }}>
                <View style={{
                    width: '100%',
                    height: 56,
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1
                }} />
                {TABS.map((item, index) => this._renderTabItem(item, index))}
            </View>
        )
    }
}
