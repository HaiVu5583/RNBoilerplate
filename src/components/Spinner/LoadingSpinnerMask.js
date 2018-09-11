import React from 'react';
import { Image, Platform, View } from 'react-native';
import {commonStyle} from '~/ui/styles/common'
import Spinner from '.'
import LoadingModal from '~/ui/components/LoadingModal'


export default class LoadingSpinnerMask extends React.PureComponent {

    constructor(props) {
        super(props)        
    }

    componentDidMount() {
        //this._loadingMask.open()
    }
    componentWillUnmount() {
        //this._loadingMask.close()   
    }
    /*
    render() {
        return (         
        	<View style={{...commonStyle.fullscreen, 
        					flexDirection: 'column',
        					justifyContent: 'center',
        					alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                            }}>

                <Spinner />
            	
             </View>
        )
    }*/

    render() {
        return (
            <View style={{ flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            flex: 1,
                            width: width,
                            height: height,
                            position: 'absolute',
                            left: 0,
                            top: 0,
                        }}>
                    <View style={styles.spinnerContainer}>
                        <Spinner />
                    </View>                
             </View>
            )
        
        /*
        return (
                <Image source={{ uri: Platform.OS == 'android'? "asset:/loading.gif" : "./asset/loading.gif" }}
                    style={{width: 40, height: 40}} />

                )
        */

    }

}

const styles = {
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    spinnerContainer: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 4
    }
}