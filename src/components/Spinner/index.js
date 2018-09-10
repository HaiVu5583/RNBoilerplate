import React from 'react';
import { Animated, Easing, Image, View, Platform } from 'react-native';
import { Text } from '~/src/themes/ThemeComponent'

export default class Spinner extends React.PureComponent {
	
	constructor(props) {
        super(props)    
    }

    componentDidMount () {
 		//this.spin()
	}

    spin = () => {
    	// First set up animation 
		Animated.timing(
		    this.state.spinValue,
		  {
		    toValue: 1,
		    duration: 100000,
		    easing: Easing.linear,
		    useNativeDriver: true
		  }
		).start(() => this.spin())
	}

    render() {
        return (
			// <Image source={{ uri: Platform.OS == 'android'? "asset:/loading.gif" : "./asset/loading.gif" }}
			// 	style={{width: 40, height: 40, ...this.props.style}} />
			<View>
				<Text>Loading...</Text>
			</View>
        )
    }
}