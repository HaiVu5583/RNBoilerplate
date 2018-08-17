import React, {Component} from 'react'
import {
    BackHandler,
    AppState,
    Platform,
    View,
    Text,
    Switch,
    StyleSheet,
    WebView,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    CameraRoll,
    FlatList,
    Image,
    Button,
    Dimensions
} from 'react-native'

import {ImageBackground} from 'react-native'
import OpenAppSettings from 'react-native-app-settings'

import PopUp from './PopUp'
import Header from './Header'
import SelectFromFolder from './SelectFromFolder'
import PopUpOpenCamera from './PopUpToUsedCamera'
import AcceptToViewAlbum from './AcceptToViewAlbum'

import {Icon} from '~/src/themes/ThemeComponent'
import Permissions from '~/src/utils/PermissionManager'
import {chainParse} from '~/src/utils'
import Camera from '~/src/components/Camera'

const {height, width} = Dimensions.get('window')

// import ClingmeUtils from '~/utils/ClingmeUtils'
import RNPhotosFramework from 'react-native-photos-framework'

const maxOfImagesSelected = 6

const POPUP_TYPE_NONE = 0
const POPUP_TYPE_PHOTO_LIMITED = 1
const POPUP_TYPE_CAMERA_PERMISSION = 2
const POPUP_TYPE_ALBUM_PERMISSION = 3
const MAX_IMAGE_IN_PAGE = 50
const ALL_PICTURES_GROUP = 'Tất cả ảnh'

export default class PictureBrowser extends React.PureComponent{
    selectedImage = []
    numberAtIndex = []

    constructor(props) {
        super(props)

        const selectedPictures = chainParse(this.props, ['params', 'selectedPictures'])

        this.state = {
            photos: [],
            counterSelect: 0,
            stateOfHeader: false,
            showSelectFromAlbum: false,
            groupName: ALL_PICTURES_GROUP,
            pageInfo: '',
            startIndex: 0,
            stateShowPopUpCamera: false,
            selectedPictures: selectedPictures || [],
            popupType: POPUP_TYPE_NONE
        }

        this.reachToEndPhotoList = false

        if (this.props.isShow === undefined) {
            this.props.isShow = true
        }
        console.log('Picture Browser constructor')

        this.maxOfImagesSelected = chainParse(this.props, ['params', 'maxSelectable']) || maxOfImagesSelected

        const allowCameraSaveToCameraRoll = chainParse(this.props, ['params', 'allowCameraSaveToCameraRoll'])

        this.allowCameraSaveToCameraRoll = allowCameraSaveToCameraRoll == undefined || allowCameraSaveToCameraRoll == true
    }

    updateWithSelectedPictures = (albumName) => {
        this._handleButtonPress(albumName)
    }

    filtAlbum = (pictureList, album) => {
        if (!album || album == '') {
            return pictureList
        } else {
            return pictureList.filter(item => {
                return item.node && item.node.group_name == album
            })
        }
    }
    _handleButtonPress = (_groupName) => {
        this._isGetAlbumSuccess = false
        //this._getPhotoWithGroupName(_groupName)

        if (!this._isGetAlbumSuccess) {
            this._isGetAlbumSuccess = true
            this._selectFolder.requestFolder((groupName) => {
                this._getPhotoWithGroupName(_groupName)
            })
        } else {
            this._getPhotoWithGroupName(_groupName)
        }

    }

    _getAlbumObjectByGroupName = (groupName, callback) => {
        let option1 = {
            type: 'album',
            subType: 'any',
            assetCount: 'exact',
            previewAssets: 1,
            fetchOptions: {
                sortDescriptors: [
                    {
                        key: 'title',
                        ascending: true
                    }
                ],
                includeHiddenAssets: false,
                includeAllBurstAssets: false
            },
            //When you say 'trackInsertsAndDeletes or trackChanges' for an albums query result,
            //They will be cached and tracking will start.
            //Call queryResult.stopTracking() to stop this. ex. on componentDidUnmount
            trackInsertsAndDeletes: true,
            trackChanges: false

        }

        let option2 = {...option1, type: 'smartAlbum'}

        RNPhotosFramework.getAlbums(option1).then((queryResult1) => {
            RNPhotosFramework.getAlbums(option2).then((queryResult2) => {
                const albums = [...queryResult1.albums, ...queryResult2.albums]

                let listFolder = []
                let listNumber = []

                this.totalImage = 0

                let listImage = []
                albums.forEach(e => {

                    const subType = e.subType

                    if (
                        (subType === 'albumRegular'
                            || subType === 'smartAlbumUserLibrary'
                        )
                        && e.assetCount > 0
                    ) {
                        //"smartAlbumUserLibrary"


                        if (this.totalImage < e.assetCount)
                            this.totalImage = e.assetCount

                        const titleLower = e.title.toLowerCase()

                        if (groupName.toLowerCase() == titleLower) {
                            callback(e)
                            return
                        }

                    }
                })

            })
        })
    }

