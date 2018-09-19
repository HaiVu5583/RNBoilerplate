import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, ScrollView, BackHandler, Platform } from 'react-native'
import { Surface, Toolbar, Text, Icon, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'
import { Navigation } from 'react-native-navigation'
import styles from './styles'


export default class ContactChooser extends React.PureComponent {
    static get options() {
        if (Platform.OS == 'android') {
            return {
                animations: {
                    push: DEFAULT_PUSH_ANIMATION,
                    pop: DEFAULT_POP_ANIMATION
                }
            }
        }
        return {}
    }

    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        }
    }

    _handleBack = () => {
        Navigation.pop(this.props.componentId)
        return true
    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    _handlePressSearchIcon = () => {

    }

    _renderSearchBox = () => {
        return (
            <Surface themeable={false} rowStart flex>
                <TextInput
                    placeholderT={'contact_search_hint'}
                    blackWithDarkblueIcon
                    noBorder
                    onChangeText={text => this.setState({ keyword: text })}
                    value={this.state.keyword}
                    iconRight={'GB_search'}
                    onPressIconRight={this._handlePressSearchIcon}
                    showIconRight={true}
                    containerStyle={styles.searchBox}
                />
            </Surface>
        )

    }

    render() {
        console.log('Contact Chooser Props', this.props)
        return (
            <Surface flex>
                <Toolbar
                    centerComponent={this._renderSearchBox}
                    containerStyle={{ backgroundColor: COLORS.BLUE }}
                    componentId={this.props.componentId}
                />
            </Surface>
        )
    }
}