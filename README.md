# React Native Boilerplate Project

#### Include in this boilerplate

* State Management
	* Redux
	* Redux Saga (Middleware)
	* Redux persist: Persist Redux store to disk storage
* Navigation
	* Wix Navigation v2
* Image Caching
	* react-native-fast-image
* UI related
	* react-native-vector-icon: Display vector icon in app
	* UI library: Implement style tagging system 
	* react-native-linear-gradient
	* react-native-svg/react-native-svg-uri: Display SVG image in app
* Language:
	* react-native-i18n

#### Project Structure

* Main Project
	* android: Android Native 
	* ios: Ios Native 
	* src: 
		* asset: App asset (image )
		* components: Multiple use components
		* containers: App screen
		* locales: Multiple language config
		* store:
			* actions: Redux action
			* api: Backend API request
			* reducers: Redux reducer
			* sagas: Redux sagas
			* selectors: Selector use for connect mapStateToProps function
		* themes: Customize basic UI component use for style tagging system, multiple language, dynamic theme color
