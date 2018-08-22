import React from 'react';
import * as Progress from 'react-native-progress'

export default class CircleCountdown extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            time: props.time
        }
        this.intervalID = -1
    }

    componentDidMount() {
        this.intervalID = setInterval(() => {
            const { onCountToEnd } = this.props
            if (this.state.time <= 0) {
                this._stopCount()
                onCountToEnd && onCountToEnd()
                return
            }
            this.setState({
                time: this.state.time - 1
            })
        }, 1000)
    }

    _stopCount = () => {
        clearInterval(this.intervalID)
        this.intervalID = -1
    }

    componentWillUnmount() {
        this._stopCount()
    }


    render() {
        const { time, size = 50, fill = 'transparent', color = 'white', borderWidth = 0, fontSize = 20 } = this.props
        const progress = this.state.time / time
        return (
            <Progress.Circle
                size={size}
                fill={fill}
                progress={progress}
                color={color}
                borderWidth={borderWidth}
                showsText={true}
                formatText={progress => Math.ceil(progress * time)}
                textStyle={{ fontSize }}
                animated={false}
            />
        )
    }
}
