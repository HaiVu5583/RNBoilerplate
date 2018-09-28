import React, { Component } from 'react';
import { Surface, Text, Button } from '~/src/themes/ThemeComponent'
import { addCardSuccess } from '~/src/components/Asset/AddCardSuccess'
import SvgUri from 'react-native-svg-uri'
export default class AddCardSuccess extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    _handleBackToList = () => {
        const { onPress } = this.props
        onPress && onPress()
    }


    render() {
        return (
            <Surface themeable={false} columnCenter full>
                <Surface themeable={false} imageBackground/>
                <Text bold white textTransform={String.prototype.toUpperCase} t={'add_card_success'}></Text>
                <SvgUri
                    width="375"
                    height="180"
                    svgXmlData={addCardSuccess}
                />
                <Surface containerHorizontalSpace2 rowCenter themeable={false}>
                    <Text center white description t='add_card_success_1' />
                </Surface>
                <Surface flex themeable={false} />
                <Surface themeable={false} containerHorizontalSpace rowAlignEnd>
                    <Button
                        round full outline-blue
                        noPadding
                        t={'back_to_list'}
                        onPress={this._handleBackToList}
                        enable={true}
                        style={{ marginBottom: 16 }}
                    />
                </Surface>
            </Surface>

        )
    }
}
