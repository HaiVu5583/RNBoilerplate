import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native'
import NotificationCenter from '~/src/utils/NotificationCenter'
import I18n from '~/src/I18n'
import Icon from '~/src/components/ClingmeFont2'
import styles, { imageWidth } from './styles'
import RemoveIcon from '~/src/assets/RemoveIcon'
import BorderView from '~/src/components/BorderView'

const MAX_PICTURE = 6

export default class PreparedPictureList extends React.PureComponent {
    constructor(props) {
        super(props)
        if (!props.dataList) {
            let dataList = []
            dataList[0] = "-"
            this.state = { dataList: dataList }
        } else {
            let dataList2 = ['-', ...props.dataList]
            this.state = { dataList: dataList2 }
        }

        // Set default max picture
        // if (!props.maxPicture) {
        //     this.state = {
        //         maxPicture: MAX_PICTURE
        //     }
        // } else {
        //     this.state = {
        //         maxPicture: props.maxPicture
        //     }
        // }
    }

    _onReceivedPictures = (data) => {

        let oldDataList = this.state.dataList



        let dataList = [...oldDataList]

        for (let i in data) {

            let found = false
            oldDataList.find((o, index) => {
                if (data[i] === o) {
                    found = true
                    return true
                }
            })

            if (!found)
                dataList.push(data[i])
        }

        this.setState({
            dataList: dataList
        })
    }
    componentDidMount() {
        NotificationCenter.registerNotification('image_browser_completed', this._onReceivedPictures)
    }

    componentWillUnmount() {
        NotificationCenter.unregisterNotification('image_browser_completed', this._onReceivedPictures)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.dataList != nextProps.dataList) {

            let dataList2 = [
                '-',
                ...nextProps.dataList
            ]

            this.setState({ dataList: dataList2 })
        }
    }

    _onAddPicturePressd = () => {

        let addPictureFunc = this.props.onAddPicturePressed
        if (!!addPictureFunc) {
            addPictureFunc()
        }
        /*
        if (!!addPictureFunc) {
          NotificationCenter.sendNotification('updated_selected_image', this.getPicturesList())
          addPictureFunc()
        } else {
          let params = {
            screenName: 'PictureBrowser',
            isSlided: true,
            isOpenedFromAnother: true,
            selectedPictures: this.getPicturesList(),
            parent: 'preparedPictureList' //DuongNT: chu y cho nay
          }
          ClingmeUtils.sendNotificationMessage(ClingmeUtils.MSG_PLAY_CLINGME_20_UNIVERSAL_VIEW_MEDIATOR, params)
        }*/
    }
    _onRemovePicturePress = (pictureIndex) => {
        const srcList = this.state.dataList

        if (srcList.length == MAX_PICTURE + 1)
            pictureIndex++

        let dataList = []

        let count = 0;
        for (let key in srcList) {
            if (key != pictureIndex) {
                dataList[count] = srcList[key];
                count++
            }
        }

        this.setState({
            dataList: dataList
        })

        const { onImageRemoved, updateListImage } = this.props
        if (onImageRemoved) onImageRemoved(dataList.length == 1)

        if (updateListImage) {
            let temp = [...dataList]
            temp.splice(0, 1)
            updateListImage(temp)
        }
    }

    _renderItem = (item) => {
        let { onPicturePress } = this.props
        if (item.item == '-') {
            return (
                <TouchableWithoutFeedback onPress={this._onAddPicturePressd}>
                    <View style={styles.addPictureCell}>
                        <View>
                            <Icon name='plus' style={styles.addPictureIcon}/>
                            {/* <Text style={styles.addPictureText}>{I18n.t('place_upload_photo_addpicture_button')}</Text> */}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                )
        } else {
            return (
                <TouchableWithoutFeedback onPress={() => onPicturePress(item.item)}>
                    <View>
                        <Image source={{ uri: item.item }} resizeMode={'cover'} resizeMethod={'resize'} style={styles.pictureCell} />
                        <TouchableWithoutFeedback onPress={() => this._onRemovePicturePress(item.index)} >
                            <View style={styles.removePictureIcon}>
                                <RemoveIcon style={{ width: 24, height: 24 }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }

    getPicturesList = () => {
        //<SvgUri width='18' height='18' source={Platform.OS === 'android' ? deleteIcon : {uri : RNFS.MainBundlePath + '/asset/upload_picture_delete.svg'}} />
        let retData = [...this.state.dataList]

        retData.splice(0, 1)

        return retData
    }

    render() {
        console.log('data list', this.state.dataList)
        let dataList = [...this.state.dataList]
        console.log('data list', dataList)

        if (dataList.length == MAX_PICTURE + 1 && dataList[0] == '-') {
            dataList.splice(0, 1)
            console.log('data list', dataList)
        }

        return (
            <FlatList
                style={styles.pictureGrid}
                contentContainerStyle={styles.pictureGrid.contentContainerStyle}
                data={dataList}
                alwaysBounceVertical={false}
                numColumns={styles.gridColumns}
                keyExtractor={(item, index) => index+''}
                renderItem={this._renderItem}
                removeClippedSubviews={true}
            />
        )
    }
}