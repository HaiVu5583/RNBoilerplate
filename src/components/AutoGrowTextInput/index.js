import React from 'react';
import { Dimensions } from 'react-native'
import { TextInput } from '~/src/themes/ThemeComponent'

const heightScreen = Dimensions.get('window').height

export default class AutoGrowTextInput extends React.Component {
    constructor (props) {
        super(props)
        let height = 40
        if (this.props.style !== undefined && this.props.style !== null)
        height = this.props.style.height
    
    this.state = {
      newValue: '',
      height: height,
    }

    this.generalHeight = height
  }
  
  updateSize = (height) => {
    if (height < this.generalHeight && (!this.getText() || this.getText().length == 0))
	  height = this.generalHeight
	  if (heightScreen <= 568) {
		  if (height > 44 && height < 100) {
			  this.setState({
				  height: height,
			});
		}
	  } else {
		if (height > 44 && height < 210) {
			this.setState({
				height: height,
			});
		}
	}
}

_onContentSizeChanegd = (e) => {
    this.updateSize(e.nativeEvent.contentSize.height)

    const {onContentSizeChange} = this.props

    if (!!onContentSizeChange) 
      onContentSizeChange(e)
  }

  getText = () => {
    return this.state.newValue
  }

  setText = (text) => {
    this.setState({newValue: text})
  }

  render () {
    let height = (!this.state.height || this.state.height < 40) ? 40 : this.state.height
    let {newValue} = this.state

    let {placeholder, numberOfLines, maxHeight, maxLength, autoCorrect, underlineColorAndroid} = this.props

    if (!numberOfLines) numberOfLines = 1000
    if (!maxHeight) maxHeight = 1000
    if (!maxLength) maxLength = 65535
    if (!autoCorrect) autoCorrect = false
    if (!underlineColorAndroid) underlineColorAndroid = 'transparent'
    if (!placeholder) placeholder = ''
    
    const {style, ...restProps} = this.props
	console.log('TextInput height', height)
    console.log('TextInput heightScreen', heightScreen)
    return (
        <TextInput
            onChangeText={(value) => this.setState({newValue: value})}
            value={newValue}
            style={{...this.props.style, height: height }}
            editable={true}
            multiline={true}
            autoGrow={false}
            onContentSizeChange={this._onContentSizeChanegd}
            placeholder={placeholder}
            numberOfLines={numberOfLines}
            maxHeight={maxHeight}
            maxLength={maxLength}
            autoCorrect={autoCorrect}
            underlineColorAndroid={underlineColorAndroid}
            {...restProps}
        />
    )
}
}