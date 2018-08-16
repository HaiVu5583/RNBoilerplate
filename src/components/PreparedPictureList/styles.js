// import { RED, YELLOW, CYAN, VIOLET, GRAY, WHITE, BLACK, fontSize, commonStyle } from '~/ui/styles/common'
import {Dimensions} from 'react-native'
const { height, width } = Dimensions.get('window')


const numberColumns = 3
const spaceBetween = 1
export const imageWidth = (width - (numberColumns + 1) * spaceBetween) / numberColumns

export default {
	gridColumns: numberColumns,

	pictureGrid: {
		marginTop: 7,		
	},

	pictureCell: {		
		marginRight: 1,
		marginBottom: 1,
		width: imageWidth,
		height: imageWidth,
        marginLeft: spaceBetween,
		marginTop: spaceBetween,
	},

	addPictureCell: {
		backgroundColor: '#789443',
		borderColor: '#109478',
		borderStyle: 'dashed',
		overflow: 'hidden',
		borderRadius: 0.5,
		borderWidth: 2,
		marginRight: 1,
		marginBottom: 1,
		width: imageWidth,
		height: imageWidth,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: spaceBetween,
        marginTop: spaceBetween,
	},

	addPictureCell2: {
		marginLeft: spaceBetween,
		marginTop: spaceBetween,
		flexDirection: 'row'
	},

	addPictureIcon: {
		fontSize: 24,
		color: '#748923',		
		alignSelf: 'center'
	},
	addPictureText: {
		fontSize: 12,
		color: '#783932',
		marginTop: 10,
	},

	removePictureIcon: {							
		position: 'absolute',
		top: 5,
		right: 5
	},
}