    _getPhotoWithGroupNameIOS = (_groupName, startIndex = 0) => {

        if (startIndex == 0) {
            this.reachToEndPhotoList = false
        }

        if (this.reachToEndPhotoList) {
            return
        }

        let tempGroupName = _groupName
        if (tempGroupName == ALL_PICTURES_GROUP) tempGroupName = ''

        if (Platform.OS == 'ios' && tempGroupName == '') {
            tempGroupName = this._selectFolder.getAllAlbumGroupName()
        }

        this._getAlbumObjectByGroupName(tempGroupName, (album) => {
            console.log(album)
            album.getAssets({
                //The fetch-options from the outer query will apply here, if we get
                //prepareForSizeDisplay: Rect(100,100),
                startIndex: startIndex,
                endIndex: startIndex + MAX_IMAGE_IN_PAGE
            }).then(r => {
                console.log(r)

                console.log('getPhotos')

                if (r.includesLastAsset) {
                    this.reachToEndPhotoList = true
                }

                //DuongNT: loc cac picture thuoc 1 album
                let photoList = r.assets
                if (startIndex > 0) {
                    photoList = [...this.state.photos, ...photoList]
                }

                this.setState({photos: photoList, startIndex: startIndex + r.assets.length});

                if (this.state.selectedPictures && this.state.selectedPictures.length > 0) {
                    console.log('a')
                    this.updateList(this.state.selectedPictures)
                }
                else {
                    console.log('b')
                    this.initNumber()

                    for (let i = 0; i < this.numberAtIndex.length; i++) this.numberAtIndex[i] = 0

                    for (let k = 0; k < this.selectedImage.length; k++) {
                        for (let j = 0; j < this.numberAtIndex.length; j++) {
                            if (this.selectedImage[k] == this.state.photos[j].uri) {
                                this.numberAtIndex[j] = k + 1
                            }
                        }
                    }

                    this.forceUpdate()
                }
            })
        })
    }
    _getPhotoWithGroupName = (_groupName, startIndex = 0) => {
        this._getPhotoWithGroupNameIOS(_groupName, startIndex)
        return


        let tempGroupName = _groupName
        if (tempGroupName == ALL_PICTURES_GROUP) tempGroupName = ''

        if (Platform.OS == 'ios' && tempGroupName == '') {
            tempGroupName = this._selectFolder.getAllAlbumGroupName()
        }

        CameraRoll.getPhotos({
            first: 25,
            groupTypes: Platform.OS === 'android' ? undefined : 'All',
            assetType: 'Photos',
            groupName: tempGroupName,
            mimeTypes: ['image/jpeg', 'image/png']
        })
            .then(r => {

                //DuongNT iOS only
                if (!this._isGetAlbumSuccess) {
                    this._isGetAlbumSuccess = true
                    this._selectFolder.requestFolder()
                }

                console.log('getPhotos')
                let end_cursor = ''
                if (r.page_info && r.page_info.has_next_page) {
                    end_cursor = r.page_info.end_cursor
                }


                //DuongNT: loc cac picture thuoc 1 album

                let photoList = this.filtAlbum(r.edges, tempGroupName)

                if (startIndex > 0) {
                    photoList = [...this.state.photos, ...photoList]
                }

                this.setState({photos: photoList, startIndex: end_cursor});

                if (this.state.selectedPictures && this.state.selectedPictures.length > 0) {
                    console.log('a')
                    this.updateList(this.state.selectedPictures)
                }
                else {
                    console.log('b')
                    this.initNumber()

                    for (let i = 0; i < this.numberAtIndex.length; i++) this.numberAtIndex[i] = 0

                    for (let k = 0; k < this.selectedImage.length; k++) {
                        for (let j = 0; j < this.numberAtIndex.length; j++) {
                            if (this.selectedImage[k] == this.state.photos[j].uri) {
                                this.numberAtIndex[j] = k + 1
                            }
                        }
                    }

                    this.forceUpdate()
                }
            })
            .catch((err) => {
                //Error Loading Images
                if (err.code == 'E_UNABLE_TO_LOAD_PERMISSION') {
                    this._isRequestAlbumPermission = true
                    Permissions.requestAlbumPermission();
                } else
                    this.setState({popupType: POPUP_TYPE_ALBUM_PERMISSION})
            });
    }

