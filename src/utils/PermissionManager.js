import ReactNativePermissions from 'react-native-permissions'
import {Linking, Platform} from 'react-native'
import SystemSetting from 'react-native-system-setting'

let PermissionManager = {};

PermissionManager.requestAlbumPermission = (callback) => {
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
    } else {
        ReactNativePermissions.request('photo').then(response => {
            // Returns once the user has chosen to 'allow' or to 'not allow' access
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            if (response == 'authorized') {
                if (callback) {
                    callback(true)
                }
            } else {
                if (callback) {
                    callback(false)
                }
            }
        })

    }
}

PermissionManager.checkAlbumPermission = (callback) => {
    ReactNativePermissions.check('photo').then(response => {
        callback(response)
    })
}

PermissionManager.requestCameraPermission = (callback) => {
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
    } else {
        ReactNativePermissions.request('camera').then(response => {
            // Returns once the user has chosen to 'allow' or to 'not allow' access
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            if (response == 'authorized') {
                if (callback) {
                    callback(true)
                }
            } else {
                if (callback) {
                    callback(false)
                }
            }
        })

    }
}

PermissionManager.gotoSetupLocation = (callback) => {
    SystemSetting.switchLocation(() => {
        if (callback) {
            callback()
        }
    })
}

export default PermissionManager