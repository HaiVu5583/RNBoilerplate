import HomeScreen from '~/src/containers/Home'
import SplashScreen from '~/src/containers/SplashScreen'
import AnimatedScreen from '~/src/containers/AnimatedScreen'
import FeedScreen from '~/src/containers/FeedScreen'
import PictureBrowserScreen from '~/src/containers/PictureBrowserScreen'
import Authentication from '~/src/containers/Authentication'
import Login from '~/src/containers/Authentication/Login'
import Register from '~/src/containers/Authentication/Register'
import ForgotPassword from '~/src/containers/Authentication/ForgotPassword'
import Drawer from '~/src/containers/Drawer'
import { createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import BottomTab from '~/src/components/BottomTab'
import BottomTabItem from '~/src/components/BottomTab/BottomTabItem'
import React from 'react'
import Icon from '~/src/components/FontIcon'
import COLORS from '~/src/themes/common'
import { TouchableOpacity } from 'react-native';



export const AppTabRouteConfig = {
    Home: {
        screen: HomeScreen
    },
    Splash: {
        screen: SplashScreen
    },
    Animated: {
        screen: AnimatedScreen
    },
}

const HomeTab = createMaterialBottomTabNavigator(
    AppTabRouteConfig,
    {
        initialRouteName: 'Home',
        activeTintColor: '#f0edf6',
        inactiveTintColor: '#3e2465',
        barStyle: { backgroundColor: '#694fad' },
        // tabBarComponent: props => <BottomTab {...props} />,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'home-active';
                } else if (routeName === 'Splash') {
                    iconName = 'camera';
                } else if (routeName === 'Animated') {
                    iconName = 'ring-active'
                }
                return <Icon name={iconName}
                    style={{
                        fontSize: 22,
                        color: tintColor
                    }}
                />;
            },
            tabBarButtonComponent: BottomTabItem
        }),
        tabBarOptions: {
            activeTintColor: COLORS.BLUE,
            inactiveTintColor: 'gray',
            tabStyle: {
                backgroundColor: 'transparent'
            },
            barStyle: {
                backgroundColor: 'red'
            },
            style: {
                backgroundColor: 'transparent',
                position: 'absolute',
                borderTopWidth: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
        },
    }
)

export const AppDrawerRouteConfig = {
    Home: {
        screen: HomeTab
    }
}

const HomeDrawer = createDrawerNavigator(
    AppDrawerRouteConfig,
    {
        initialRouteName: 'Home',
        contentComponent: props => <Drawer {...props} />,
        drawerBackgroundColor: 'transparent'
    }
)

export const AppStackRouteConfig = {
    PictureBrowser: {
        screen: PictureBrowserScreen
    },
    Authentication: {
        screen: Authentication
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
    Home: {
        screen: HomeDrawer
    }
}