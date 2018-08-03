import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export default class ProgressBar extends Component {
    static propTypes = {
        borderColor: PropTypes.string,
        borderRadius: PropTypes.number,
        borderWidth: PropTypes.number,
        color: PropTypes.string,
        height: PropTypes.number,
        progress: PropTypes.number,
        style: PropTypes.any,
        unfilledColor: PropTypes.string,
        width: PropTypes.number,
    };

    static defaultProps = {
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#ccc',
        unfilledColor: '#ccc',
        color: '#DA7B61',//'#3b5998',
        height: 5,
        progress: 0,
        width: 150,
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {
            borderColor,
            borderRadius,
            borderWidth,
            color,
            height,
            style,
            unfilledColor,
            width,
            ...restProps
        } = this.props;

    const innerWidth = Math.max(0, width) - borderWidth * 2;
    const containerStyle = {
        width,
        borderWidth,
        borderColor: borderColor || color,
        borderRadius,
        overflow: 'hidden',
        backgroundColor: unfilledColor,
    };
    const progressStyle = {
        backgroundColor: color,
        height,
        width: innerWidth * this.props.progress,
        marginLeft: borderWidth
    };

    return (
        <View
            style={[containerStyle, style]}
            {...restProps} >
            <View style={progressStyle} />
        </View>
    );
  }
}