    getPhotos = (_groupName) => {
        if (this.state.pageInfo == '') return

        tempGroupName = _groupName
        if (tempGroupName == ALL_PICTURES_GROUP) tempGroupName = ''

        if (Platform.OS == 'ios' && tempGroupName == '') {
            tempGroupName = this._selectFolder.getAllAlbumGroupName()
        }


        CameraRoll.getPhotos({
            first: 25,
            assetType: 'Photos',
            groupTypes: Platform.OS === 'android' ? undefined : 'All',
            after: this.state.pageInfo,
            groupName: tempGroupName,
            mimeTypes: ['image/jpeg', 'image/png']
        })
            .then(r => {

                // console.log('getPhotos')
                let end_cursor = ''
                if (r.page_info && r.page_info.has_next_page) {
                    end_cursor = r.page_info.end_cursor
                }


                //DuongNT: loc cac picture thuoc 1 album
                let photoList = this.filtAlbum(r.edges, tempGroupName)

                this.setState({photos: this.state.photos.concat(photoList), pageInfo: end_cursor});

                if (this.state.selectedPictures && this.state.selectedPictures.length > 0) {
                    // console.log('a')
                    this.updateList(this.state.selectedPictures)
                }
                else {
                    // console.log('b')
                    this.initNumber()

                    for (let i = 0; i < this.numberAtIndex.length; i++) this.numberAtIndex[i] = 0

                    for (let k = 0; k < this.selectedImage.length; k++) {
                        for (let j = 0; j < this.numberAtIndex.length; j++) {
                            if (this.selectedImage[k] == this.state.photos[j].uri) {
                                this.numberAtIndex[j] = k + 1
                            }
                        }
                    }

                    this.forceUpdate()
                }
            })
            .catch((err) => {
                //Error Loading Images
                this.setState({popupType: POPUP_TYPE_ALBUM_PERMISSION})
            });
    }

    _onBack = () => {
        if (this.props.params) {
            this.closeView()
        }

        const {onClosed} = this.props
        if (onClosed) onClosed()

        if (this.__callbacks && this.__callbacks.onClosed) this.__callbacks.onClosed()
    }

    _onOpenAlbum = () => {
        this.setState({showSelectFromAlbum: true})
    }

    _onCloseSelectAlbum = (albumName) => {
        this.setState({showSelectFromAlbum: false, groupName: albumName, photos: []})
        this.numberAtIndex = []
        // this.selectedImage = []

        if (albumName == '') {
            this.setState({groupName: ALL_PICTURES_GROUP, photos: []})
        }
        this._handleButtonPress(albumName)
    }

    _onFinishSelect = () => {
        if (this.selectedImage.length > 0) {
            this._finishSelectPictures(this.selectedImage)
        }
    }

    _finishSelectPictures = (picturesList) => {

        console.log('browser picturelist: ', picturesList)

        const {onPictureSelected} = this.props

        if (onPictureSelected)
            onPictureSelected(picturesList)

        if (this.__callbacks && this.__callbacks.onPictureSelected) this.__callbacks.onPictureSelected(picturesList)

        const canClose = chainParse(this.props, ['params', 'selectAndClose'])

        if (canClose == true) {
            this.closeView()
        }
    }


