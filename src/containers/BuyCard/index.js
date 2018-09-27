import React from 'react';
import { connect } from 'react-redux'
import { DEFAULT_PUSH_ANIMATION, DEFAULT_POP_ANIMATION, ASSETS, DEVICE_WIDTH, DEVICE_HEIGHT, STATUS_BAR_HEIGHT } from '~/src/themes/common'
import { Platform, FlatList } from 'react-native'
import { Surface, Text } from '~/src/themes/ThemeComponent'
import { SIZES } from '~/src/themes/common'
import { Navigation } from 'react-native-navigation'
import { getListCard } from '~/src/store/actions/credit'
import { listCardSelector } from '~/src/store/selectors/credit'
import Screen from '~/src/components/Screen'
import CardItem from '~/src/components/CardItem'
const gridWidth = (DEVICE_WIDTH - SIZES.CONTAINER_HORIZONTAL_MARGIN * 2) / 3

class MoneySource extends React.PureComponent {
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
            titleT: 'buy_card_hint',
        }
        this.phoneProvider = [
            {
                id: 1,
                image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/e/e8/Logo_Viettel.svg/800px-Logo_Viettel.svg.png'
            },
            {
                id: 2,
                image: 'https://brasol.vn/public/uploads/1521195204-brasol.vn-logo-vinaphone-vinaphone.jpg'
            },
            {
                id: 3,
                image: 'http://rubee.com.vn/admin/webroot/upload/image/images/bo-nhan-dien-thuong-hieu-mobifone.png'
            },
            {
                id: 4,
                image: 'http://asu.com.vn/wp-content/uploads/2017/12/Vietnammobile.png'
            },
            {
                id: 5,
                image: 'http://chosim.com.vn/noidung/ckeditor/ckfinder/files/images/images1687853_gmobile.jpg'
            }
        ]
        this.gameProvider = [
            {
                id: 1,
                image: 'http://2.bp.blogspot.com/-CBT8ZYwuIBM/UQ9JTfuPuKI/AAAAAAAAASc/XUcOu8Rne6U/s320/garena-logo.jpg'
            },
            {
                id: 2,
                image: 'https://upload.wikimedia.org/wikipedia/vi/5/5e/Zing_official_logo.png'
            },
            {
                id: 3,
                image: 'http://intecom.vtc.vn/media/news.intecom.vtc.vn/2016/12/18/game-1.png'
            },
            {
                id: 4,
                image: 'http://milacellphone.com/wp-content/uploads/2016/04/gate500-1.png'
            }
        ]
    }

    _renderGameProvier = ({ item, index }) => {
        return (
            <Surface themeable={false} columnCenter style={{ width: gridWidth }}>
                <CardItem
                    image={item.image}
                    style={{marginBottom: 5}}
                />
            </Surface>
        )
    }

    _renderPhoneProvider = ({ item, index }) => {
        return (
            <CardItem
                image={item.image}
                style={{ marginRight: 15 }}
            />
        )
    }

    _render = () => {
        return (
            <Surface content flex>
                <Surface containerHorizontalSpace titleInfoBlock>
                    <Text bold darkBlue titleInfo t={'phone_card'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <Surface themeable={false} style={{ height: 90 }}>
                    <FlatList
                        data={this.phoneProvider}
                        renderItem={this._renderPhoneProvider}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => '' + item.id}
                        bounces={false}
                        scrollEnabled={true}
                        contentContainerStyle={{ paddingHorizontal: SIZES.CONTAINER_HORIZONTAL_MARGIN }}
                    />
                </Surface>
                <Surface containerHorizontalSpace titleInfoBlock>
                    <Text bold darkBlue titleInfo t={'game_card'} textTransform={String.prototype.toUpperCase} />
                </Surface>
                <FlatList
                    data={this.gameProvider}
                    renderItem={this._renderGameProvier}
                    keyExtractor={(item, index) => '' + item.id}
                    bounces={false}
                    bounces={false}
                    numColumns={3}
                    contentContainerStyle={{ paddingHorizontal: SIZES.CONTAINER_HORIZONTAL_MARGIN }}
                />
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

export default connect(state => ({
    listCard: listCardSelector(state)
}), { getListCard })(MoneySource)