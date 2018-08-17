
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation'
import { FlatList, Colors } from 'react-native'
import styles from './styles'
import { Switch } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ErrorBoundary from '~/src/components/ErrorBoundary'
import { Surface, Background, Text, Button, Toolbar } from '~/src/themes/ThemeComponent'
import { changeTheme } from '~/src/store/actions/ui'
import { THEMES } from '~/src/themes/common.js'
import { connect } from 'react-redux'
import { themeSelector } from '~/src/store/selectors/Theme'
import { changeBottomTabColor } from '~/src/utils'
import { getTheme } from '~/src/themes/utils'

class FeedScreen extends Component {
    static get options() {
        return {
            topBar: {
                visible: false,
                drawBehind: false,
                animate: false,
            },
        };
    }

    constructor(props) {
        super(props)
        const data = []
        for (let i = 0; i < 1000; i++) {
            data.push({
                id: i,
                comment: `${i}--Designed to inter-operate with your existing JavaScript, Immutable.js accepts plain JavaScript Arrays and Objects anywhere a method expects an Collection--${i}`,
                liked: false
            })
        }
        this.state = {
            data,
        }
        this.view = React.createRef()
    }

    _handleLike = (item) => {
        console.log('Press Like', item)
        let index = this.state.data.findIndex(dataItem => dataItem.id == item.id)
        if (index < 0) return
        const newData = [...this.state.data]
        newData[index]['liked'] = !newData[index]['liked']
        this.setState({ data: newData })
    }

    _renderItem = ({ item, index }) => {
        return (
            <View padding-10 style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Icon name='heart'
                    size={30} color={item.liked ? 'orangered' : 'gray'}
                    onPress={() => this._handleLike(item)}
                    style={{ marginRight: 5 }}
                />
                <Text style={{ flex: 1, color: 'rgba(0, 0, 0, 0.9)', fontSize: 14 }}>
                    {item.comment}
                </Text>
            </View>
        )
    }

    componentDidMount() {
    }

    _onChangeTheme = () => {
        const { theme, changeTheme } = this.props
        if (theme == THEMES.dark) {
            changeTheme(THEMES.light)
            const theme = getTheme(THEMES.light)
            changeBottomTabColor(theme.surfaceColor)
        } else {
            changeTheme(THEMES.dark)
            const theme = getTheme(THEMES.dark)
            changeBottomTabColor(theme.surfaceColor)
        }
    }

    _handleShowModal = () => {
        console.log('Handle Show Modal')
        Navigation.showModal({
            component: {
                name: 'gigabankclient.SplashScreen',
                options: {
                    modalPresentationStyle: 'pageSheet', // Supported styles are: 'formSheet', 'pageSheet', 'overFullScreen', 'overCurrentContext', 'currentContext', 'popOver', 'fullScreen' and 'none'. On Android, only overCurrentContext and none are supported.
                    overrideBackPress: true
                }
            }
        })
    }

    render() {
        console.log('FeedScreen Props', this.props)
        const { theme } = this.props
        return (
            <ErrorBoundary>
                {/* <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    getItemLayout={this._getItemLayout}
                    keyExtractor={item => '' + item.id}
                /> */}
                <Background style={{ flex: 1 }}>
                    <Toolbar title='Home Feed' iconRight={'3dots'}/>
                    <Text medium>
                        When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library. This is because your library likely has an observably different behavior (such as what refs get assigned to, and what types are exported), and this can break apps and other libraries that depend on the old behavior
                    </Text>
                    <Surface style={{ flexDirection: 'row', padding: 10 }}>
                        <Button
                            icon='phone-money-2'
                            text={'Button Customize'}
                            onPress={this._handleShowModal}
                        />
                    </Surface>
                    <Surface style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text>Use dark theme?</Text>
                        <Switch value={(theme == THEMES.dark)} onValueChange={this._onChangeTheme} />
                    </Surface>
                </Background>
            </ErrorBoundary>
        )
    }
}

export default connect(state => ({
    theme: themeSelector(state)
}), { changeTheme })(FeedScreen)