    _onPressPic = (data, number) => {
        if (this.maxOfImagesSelected == 1) {


            const index = data.index - 1
            const picUri = this.state.photos[index].uri

            if (this.state.counterSelect == 1 && this.selectedImage[0] === picUri) {
                this.selectedImage = []
                this.numberAtIndex = []
                this.setState({counterSelect: 0, popupType: POPUP_TYPE_NONE})
            } else {
                this.selectedImage = [picUri]
                this.numberAtIndex = []
                this.numberAtIndex[index] = 1
                this.setState({counterSelect: number, popupType: POPUP_TYPE_NONE})
                this._finishSelectPictures(this.selectedImage)
            }
            return
        }

        let temp = this.numberAtIndex
        let tempCounter

        if (temp[data.index - 1] > 0) {
            this.selectedImage.splice(temp[data.index - 1] - 1, 1)

            for (let i = 0; i < this.state.photos.length; i++) {
                if (temp[i] > temp[data.index - 1]) temp[i]--
            }

            temp[data.index - 1] = 0

            this.setState({counterSelect: this.state.counterSelect - 1, popupType: POPUP_TYPE_NONE})

            this.numberAtIndex = temp

            tempCounter = this.state.counterSelect - 1
        }
        else {
            if (number > this.maxOfImagesSelected) {
                this.setState({popupType: POPUP_TYPE_PHOTO_LIMITED})
            }
            else {
                temp[data.index - 1] = number

                this.setState({counterSelect: number, popupType: POPUP_TYPE_NONE})
                this.numberAtIndex = temp

                this.selectedImage.push(this.state.photos[data.index - 1].uri);

                tempCounter = number
            }
        }

        let tg = true
        if (tempCounter == 0) tg = false;

        if (tg != this.state.stateOfHeader) this.setState({stateOfHeader: tg})
    }

    _renderCameraScreen = () => {
        return (
            <Camera
                hideButtonQuestion={true}
                hideText={true}
                ref={ref => this.camera = ref}
            />
        );
    }

    onOpenCamera = () => {
        if (this.state.counterSelect == this.maxOfImagesSelected && this.maxOfImagesSelected > 1) {
            this.setState({popupType: POPUP_TYPE_PHOTO_LIMITED})
            return
        }

        let options = {
            mediaType: 'photo',
            noData: true,
            rotation: 0,
            maxWidth: 1024,
            /*
            storageOptions: {
                cameraRoll: true,
                skipBackup: true                
            }*/
        }

        console.log('ducpv::onOpenCamera')

        // ImagePicker.launchCamera(options, (response)  => {
        this.camera.launchCamera(options, (response) => {

            // Same code as in above section!
            console.log('camera ok: ', response)
            if (response.uri && response.uri.length > 0) {
                if (!this.allowCameraSaveToCameraRoll) {
                    this._finishSelectPictures([response.uri, ...this.selectedImage])
                } else {
                    CameraRoll.saveToCameraRoll(response.uri, 'photo').then(imgPath => {
                        // console.log('PictureBrowser CameraRoll saveToCameraRoll response', {imgPath});
                        this._finishSelectPictures([imgPath, ...this.selectedImage])
                    });
                }

                // console.log('ducpv::success')
                // this._finishSelectPictures([response.uri, ...this.selectedImage])
            }
            else if (response.error) {
                console.log('ducpv::fail')
                this.setState({popupType: POPUP_TYPE_CAMERA_PERMISSION})
            }
            //response.uri


        });

    }

