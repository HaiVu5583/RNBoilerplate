
import React, { Component } from 'react';
import {
    View, Text
} from 'react-native';
import { Navigation } from 'react-native-navigation'
import { FlatList, Colors } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ErrorBoundary from '~/src/components/ErrorBoundary'


export default class FeedScreen extends Component {
    static get options() {
        return {
            topBar: {
                drawBehind: false,
                visible: true,
                animate: false
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
        console.log('Constructor State', this.state)
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

    render() {
        return (
            <ErrorBoundary>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    getItemLayout={this._getItemLayout}
                    keyExtractor={item => '' + item.id}
                />
            </ErrorBoundary>
        )
    }
}

// export default connect(null, null, null, { withRef: true })(Home)
