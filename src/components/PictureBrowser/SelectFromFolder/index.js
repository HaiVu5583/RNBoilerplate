import React, { Component } from 'react'
import { Platform, View, Text, Modal, TouchableOpacity, ActivityIndicator, CameraRoll, FlatList, Image, Button, Dimensions, TouchableWithoutFeedback } from 'react-native'
import {chainParse} from '~/src/utils'

import {Icon} from '~/src/themes/ThemeComponent'
import {getAlbums} from '~/src/utils/CameraRollManager'
import Header from '../Header'
import RNPhotosFramework from 'react-native-photos-framework'

const {height, width} = Dimensions.get('window')

export default class SelectFromFolder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: this.props.show,
            listFolder: [],
            selectedAlbumName : this.props.selectedAlbumName,
            listImage: [],
            listNumber: []
        }
        
        if (Platform.OS == 'android') {        
            this.allAlbumGroupName = 'All'
        } else {
            this.allAlbumGroupName = undefined
        }
    }

    getImageFromAlbum = (albumName) => {
        let result = []
        CameraRoll.getPhotos({
            first: 1,
            assetType: 'Photos',
            groupTypes: Platform.OS === 'android' ? undefined : 'All',
            //groupName: Platform.OS === 'android'? '' : undefined
            groupName: albumName
        })
            .then(r => {
                result.push(r.edges)
                this.state.listImage.push(result[0][0].node.image.uri)

                this.setState({listImage: this.state.listImage})
            })
            .catch((err) => {
                //Error Loading Images
            });
    }

    componentWillReceiveProps(nextProps){
        if (this.state.modalVisible != nextProps.show) {
            this.setState({modalVisible: nextProps.show})
        }
        if (this.state.selectedAlbumName != nextProps.selectedAlbumName) {
            this.setState({selectedAlbumName: nextProps.selectedAlbumName})
        }
    }

    getAllAlbumGroupName() {
        return this.allAlbumGroupName
    }
    
    //DuongNT: Ham nay de duoc goi truoc khi Popup nay duoc bat de user do phai cho lau
    //
    requestFolderIOS = (callback) => {        
        let option1 = {
                    type: 'album',
                    subType: 'any',
                    assetCount: 'exact',
                    previewAssets: 1,
                    fetchOptions: {
                      sortDescriptors : [
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
                    trackInsertsAndDeletes : true,
                    trackChanges : false

                  }

        let option2 = {...option1 , type: 'smartAlbum'}

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

                                if (titleLower !== 'tất cả ảnh'
                                    && titleLower !== 'cuộn camera'
                                    && titleLower !== 'camera roll') {
                                    listFolder.push(e.title)
                                    listNumber.push(e.assetCount)
                                    if (!!e.previewAsset && !!e.previewAsset.image) {
                                        listImage.push(e.previewAsset.image.uri)
                                    }
                                } else {
                                    this.allAlbumGroupName = e.title
                                }
                            }
                        })                                        

                        this.setState({listFolder: listFolder, listNumber: listNumber, listImage: listImage})
                        
                        if (!!callback)
                            callback(this.getAllAlbumGroupName())          
                  })
        })

    }

    requestFolderAndroid = (callback) => {
        
        getAlbums().then((data) => {
            this.setState({listFolder: Object.keys(data), listNumber: Object.values(data)})
            let temp = Object.keys(data)

            for (let i=0; i<temp.length; i++) {
                this.getImageFromAlbum(temp[i])
                this.totalImage += this.state.listNumber[i]
            }

            if (!!callback)
                callback(this.getAllAlbumGroupName())
        }) 
    }

    requestFolder = (callback) => {
        if (Platform.OS == 'android') {
            this.requestFolderAndroid(callback)
        } else {
            this.requestFolderIOS(callback)
        }
    }
    _onClosex(data) {
        this.props.onClose(data)
        this.setState({modalVisible: false})
    }

    _renderItem(data) {
        if (data.index == 0) {
            return (
                <TouchableWithoutFeedback onPress = {()=> {this._onClosex('')}}>
                    <View style={{backgroundColor: 'rgba(255, 255, 255, 1.0)',}}>
                        <View
                            style = {{flexDirection: 'row',
                                padding: 10,
                                // borderBottomWidth: 1,
                                // borderBottomColor: 'rgba(0, 0, 0, 0.3)',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                source = {{uri: this.state.listImage[data.index]}}
                                style = {{width: 80, height: 80}}
                                resizeMethod = {'resize'}
                                resizeMode = {'cover'}
                            />

                            <View style = {{justifyContent: 'space-between', flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                <View>
                                    <Text style = {{fontSize: 15, color: 'rgba(0, 0, 0, 0.9)', padding: 5, fontWeight: '800'}}>
                                        {'Tất cả ảnh'}
                                    </Text>

                                    <Text style = {{fontSize: 15, color: 'rgba(0, 0, 0, 0.3)', padding: 5}}>
                                        {this.totalImage}
                                    </Text>
                                </View>

                                {
                                    (this.state.selectedAlbumName == '' || this.state.selectedAlbumName == 'Tất cả ảnh') && (
                                        <Icon name = 'check' style = {{fontSize: 15, color: '#f16654', marginRight: 10}} />
                                    )
                                }
                            </View>
                        </View>

                        <View style = {{marginLeft: 8, width: width - 16, height: 0.5, backgroundColor: 'rgba(0, 0, 0, 0.1)'}} />
                    </View>
                </TouchableWithoutFeedback>
            )
        }

        return (
            <TouchableWithoutFeedback onPress = {()=> {this._onClosex(data.item)}}>
                <View style = {{backgroundColor: 'rgba(255, 255, 255, 1.0)'}}>
                    <View
                        style = {{flexDirection: 'row',
                            padding: 10,
                            // borderBottomWidth: 1,
                            // borderBottomColor: 'rgba(0, 0, 0, 0.3)',
                            alignItems: 'center'
                        }}
                    >
                        <Image source = {{uri: this.state.listImage[data.index - 1]}} style = {{width: 80, height: 80}} />

                        <View style = {{justifyContent: 'space-between', flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                            <View>
                                <Text style = {{fontSize: 15, color: 'rgba(0, 0, 0, 0.9)', padding: 5, fontWeight: '800'}}>
                                    {data.item}
                                </Text>

                                <Text style = {{fontSize: 15, color: 'rgba(0, 0, 0, 0.3)', padding: 5}}>
                                    {this.state.listNumber[data.index - 1]}
                                </Text>
                            </View>

                            {
                                (this.state.selectedAlbumName == data.item) && (
                                    <Icon name = 'check' style = {{fontSize: 15, color: '#f16654', padding: 10}} />
                                )
                            }
                        </View>
                    </View>

                    <View style = {{marginLeft: 8, width: width - 16, height: 0.5, backgroundColor: 'rgba(0, 0, 0, 0.1)'}} />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    componentDidMount() {
        this.totalImage = 0
        //this.requestFolder()
    }

    hideModal = () => {
        this.setState({modalVisible: false})
        if (this.props.onHide) {
            this.props.onHide()
        }
    }

    _onRequestClose = () => {
        const {onRequestClose} = this.props
        if (onRequestClose) {
            return onRequestClose()
        } else {
            return false
        }

    }
    render() {
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose = {this._onRequestClose}
            >
                <TouchableWithoutFeedback
                    onPress = {() => {
                        this.hideModal()
                    }}
                >
                    <View style = {{width, height, backgroundColor: 'rgba(0, 0, 0, 0.3)', position: 'absolute', left: 0, top: 0}} />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress = {() => {this.hideModal()}}
                >
                    <View style = {{width, height: Platform.OS == 'android' ? 45 : 65, backgroundColor: 'rgba(0, 0, 0, 0.3)'}} />
                </TouchableWithoutFeedback>

                <FlatList
                    data={['all', ...this.state.listFolder]}
                    renderItem={this._renderItem.bind(this)}
                    getItemLayout={this.getItemLayout}
                    keyExtractor={item=>item}
                    height={'100%'}
                    ListFooterComponent={<View style={{width: '100%', height: 10, backgroundColor: 'white'}} />}
                />

                <TouchableWithoutFeedback
                    onPress = {() => {
                        this.hideModal()
                    }}
                    style = {{flex: 1}}
                >
                    <View style = {{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', height: '100%'}} />
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}