import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import SVGButton from '../SVGButton'
import styles from './styles';

const CloseButton = (props) => {
    return (
        <SVGButton style={styles.CloseButton} image={require('../../../assets/close.svg')} onPress={props.onPress}/>
    );
}

CloseButton.propTypes = {
    onPress: PropTypes.func
};

CloseButton.defaultProps = {
    onPress: () => {}
};

export default CloseButton;
