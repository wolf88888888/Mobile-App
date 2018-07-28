import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const LineProgressBar = (props) => {
    return (
        <View style={[styles.container, {width:props.width}]}>
            <View style={[styles.contentBar, {width:props.width * props.progress}]}>
            </View>
        </View>
    );
}

LineProgressBar.propTypes = {
    onPress: PropTypes.func
};

LineProgressBar.defaultProps = {
    onPress: () => {}
};

export default LineProgressBar;
