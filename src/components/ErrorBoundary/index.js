
import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, err: '', info: '' };
    }

    componentDidCatch(error, info) {
        console.log('Did Catch ', error.toString())
        console.log('Info', JSON.stringify(info))
        // Display fallback UI
        this.setState({ hasError: true, err: error.toString(), info: JSON.stringify(info) });
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <ScrollView>
                    <Text>Info: {this.state.info}</Text>
                    <Text>Error: {this.state.err}</Text>
                </ScrollView>
            )
        }
        return this.props.children;
    }
}