import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, STATUS_BAR_HEIGHT } from '~/src/themes/common'
import { Platform, FlatList } from 'react-native'
import { Surface, Text } from '~/src/themes/ThemeComponent'
import { SIZES } from '~/src/themes/common'
import { Navigation } from 'react-native-navigation'
import Screen from '~/src/components/Screen'
import CardItem from '~/src/components/CardItem'
const gridWidth = (DEVICE_WIDTH - SIZES.CONTAINER_HORIZONTAL_MARGIN * 2) / 3

export default class BuyCardPrice extends React.PureComponent {
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
            loading: false
        }
        this.header = {
            titleT: 'buy_card_price_hint',
        }
    }

    _render = () => {
        return (
            <Surface content flex>
                <Surface containerHorizontalSpace titleInfoBlock>
                    <Text bold darkBlue titleInfo t={'choose_phone_card_type'} textTransform={String.prototype.toUpperCase} />
                </Surface>
            </Surface>
        )
    }

    render() {
        return <Screen
            content={this._render}
            header={this.header}
            toolbarTitleT='buy_card'
            hanleBack={this._handleBack}
            componentId={this.props.componentId}
            loading={this.state.loading}
        />
    }
}