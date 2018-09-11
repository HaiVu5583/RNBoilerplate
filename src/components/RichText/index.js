import React from 'react'
import xmldom from 'xmldom'
import { View, Text, } from '~/src/themes/ThemeComponent'

const ACCEPTED_ATTRIBUTES_RT = {
	'style': Object,
	'width': Number,
	'height': Number,
}

const ACCEPTED_ATTRIBUTES_HYPERLINK = {
	'style': Object,
	'href': String,
}

const ACCEPTED_ATTRIBUTES_FONT = {
	'fontSize': Number,
	'fontWeight': String,
	'fontFamily': String,
	'color': String,
	'textShadowOffset': Object,
	'lineHeight': Number,
	'textAlign': String,
	'textDecorationLine': String,
	'textShadowColor': String,
	'textShadowRadius': Number,
	'includeFontPadding': Boolean,
	'textAlignVertical': String,
	'fontVariant': String,
	'letterSpacing': Number,
	'textDecorationColor': String,
	'textDecorationStyle': String,
	'writingDirection': String,
}

export default class RichText extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = {

		}
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	_onLinkPressed = (link) => {
		const {onLinkPress} = this.props
		if (onLinkPress) onLinkPress(link)
	}

	createElement = (node, childs) => {
		switch (node.nodeName) {
			case 'rt': {
				const attr = this.extractRTAttributes(node.attributes, ACCEPTED_ATTRIBUTES_RT)
				const attrProps = this.extractRTAttributes(this.props, ACCEPTED_ATTRIBUTES_RT, true)
				let styles = {}
				if (attr && attr.style) styles = {...attr.style}
				if (attrProps && attrProps.style) styles = {...styles, ...attrProps.style}

				const mixAttr = {...attr, ...attrProps, style: styles}

				return (<Text {...mixAttr}>{childs}</Text>)
			}
			case 'b':
				return (<Text style={{fontWeight: 'bold'}}>{childs}</Text>)
			case 'i':
				return (<Text style={{fontStyle: 'italic'}}>{childs}</Text>)
			case 'u':			
				return (<Text style={{textDecorationLine: 'underline'}}>{childs}</Text>)
			case 'center':
				return (<Text style={{textAlign: 'right'}}>{childs}</Text>)			
			case 'red':
				return (<Text style={{color: 'red'}}>{childs}</Text>)
			case 'font':
				return (<Text style={this.extractRTAttributes(node.attributes, ACCEPTED_ATTRIBUTES_FONT)}>{childs}</Text>)
			case 'a': 
				const attributes = this.extractRTAttributes(node.attributes, ACCEPTED_ATTRIBUTES_HYPERLINK)				
				return (<Text style={attributes.style} onPress={() => this._onLinkPressed(attributes.href)}>{childs}</Text>)
			break
		}
	}
	
	extractRTAttributes = (attributes, acceptedAttrs, isParseObject = false) => {
		const styleAtts = {};
		for (let nodeId in attributes) {
			const nodeValue = isParseObject ? attributes[nodeId] : attributes[nodeId].value
			const nodeName = isParseObject ? nodeId : attributes[nodeId].name
			
			if (!(nodeName in acceptedAttrs)) continue

			const nodeType = acceptedAttrs[nodeName]

			if (nodeType === Object) {
				if (typeof nodeValue === String) {
					try {
						let jsonBody = eval('(' + nodeValue + ')')
						styleAtts[nodeName] = (jsonBody && typeof(jsonBody) === 'object') ? jsonBody : null
					} catch (e) {
						console.log(e)
					}
				} else {
					styleAtts[nodeName] = nodeValue					
				}
			} else if (nodeType === Number) {
				styleAtts[nodeName] = nodeValue * 1.0
			} else {
				styleAtts[nodeName] = nodeValue
			}
		}

		return styleAtts
	}

	parseXml = (node) => {

		const arrayElements = []
		if (node.childNodes && node.childNodes.length > 0){
	        for (let i = 0; i < node.childNodes.length; i++){
				const isTextValue = node.childNodes[i].nodeValue
				if (isTextValue) {
					arrayElements.push(node.childNodes[i].nodeValue)
				} else {
					const nodeChild = this.parseXml(node.childNodes[i])
					if (nodeChild != null) {
						arrayElements.push(nodeChild);
					}
				}
			}
		}

		return this.createElement(node, arrayElements)
	}
	
	render() {
		const {content} = this.props
		// const content = '<rt>Hello <b>world</b></rt>'
		const doc = new xmldom.DOMParser().parseFromString(content)
		const elements = this.parseXml(doc.childNodes[0])
		return (
			<View>
				{elements}
			</View>
		)
	}
}