import React from 'react'
import { FlatList, Dimensions, View, Text } from 'react-native'
const { width, height } = Dimensions.get('window')
import TagItem from '~/src/components/TagSelect/TagItem'
import styles from './styles';
const itemWidth = width / 2 - 20
export default class TagSelect extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selected: {

            }
        }
    }

    _handlePressTagItem = (item) => {
        console.log('Press TagItem', item)
        let cloneSelected = { ...this.state.selected }
        cloneSelected[item.id] = !(!!cloneSelected[item.id])
        this.setState({ selected: cloneSelected })
    }

    _renderItem = ({ item, index }) => {
        return (
            <View themeable={false} style={{ width: '50%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <TagItem
                    data={item}
                    selected={this.state.selected[item.id] == true}
                    onPress={this._handlePressTagItem}
                    style={{ width: itemWidth, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 8 }}
                />
            </View>
        )
    }

    _renderHeader = () => {
        const { headerTitle } = this.props
        if (!headerTitle) return <View />
        return (
            <View style={styles.headerTitleContainer} themeable={false}>
                <Text style={styles.headerTitle} themeable={false}>{headerTitle}</Text>
            </View>
        )
    }

    render() {
        return (
            <FlatList
                extraData={this.state.selected}
                data={this.props.data}
                renderItem={this._renderItem}
                numColumns={2}
                keyExtractor={item => '' + item.id}
                ListHeaderComponent={this._renderHeader}
            />
        )
    }
}