    _renderItem = (data) => {
        if (data.item.avatar != null && data.item.avatar == true) {
            return (
                <TouchableOpacity
                    onPress={() => this.onOpenCamera()}
                >
                    <View style={{
                        width: width * 0.33,
                        height: width * 0.33,
                        backgroundColor: '#f5f5f5',
                        marginLeft: width * 0.003,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Icon name='camera' style={{color: 'rgba(0, 0, 0, 0.6)', fontSize: 20}}/>
                        <Text style={{fontSize: 14, color: 'rgba(0, 0, 0, 0.6)'}}>
                            Chụp ảnh
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }


        const dataIndex = data.index - 1

        return (
            <TouchableOpacity
                onPress={() => this._onPressPic(data, this.state.counterSelect + 1)}
            >
                <ImageBackground
                    style={{
                        width: width * 0.33,
                        height: width * 0.33,
                        backgroundColor: 'white',
                        marginLeft: width * 0.003,
                        alignItems: 'flex-end',
                    }}
                    resizeMode={'cover'}
                    source={{uri: data.item.uri}}
                    resizeMethod={'resize'}
                    // source={{uri: 'content://media/external/images/media/2864'}}
                >

                    {
                        (this.numberAtIndex.length >= data.index && this.numberAtIndex[dataIndex] > 0) && this._renderImageNumber(this.numberAtIndex[dataIndex])
                    }
                </ImageBackground>

                <View style={{width: '100%', height: width * 0.003,}}></View>
            </TouchableOpacity>
        );
    }

    _renderImageNumber = (number) => {


        if (this.maxOfImagesSelected === 1) {
            return (
                <View
                    style={{
                        overflow: 'hidden',
                        backgroundColor: '#43bcca',
                        borderWidth: 3,
                        borderColor: '#a6ffff',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        marginTop: 3,
                        marginRight: 3,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Icon name='check' style={{color: 'white', fontSize: 10}}/>
                </View>
            )
        } else {

            return (
                <View
                    style={{
                        overflow: 'hidden',
                        backgroundColor: '#43bcca',
                        borderWidth: 3,
                        borderColor: '#a6ffff',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        marginTop: 3,
                        marginRight: 3,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 13,
                            color: 'white',
                        }}
                    >
                        {number}
                    </Text>
                </View>
            )
        }
    }

    initNumber = () => {
        for (let i = this.numberAtIndex.length; i < this.state.photos.length; i++) {
            this.numberAtIndex.push(0)
        }
    }

    //_onReceivedSelectedPictures = (picturesList) => {
    //    this.updateList(picturesList)
    //}

    //_onEnforceClose = () => {
    //    this._onBack()
    //}

    componentDidMount() {
        console.log('PictuerBrowser Did Mount')
        if (this.state.photos.length == 0) {
            this._handleButtonPress('')
        }
        this.numberAtIndex = []

        this._requestAlbum()
        AppState.addEventListener('change', this._handleAppStateChange)

        BackHandler.addEventListener('hardwareBackPress', this._onAndroidHardbackPressed)
    }

    _onAndroidHardbackPressed = () => {
        // const {popupType} = this.state

        // if (popupType !== POPUP_TYPE_NONE) {
        //     this.setState({popupType: POPUP_TYPE_NONE})
        //     return true
        // } else {
        //     return false
        // }  
        this._onBack()
        return true
    }

    componentWillUnmount() {
        //NotificationCenter.unregisterNotification('enforce_close_picture_browser', this._onReceivedPictures)
        //NotificationCenter.unregisterNotification('enforce_close_picture_browser', this._onEnforceClose)
        BackHandler.removeEventListener('hardwareBackPress', this._onAndroidHardbackPressed)
    }

    _requestAlbum = (albumName = '') => {
        // console.log('Album Name', albumName)
        if (!albumName) albumName = ''
        this.updateWithSelectedPictures(albumName)

        this._isGetAlbumSuccess = false
        Permissions.checkAlbumPermission(response => {
            if (response == 'authorized') {
                this._isGetAlbumSuccess = true;
                this.setState({
                    popupType: POPUP_TYPE_NONE
                })
            } else {

                if (!this.firstRequestReadStoragePermission) {
                    this.firstRequestReadStoragePermission = true;
                    this._isRequestAlbumPermission = true
                    // ClingmeUtils.requestReadStoragePermission()
                    Permissions.requestAlbumPermission();

                } else {
                    this.setState({
                        popupType: POPUP_TYPE_ALBUM_PERMISSION
                    })
                }
            }
        })

    }
    _handleAppStateChange = (nextAppState) => {
        if (!!this._isRequestAlbumPermission && this.state.appState && this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this._isRequestAlbumPermission = false
            this._requestAlbum(this.state.groupName)
        }
        let newStateOfHeader = false
        if (this.selectedImage && this.selectedImage.length > 0) {
            newStateOfHeader = true
        }

        this.setState({appState: nextAppState, stateOfHeader: newStateOfHeader});
    }


    updateList = (listSelected) => {
        console.log('numberAtIndex', this.numberAtIndex)
        console.log('listSelected and list Image', listSelected, this.state.photos)
        this.initNumber()

        for (let i = 0; i < this.numberAtIndex.length; i++) {
            this.numberAtIndex[i] = 0
        }

        for (let k = 0; k < listSelected.length; k++) {
            for (let j = 0; j < this.numberAtIndex.length; j++) {
                if (listSelected[k] == this.state.photos[j].uri) {
                    this.numberAtIndex[j] = k + 1
                }
            }
        }

        this.selectedImage = listSelected

        this.setState({counterSelect: listSelected.length, selectedPictures: []})

        console.log('numberAtIndex', this.numberAtIndex)
    }

    componentWillReceiveProps(nextProps) {
        console.log('Go to Receive Props PictureBrowser', nextProps)
        const nextSelectedPicture = chainParse(nextProps, ['params', 'selectedPictures'])
        /* DuongNT: khong cho update nua, vi gio moi khi minh show man hinh nay se create new picturebrowser
        if (!!nextSelectedPicture && chainParse(this.props, ['params', 'selectedPictures']) !== nextSelectedPicture) 
        {
            this.numberAtIndex = []
            this.updateList(chainParse(nextProps, ['params', 'selectedPictures']))
        }*/
    }

    _openAlbumSetting = () => {

        this._isRequestAlbumPermission = true

        OpenAppSettings.open();

        // Permissions.requestAlbumPermission((authorized) => {
        //     if (authorized) {
        //         this._requestAlbum(this.state.groupName)
        //     }
        //     // this.setState({popupType: POPUP_TYPE_NONE})
        //     this.setState({popupType: POPUP_TYPE_ALBUM_PERMISSION})
        // })
    }
    _openCameraSetting = () => {
        Permissions.requestCameraPermission((authorized) => {
            console.log('ducpv::authorized', authorized)
            if (authorized) {
                console.log('ducpv::')
            }
            else {

            }
        })

        this.setState({popupType: POPUP_TYPE_NONE})
    }
    _closeAlbumPermission = () => {
        this.setState({popupType: POPUP_TYPE_NONE})
        this._onBack()
    }

    _hideSelectFromAlbum = () => {
        this.setState({showSelectFromAlbum: false})
    }

    _onSelectFolderRequestClose = () => {
        this._hideSelectFromAlbum()
        return true
    }

    render() {
        console.log('Render Picture Browser')
        if (this.props.isShow !== undefined && !this.props.isShow) return false


        return (
            <View style={{
                zIndex: 3000,
                width: width,
                height: height,
                backgroundColor: '#ffffff',
                position: 'absolute',
                top: 0,
                left: 0,
                flex: 1
            }}>
                {this._renderCameraScreen()}
                <AcceptToViewAlbum
                    isShow={this.state.popupType == POPUP_TYPE_ALBUM_PERMISSION}
                    onRequestPermission={this._openAlbumSetting}
                    onClose={this._closeAlbumPermission}
                />
                <PopUpOpenCamera
                    onAccept={this._openCameraSetting}
                    onClose={this._closeAlbumPermission}
                    isShow={this.state.popupType == POPUP_TYPE_CAMERA_PERMISSION}
                />

                <PopUp maxImage={this.maxOfImagesSelected} show={this.state.popupType == POPUP_TYPE_PHOTO_LIMITED}/>


                <SelectFromFolder
                    onRequestClose={this._onSelectFolderRequestClose}
                    show={this.state.showSelectFromAlbum}
                    onClose={(albumName) => this._onCloseSelectAlbum(albumName)}
                    onHide={() => this._hideSelectFromAlbum()}
                    selectedAlbumName={this.state.groupName}
                    ref={c => this._selectFolder = c}
                />


                <Header
                    state={this.state.stateOfHeader}
                    onBack={this._onBack}
                    onFinish={this._onFinishSelect}
                    onOpenListAlbum={this._onOpenAlbum}
                    headerText={this.state.groupName}
                    showRightButton={this.maxOfImagesSelected > 1}
                />

                <View style={{width, height: height - 45}}>
                    <FlatList
                        //horizontal = {true}
                        data={[{
                            avatar: true,
                            node: {
                                image: {
                                    uri: '122'
                                }
                            }
                        }, ...this.state.photos]}
                        renderItem={this._renderItem}
                        getItemLayout={this.getItemLayout}
                        keyExtractor={item => item.uri}
                        onMomentumScrollEnd={
                            () => {
                                // console.log('endScroll')
                                this._getPhotoWithGroupName(this.state.groupName, this.state.startIndex)
                            }
                        }
                        numColumns={3}
                        removeClippedSubviews={true}
                    >
                    </FlatList>
                </View>
            </View>
        );
    }
}