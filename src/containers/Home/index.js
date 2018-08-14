
import React, { Component } from 'react';
import {
    View, TagsInput, Button, Card, Colors,
    Carousel, Text, Constants, PageControl
} from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation'
import { ScrollView } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { getData } from '~/src/store/actions/home'
import BottomSheet from '~/src/components/BottomSheet'
import TagSelect from '~/src/components/TagSelect'


class Home extends Component {
    static get options() {
        return {
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false
            }
        };
    }

    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            page: 0
        }
    }

    navigationButtonPressed({ buttonId }) {
        console.log('Back Button Press', buttonId)
    }

    onChangePage = (index) => {
        console.log('Page Control', this.pageControl)
        this.setState({ page: index });
    }

    _handlePressButton = () => {
        console.log('Call Push Animated Screen', new Date().getTime())
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.AnimatedScreen',
                options: {
                    animations: {
                        push: {
                            content: {
                                y: {
                                    from: 1000,
                                    to: 0,
                                    duration: 250,
                                    startDelay: 100,
                                    interpolation: 'accelerate'
                                }
                            }
                        }
                    },
                    topBar: {
                        visible: true,
                        drawBehind: false,
                        animate: true,
                        title: {
                            text: 'Animated Example'
                        },
                    }
                }
            }
        });
    }

    _handleOpenFeed = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'gigabankclient.FeedScreen',
                options: {
                    animations: {
                        push: {
                            content: {
                                y: {
                                    from: 1000,
                                    to: 0,
                                    duration: 250,
                                    startDelay: 100,
                                    interpolation: 'accelerate'
                                }
                            }
                        }
                    },
                    topBar: {
                        visible: true,
                        drawBehind: false,
                        animate: true,
                        title: {
                            text: 'Home Feed'
                        },
                    }
                }
            }
        });
    }

    componentDidMount() {
        this.props.getData()
    }

    _handleOpenBottomSheet = () => {
        this.bottomSheet && this.bottomSheet.open()
    }

    _renderFilter = () => {
        return (
            <BottomSheet
                ref={ref => this.bottomSheet = ref}
                showHeader={true}
                title={'Chọn bộ lọc'}
            >
                <View>
                    
                    <TagSelect
                        data={
                            [
                                {
                                    id: 1,
                                    icon: 'account',
                                    text: 'Nam'
                                },
                                {
                                    id: 2,
                                    icon: 'account',
                                    text: 'Nữ'
                                },
                            ]
                        }
                        headerTitle={'Dành cho'}
                    />
                    <TagSelect
                        data={
                            [
                                {
                                    id: 1,
                                    icon: 'bike',
                                    text: 'Đạp xe'
                                },
                                {
                                    id: 2,
                                    icon: 'blinds',
                                    text: 'Trình chiếu'
                                },
                                {
                                    id: 3,
                                    icon: 'brain',
                                    text: 'Có não'
                                },
                                {
                                    id: 4,
                                    icon: 'saxophone',
                                    text: 'Saxophone'
                                },
                                {
                                    id: 5,
                                    icon: 'bus-side',
                                    text: 'Xe bus'
                                },
                                {
                                    id: 6,
                                    icon: 'stack-overflow',
                                    text: 'Stack Overflow'
                                },
                                {
                                    id: 7,
                                    icon: 'yin-yang',
                                    text: 'Dịch cân kinh ahihi text nữa'
                                },
                                {
                                    id: 8,
                                    icon: 'wallet',
                                    text: 'Ví tiền'
                                },
                                {
                                    id: 9,
                                    icon: 'shopping',
                                    text: 'Mua sắm'
                                },
                                {
                                    id: 10,
                                    icon: 'gamepad-variant',
                                    text: 'Giải trí'
                                },
                            ]
                        }
                        headerTitle={'Danh mục'}
                    />
                </View>
            </BottomSheet>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this._renderFilter()}
                <ScrollView>
                    <View>
                        <Carousel loop onChangePage={(index => this.onChangePage(index))}>
                            <View bg-red50 center width={Constants.screenWidth} height={200}>
                                <Text>PAGE 1</Text>
                            </View>
                            <View bg-purple50 center width={Constants.screenWidth} height={200}>
                                <Text>PAGE 2</Text>
                            </View>
                            <View bg-green50 center width={Constants.screenWidth} height={200}>
                                <Text>PAGE 3</Text>
                            </View>
                            <View bg-yellow20 center width={Constants.screenWidth} height={200}>
                                <Text>PAGE 4</Text>
                            </View>
                            <View bg-purple20 center width={Constants.screenWidth} height={200}>
                                <Text>PAGE 5</Text>
                            </View>
                            <View bg-blue10 center width={Constants.screenWidth} height={200}>
                                <Text>PAGE 6</Text>
                            </View>
                        </Carousel>
                        <PageControl width={Constants.width} containerStyle={styles.pageControl} numOfPages={6} currentPage={this.state.page} color={Colors.orange30} size={10}
                            ref={ref => this.pageControl = ref}
                        />
                    </View>
                    <View center padding-10>
                        <Card
                            width={'100%'}
                            shadowType="white10"
                            borderRadius={2}
                            marginB-10
                        >
                            <View padding-10 flex center>
                                <Button text70 white background-orange30 label="Open Screen" onPress={this._handlePressButton} />
                                <Button
                                    outline
                                    outlineColor={Colors.orange30}
                                    label="Open Feed"
                                    marginT-20
                                    text70
                                    onPress={this._handleOpenFeed}
                                />
                                <Button text70 white background-orange30 marginT-20 label="Open BottomSheet" onPress={this._handleOpenBottomSheet} />
                            </View>
                        </Card>

                        <Card
                            width={'100%'}
                            height={150}
                            shadowType="white10"
                            borderRadius={2}
                            marginB-10
                        >
                            <View padding-10 flex center>
                                <TagsInput
                                    containerStyle={{ marginBottom: 20, width: '100%' }}
                                    placeholder="Add friends"
                                    tags={this.state.tags}
                                />
                            </View>
                        </Card>
                        <Text>Just a Simple Text</Text>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

export default connect(null, { getData }, null, { withRef: true })(Home)
