import React, { Component } from 'react'
import {
    View,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Image,
    StatusBar,
    ImageBackground,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native'
import { Surface, Text, Toolbar, Button, Icon, TextInput } from '~/src/themes/ThemeComponent'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { maskBankAccount, getElevation } from '~/src/utils'
import styles from './styles'
import {
    ASSETS,
    DEVICE_WIDTH,
    DEVICE_HEIGHT,
    SURFACE_STYLES,
    COLORS,
    SIZES,
    STATUS_BAR_HEIGHT
} from '~/src/themes/common'
import Cards from '~/src/components/Cards'
import BankAccountItem from '~/src/components/BankAccountItem'

class WithDrawSearch extends Component {
    
    constructor(props) {
        super(props)
        
        // this.state = {
        //     searchWord: ''
        // }
    }

    componentDidMount() {

    }
    
    // getText = () => {
    //     return this.state.searchWord
    // }
    
    // setText = (text) => {
    //     this.setState({newValue: text})
    // }
    
    _onPressBack = () => {
        alert('On back press handle')
    }

    _onPressSearch = () => {
        // alert(this.getText())
    }

    _handleAddCard = () => {
        alert('Add card is press')
    }

    _renderItemFlatList = ({item, index}) => {
        if (item.id > 0) {
            return (
                <BankAccountItem
                    bankImage={item.iconBank}
                    bankName={item.bankName}
                    // expireDate = {item.expireDate}
                    bankAccount = {item.bankAccount}
                />
            )
        } else {
            return (
                <Button rowStart leftComponent={() => (
                        <Icon name='GB_plus' style={{ fontSize: 24, color: COLORS.BLUE,}} />
                    )}
                    centerComponent={() => (
                        <Text blue t={item.bankName} style={{marginLeft: SIZES.CONTAINER_HORIZONTAL_SPACE,}} />
                    )}
                    onPress={this._handleAddCard}
                    style={{backgroundColor: COLORS.WHITE,}}
                />
            )
        }
    }

    render() {

        const items = [
            {
                id: 1,
                iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg',
                bankName: 'NMMK M',
                expireDate: '12/22',
                bankAccount: 'HUU LUNG LA'
            },
            {
                id: 2,
                iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg',
                bankName: 'NMMK M',
                expireDate: '12/22',
                bankAccount: 'HUU LUNG LA'
            },
            {
                id: 3,
                iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg',
                bankName: 'NMMK M',
                expireDate: '12/22',
                bankAccount: 'HUU LUNG LA'
            },
            // {
            //     id: 4,
            //     iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg',
            //     bankName: 'NMMK M',
            //     expireDate: '12/22',
            //     bankAccount: 'HUU LUNG LA'
            // },
            // {
            //     id: 5,
            //     iconBank: 'https://images.pexels.com/photos/8633/nature-tree-green-pine.jpg',
            //     bankName: 'NMMK M',
            //     expireDate: '12/22',
            //     bankAccount: 'HUU LUNG LA'
            // },
            {
                id: 0,
                iconBank: '',
                bankName: 'add_payment_account',
                expireDate: '',
                bankAccount: ''
            },
        ]

        return (
            <Surface themeable={false} flex>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    {/* <View style={styles.bar}>
                        <TouchableWithoutFeedback onPress={this._onPressBack}>
                            <View style={styles.backContainer}>
                                <Icon name={'GB_arrow_left'} style={styles.backIcon} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.searchCover}>
                            <TextInput style={styles.searchText}
                                placeholderT={'search_bank'}
                                onChangeText={(value) => this.setState({searchWord: value})}
                            />
                            <TouchableWithoutFeedback onPress={this._onPressSearch}>
                                <View style={styles.rightContainer }>
                                    <Icon name={'GB_search'} style={styles.searchIcon} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View> */}
                    <Toolbar
                        themeable={false}
                        iconStyle={styles.iconStyle}
                        titleT={'with_draw_title'}
                        titleStyle={styles.titleStyle}
                        componentId={this.props.componentId}
                        onPressIconLeft={this._handleBack}
                        iconRight={'GB_search'}
                        onPressIconRight={this._onPressSearch}
                    />
                    <Surface themeable={false} style={styles.descriptionCover} containerHorizontalSpace>
                        <Surface space10 themeable={false} />
                        <Text white description t={'charge_phone_description'} style={styles.description} />
                    </Surface>
                    <Surface space24 />
                    <Surface themeable={true} flex>
                        <FlatList
                            data={items}
                            renderItem={this._renderItemFlatList}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => item.id + '_' + index}
                            bounces={false}
                            style={{paddingLeft: SIZES.CONTAINER_HORIZONTAL_MARGIN, paddingRight: SIZES.CONTAINER_HORIZONTAL_MARGIN}}
                            >
                        </FlatList>
                    </Surface>
                </ImageBackground>
            </Surface>
        )
    }
}

export default connect(null, {})(WithDrawSearch)