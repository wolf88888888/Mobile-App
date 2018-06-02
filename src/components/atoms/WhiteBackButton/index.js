import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import SVGButton from '../SVGButton'
import styles from './styles';

const WhiteBackButton = (props) => {
    return (
        <SVGButton style={styles.WhiteBackButton} image={require('../../../assets/arrow-back-white.svg')} onPress={props.onPress}/>
    );
}

WhiteBackButton.propTypes = {
    onPress: PropTypes.func
};

WhiteBackButton.defaultProps = {
    onPress: () => {}
};

export default WhiteBackButton;
