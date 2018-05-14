import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';

import styles from './styles';

const SVGButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.ButtonView} onPress={props.onPress}>
              <Image source={props.image} style={styles.ButtonImage}/>
            </TouchableOpacity>
        </View>
    );
}

SVGButton.propTypes = {
    onPress: PropTypes.func
};

SVGButton.defaultProps = {
    onPress: () => {}
};

export default SVGButton;
