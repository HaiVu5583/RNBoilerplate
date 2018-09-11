import React from 'react';
import { connect } from 'react-redux'
import I18n from '~/src/I18n'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, ScrollView } from 'react-native'
import { Surface, Toolbar, Text, Icon, Button } from '~/src/themes/ThemeComponent'
import Image from 'react-native-fast-image'
import { COLORS } from '~/src/themes/common'
import BankAccountItem from '~/src/components/BankAccountItem'
import MaskBalanceView from '~/src/components/MaskBalanceView'



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
            selecteCard: 1
        }
        this.bankAccount = [
            {
                id: 1,
                bankImage: 'https://i1.wp.com/sysbox.com.au/wp-content/uploads/2017/06/inverted-old-visa1.png?fit: 500%2C316&ssl: 1',
                bankAccount: '7813737375432',
                expireDate: '09/19',
            },
            {
                id: 2,
                bankImage: 'https://banner2.kisspng.com/20171216/dcc/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg',
                bankAccount: '7813737375432',
                expireDate: '09/19',
            },
            {
                id: 3,
                bankImage: 'https://i1.wp.com/sysbox.com.au/wp-content/uploads/2017/06/inverted-old-visa1.png?fit=500%2C316&ssl=1',
                bankAccount: '7813737375432',
                expireDate: '09/19',
            }
        ]
    }

    _handlePressAddCard = () => {
        console.log('Handle Press AddCard')
    }

    _handlePressBankItem = (item) => {
        console.log('Press Item', item)
        if (item.id != this.state.selecteCard) {
            this.setState({ selecteCard: item.id })
        }
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
                    <Surface themeable={false} style={{ height: 120 }}>
                        <Surface themeable={false} containerHorizontalSpace>
                            <Text white description t='charge_gigabank_hint' />
                        </Surface>
                        <Surface themeable={false} space16 />
                        <MaskBalanceView money={'120000'} />
                    </Surface>
                    <Surface flex>
                        <ScrollView>
                            <Surface containerHorizontalMargin flex>
                                <Surface themeable={false} space20 />
                                {this.bankAccount.map((item) => (
                                    <Surface themeable={false} key={item.id}>
                                        <BankAccountItem
                                            bankImage={item.bankImage}
                                            bankAccount={item.bankAccount}
                                            expireDate={item.expireDate}
                                            onPress={() => this._handlePressBankItem(item)}
                                            active={this.state.selecteCard == item.id}
                                        />
                                        <Surface themeable={false} space16 />
                                    </Surface>
                                ))}
                                <Button
                                    flat
                                    rowStart
                                    leftComponent={() => (
                                        <Icon name='GB_icon-41' style={{ fontSize: 24, color: COLORS.BLUE }} />
                                    )}
                                    centerComponent={() => (
                                        <Text blue t='add_link_card' />
                                    )}
                                    style={{ paddingLeft: 0, paddingRight: 0 }}
                                />
                            </Surface>
                        </ScrollView>
                        <Surface themeable={false} space16 />
                        <Surface containerHorizontalSpace rowAlignEnd>
                            <Button round full
                                t={'continue'}
                                onPress={this._handlePressAddCard}
                                enable={true}
                                gradientButton={false}
                                style={{ marginBottom: 10 }}
                            />
                        </Surface>
                    </Surface>


                    {/* <Surface style={{ height: 200 }}>
                        <Surface containerHorizontalSpace flex rowAlignEnd>
                            <Surface themeable={false} flex>
                                <BankAccountItem
                                    bankImage='https://i1.wp.com/sysbox.com.au/wp-content/uploads/2017/06/inverted-old-visa1.png?fit=500%2C316&ssl=1'
                                    bankAccount='7813737375432'
                                    expireDate='09/19'
                                    active={true}
                                />
                                <Button round full
                                    t={'add_card'}
                                    onPress={this._handlePressAddCard}
                                    enable={true}
                                    gradientButton={true}
                                    style={{marginBottom: 10}}
                                />
                            </Surface>
                        </Surface>
                    </Surface> */}
                </ImageBackground>
            </Surface >
        )
    }
}

export default connect(null, {})(Charge)