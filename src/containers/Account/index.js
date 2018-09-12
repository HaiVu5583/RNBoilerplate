import React from 'react';
import { connect } from 'react-redux'
import I18n from '~/src/I18n'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT } from '~/src/themes/common'
import { ImageBackground, ScrollView } from 'react-native'
import { Surface, Toolbar, Text, Icon } from '~/src/themes/ThemeComponent'
import Image from 'react-native-fast-image'
import { COLORS } from '~/src/themes/common'
import RowItem from '~/src/components/RowItem'
import styles from './styles'
import MaskBalanceView from '~/src/components/MaskBalanceView'

class Account extends React.PureComponent {
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

    render() {

        return (
            <Surface themeable={false} flex>
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: 180 }}>
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: 'white' }}
                        titleT={'account'}
                        titleStyle={{ color: 'white' }}
                        componentId={this.props.componentId}
                    />
                    <Surface themeable={false} space20 />
                    <Surface themeable={false} rowAlignStart containerHorizontalMargin>
                        <Image
                            source={{ uri: 'https://am23.akamaized.net/tms/cnt/uploads/2015/06/TheGameWorldDoctorStrange-832x1024.jpg' }}
                            style={styles.avatar} />
                        <Surface themeable={false} flex style={{ paddingLeft: 16 }}>
                            <Text description white>HOANG THANH GIANG</Text>
                            <Surface themeable={false} space8 />
                            <Surface themeable={false} rowStart>
                                <Icon name={'GB_icon-34'} style={{ color: COLORS.WHITE, fontSize: 13, marginRight: 3 }} />
                                <Text info white>0912 233 3444</Text>
                            </Surface>


                            <Surface themeable={false} rowStart>
                                <Icon name={'GB_icon-35'} style={{ color: COLORS.WHITE, fontSize: 13, marginRight: 3 }} />
                                <Text info white>htgiang@gmail.com</Text>
                            </Surface>
                        </Surface>
                        <Icon name='GB_icon-27' style={{ fontSize: 24, color: COLORS.DARK_BLUE }} />
                    </Surface>
                </ImageBackground>
                <MaskBalanceView style={{ backgroundColor: COLORS.LIGHT_BLUE }} color={COLORS.BLACK} />

                <Surface flex>
                    <RowItem icon='bill-pay' textT={'account_statement'} iconStyle={styles.rowIcon} />
                    <RowItem icon='history' textT={'transaction_history'} iconStyle={styles.rowIcon} />
                    <RowItem icon='payment-method' textT={'payment_account'} iconStyle={styles.rowIcon} />
                    <RowItem icon='pass' textT={'change_password'} iconStyle={styles.rowIcon} />
                </Surface>
            </Surface>
        )
    }
}

export default connect(null, {})(Account)