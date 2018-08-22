import React, { PropTypes, Component, PureComponent } from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Polygon } from 'react-native-svg'

export default class RemoveIcon extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {

        let width = this.props.style && this.props.style.width ? this.props.style.width : 18
        let height = this.props.style && this.props.style.height ? this.props.style.height : 18
        return (
            <View>
                <Svg
                    height={height}
                    width={width}
                    viewBox="0 0 24 24">                    
                        <Circle cx="12" cy="12" r="11.66" opacity="0.6" style="isolation:isolate"/>
                        <Path d="M12,24A12,12,0,1,1,24,12,12,12,0,0,1,12,24ZM12,.69A11.31,11.31,0,1,0,23.31,12h0A11.31,11.31,0,0,0,12,.69Z" fill="#fff"/>
                        <Polygon points="17.89 6.63 17.35 6.11 12 11.48 6.63 6.11 6.11 6.63 11.46 12 6.11 17.37 6.63 17.89 12 12.52 17.27 17.81 17.34 17.89 17.89 17.37 12.52 12 17.89 6.63" fill="#fff"/>                        
                </Svg>
            </View>
        )
    }
}