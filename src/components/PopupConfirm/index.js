import React from 'react'
import { Modal, View, Text, Platform } from 'react-native'

import styles from './styles'
import { TouchableWithoutFeedback } from 'react-native-vector-icons/lib/react-native';
import TextAutolink from '~/src/components/TextAutolink'
import SvgUri from 'react-native-svg-uri'

export default class PopupConfirm extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: !!props.visible ? true : false,
        }
        this.callbacks = {}
    }

    open(callbacks) {
        this.setState({
            visible: true
        })

        this.callbacks = {}

        if (!!callbacks) {
            if (callbacks.button1 && (typeof callbacks.button1 === 'function')) {
                this.callbacks.button1 = callbacks.button1
            }

            if (callbacks.button2 && (typeof callbacks.button2 === 'function')) {
                this.callbacks.button2 = callbacks.button2
            }

            if (callbacks.button3 && (typeof callbacks.button3 === 'function')) {
                this.callbacks.button3 = callbacks.button3
            }
        }
    }

    close() {
        this.setState({
            visible: false
        })
    }

    setVisible(visible) {
        this.setState({
            visible: visible
        })
    }

    _handlePressButton1() {
        if (!this.props.remainPopupWhenPressBtn1) {
            this.close();
        }

        if (this.props.onPressButton1) this.props.onPressButton1();

        if (this.callbacks.button1)
            this.callbacks.button1()
    }

    _handlePressButton2() {
        if (!this.props.remainPopupWhenPressBtn2) {
            this.close();
        }

        if (this.props.onPressButton2) this.props.onPressButton2();

        if (this.callbacks.button2)
            this.callbacks.button2()
    }

    _handlePressButton3() {
        if (!this.props.remainPopupWhenPressBtn3) {
            this.close();
        }
        if (this.props.onPressButton3) this.props.onPressButton3();

        if (this.callbacks.button3)
            this.callbacks.button3()
    }

    _onPressOverlay = () => {
        const { onPressOverlay } = this.props;
        if (onPressOverlay) onPressOverlay();
    }

    _renderContent = (content, boldPart) => {
        if (boldPart) {
            let splitArr = content.split(boldPart)

            if (splitArr.length == 2) {
                let { contentStyle } = this.props
                if (!contentStyle) contentStyle = {}

                return <Text style={{ ...styles.textContent, ...contentStyle }}>{splitArr[0]}
                    <Text style={{ ...styles.textContent, fontWeight: 'bold' }}>{boldPart}</Text>
                    {splitArr[1]}
                </Text>
            }
        }
        return <TextAutolink style={styles.textContent}>{content}</TextAutolink>
    }

    _renderDialogContent = () => {
        const { title, content, banner, textButton1, textButton2, textButton3, boldPart, isSpecial, overlayColor } = this.props;

        let specialContent = {}
        let boldText = {}
        if (isSpecial) {
            specialContent = { marginTop: 10, marginBottom: Platform.OS == 'ios' ? 20 : 0 }
        }

        const modalBackgroundStyle = !!overlayColor ? {...styles.backgroundModal, backgroundColor: overlayColor} : styles.backgroundModal

        return (
            <TouchableWithoutFeedback onPress={this._onPressOverlay}>
                <View style={modalBackgroundStyle}>
                    <View style={styles.popupContainer}>
                        {title && title.length > 0 &&
                            <View style={styles.titleContainer}>
                                <Text style={[styles.textTitle, this.props.titleStyle]}>{title}</Text>
                            </View>
                        }

                        {banner &&
                            <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 15 }}>
                                <SvgUri
                                    width="105"
                                    height="105"
                                    svgXmlData={banner}
                                />
                            </View>
                        }

                        {content &&
                            <View style={{ ...styles.contentContainer, ...specialContent }}>
                                {this._renderContent(content, boldPart)}
                            </View>
                        }

                        {this.props.children &&
                            <View style={{ ...styles.contentContainer, }}>
                                {this.props.children}
                            </View>
                        }

                        <View style={styles.buttonContainer}>
                            {textButton1 &&
                                <Text
                                    onPress={() => this._handlePressButton1()}
                                    style={{ ...styles.button, }}>{textButton1}</Text>}

                            {textButton2 &&
                                <Text
                                    onPress={() => this._handlePressButton2()}
                                    style={{ ...styles.button, }}>{textButton2}</Text>}

                            {textButton3 &&
                                <Text
                                    onPress={() => this._handlePressButton3()}
                                    style={{ ...styles.button, }}>{textButton3}</Text>}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        )
    }

    render() {
        const { useNormalView } = this.props

        if (!!useNormalView) {
            return (
                <View
                    style={styles.fullViewScreen}
                >
                    {this._renderDialogContent()}
                </View>
            )
        } else {
            return (
                <Modal
                    animationType={this.props.animationType || 'fade'}
                    visible={this.state.visible}
                    transparent={true}
                    onRequestClose={() => this.close()}
                >
                    {this._renderDialogContent()}
                </Modal>
            )
        }
    }
}