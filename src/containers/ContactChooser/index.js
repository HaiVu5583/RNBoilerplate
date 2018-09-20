import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { BackHandler, Platform, FlatList } from 'react-native'
import { Surface, Toolbar, Text, Icon, Button, TextInput } from '~/src/themes/ThemeComponent'
import { COLORS } from '~/src/themes/common'
import { Navigation } from 'react-native-navigation'
import styles from './styles'
import Contacts from 'react-native-contacts'
import Ripple from 'react-native-material-ripple'



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
            keyword: '',
            contacts: []
        }
    }

    _handleBack = () => {
        Navigation.pop(this.props.componentId)
        return true
    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack)
        Contacts.getAllWithoutPhotos((err, contacts) => {
            this.setState({ contacts: contacts.filter(item => item.phoneNumbers && item.phoneNumbers.length > 0) })
        })
    }

    _handlePressSearchIcon = () => {

    }

    _onChangeKeyword = (text) => {
        this.setState({ keyword: text }, () => {
            Contacts.getContactsMatchingString(text, (err, contacts) => {
                this.setState({ contacts: contacts.filter(item => item.phoneNumbers && item.phoneNumbers.length > 0) })
            })
        })
    }

    _renderSearchBox = () => {
        return (
            <Surface themeable={false} rowStart flex>
                <TextInput
                    placeholderT={'contact_search_hint'}
                    blackWithDarkblueIcon
                    noBorder
                    onChangeText={this._onChangeKeyword}
                    value={this.state.keyword}
                    iconRight={'GB_search'}
                    onPressIconRight={this._handlePressSearchIcon}
                    showIconRight={true}
                    containerStyle={styles.searchBox}
                />
            </Surface>
        )

    }

    _handlePressContactItem = (item) => {
        const { onChooseContact } = this.props
        Navigation.pop(this.props.componentId)
        onChooseContact(item.phoneNumbers[0].number)
    }

    _renderContactItem = ({ item, index }) => {
        const phoneNumber = item.phoneNumbers && item.phoneNumbers.length > 0 ?
            item.phoneNumbers[0].number : ''
        let name = (item.givenName || '')
        if (item.middleName) name += ` ${item.middleName}`
        if (item.familyName) name += ` ${item.familyName}`
        return (
            <Ripple onPress={() => this._handlePressContactItem(item)}>
                <Surface borderBottomBlue style={{ paddingVertical: 16 }}>
                    <Text description>{name}</Text>
                    <Text description>{phoneNumber}</Text>
                </Surface>
            </Ripple>
        )
    }

    render() {
        console.log('Contact Chooser Props', this.props)
        return (
            <Surface flex>
                <Toolbar
                    centerComponent={this._renderSearchBox}
                    containerStyle={{ backgroundColor: COLORS.BLUE }}
                    style={{ paddingRight: 16 }}
                    componentId={this.props.componentId}
                />
                <FlatList
                    data={this.state.contacts}
                    renderItem={this._renderContactItem}
                    keyExtractor={item => '' + item.rawContactId}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                />
            </Surface>
        )
    }
}