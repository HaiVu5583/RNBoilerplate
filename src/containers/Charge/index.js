import React from 'react';
import { connect } from 'react-redux'
import I18n from '~/src/I18n'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, ScrollView } from 'react-native'
import { Surface, Toolbar, Text, Icon, Button } from '~/src/themes/ThemeComponent'
import Image from 'react-native-fast-image'
import { COLORS } from '~/src/themes/common'
import RowItem from '~/src/components/RowItem'

class Charge extends React.PureComponent {
    static get options() {
        return {
            animations: {
                push: DEFAULT_PUSH_ANIMATION,
                pop: DEFAULT_POP_ANIMATION
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    _handlePressAddCard = () => {
        console.log('Handle Press AddCard')
    }

    render() {

        return (
            <Surface flex>
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: 'white' }}
                        titleT={'charge_gigabank'}
                        titleStyle={{ color: 'white' }}
                        componentId={this.props.componentId}
                    />
                    <Surface themeable={false} space20 />
                    <Surface themeable={false} containerHorizontalSpace flex>
                        <Text white description t='charge_gigabank_hint' />
                    </Surface>

                    <Surface style={{ height: 200 }}>

                        <Surface containerHorizontalSpace flex rowAlignEnd>
                            <Surface themeable={false} flex>
                                <Button round full
                                    t={'add_card'}
                                    onPress={this._handlePressAddCard}
                                    enable={true}
                                    gradientButton={true}
                                    style={{marginBottom: 10}}
                                />
                            </Surface>
                        </Surface>
                    </Surface>
                </ImageBackground>
            </Surface >
        )
    }
}

export default connect(null, {})(Charge)