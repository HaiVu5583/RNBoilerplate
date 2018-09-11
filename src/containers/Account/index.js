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
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={ASSETS.LIGHT_BACKGROUND} style={{ width: DEVICE_WIDTH, height: 180 }}>
                    <Toolbar
                        themeable={false}
                        iconStyle={{ color: 'white' }}
                        title={I18n.t('account')}
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
                <Surface style={{ backgroundColor: COLORS.LIGHT_BLUE, paddingVertical: 16 }} rowSpacebetween containerHorizontalMargin>
                    <Text description>VNĐ | {'\u2022 \u2022 \u2022 \u2022 \u2022 \u2022'}</Text>
                    <Icon name={'GB_icon-24'} style={{ fontSize: 24, marginRight: 3 }} />
                </Surface>

                <Surface flex>
                    <RowItem icon='bill-pay' text={I18n.t('account_statement')} iconStyle={styles.rowIcon} />
                    <RowItem icon='history' text={I18n.t('transaction_history')} iconStyle={styles.rowIcon} />
                    <RowItem icon='payment-method' text={I18n.t('payment_account')} iconStyle={styles.rowIcon} />
                    <RowItem icon='pass' text={I18n.t('change_password')} iconStyle={styles.rowIcon} />
                </Surface>
            </ScrollView>
        )
    }
}

export default connect(null, {})(Account)