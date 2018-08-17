import {CameraRoll, Platform} from 'react-native'
const BATCH_NUMBER = 100

getPhoto = (after, groupName) => {
    if (!after) {
        return new Promise((resolve, reject) => {
            CameraRoll.getPhotos({
                first: BATCH_NUMBER,
                assetType: 'Photos',
                groupTypes: !!groupName ? undefined : (Platform.OS === 'android' ? undefined : 'Album'),
                groupName: groupName,
                mimeTypes: ['image/jpeg', 'image/png']
            }).then(data => resolve(data))
        })
    }
    return CameraRoll.getPhotos({
        first: BATCH_NUMBER,
        after: after,
        assetType: 'Photos',
        groupTypes: !!groupName ? undefined : (Platform.OS === 'android' ? undefined : 'Album'),
        groupName: groupName,
        mimeTypes: ['image/jpeg', 'image/png']
    })
}

getPhotoInGroup = (groupName, after) => {
    if (!after) {
        return new Promise((resolve, reject) => {
            CameraRoll.getPhotos({
                first: BATCH_NUMBER,
                assetType: 'Photos',
                groupTypes: Platform.OS === 'android' ? undefined : 'All',
                groupName: groupName,
                mimeTypes: ['image/jpeg', 'image/png']
            }).then(data => resolve(data))
        })
    }
    return CameraRoll.getPhotos({
        first: BATCH_NUMBER,
        after: after,
        assetType: 'Photos',
        groupTypes: Platform.OS === 'android' ? undefined : 'All',
        groupName: groupName,
        mimeTypes: ['image/jpeg', 'image/png']
    })
}


const getAllAlbums = async () => {
    let result = []
    let data = await getPhoto()
    result = result.concat(data.edges)
    while (data.page_info && data.page_info.has_next_page) {
        data = await getPhoto(data.page_info.end_cursor)
        result = result.concat(data.edges)
    }

    let groupNameList = {}

    for (let i = 0; i < result.length; i++) {
        groupNameList[result[i].node.group_name] = 1
    }

    return groupNameList
}

export const getAllImages = async () => {
    let result = []

    const allGroup = Platform.OS == 'android' ? '' : undefined

    let data = await getPhotoInGroup(allGroup)
    result = result.concat(data.edges)
    while (data.page_info && data.page_info.has_next_page) {
        data = await getPhotoInGroup(allGroup, data.page_info.end_cursor)
        result = result.concat(data.edges)
    }

    return result
}

export const getAlbums = async () => {
    let images = await getAllImages()
    let map = {}
    for (let i = 0; i < images.length; i++) {
        const groupName = images[i].node.group_name
        if (!map[groupName])
            map[groupName] = 1
        else map[groupName] = map[groupName] + 1
    }
    console.log('folder Data', map)

    return map
}