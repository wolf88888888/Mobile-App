import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import SVGButton from '../SVGButton'
import styles from './styles';

const BackButton = (props) => {
    return (
        <SVGButton style={styles.BackButton} image={require('../../../assets/arrow-back.svg')} onPress={props.onPress}/>
    );
}

BackButton.propTypes = {
    onPress: PropTypes.func
};

BackButton.defaultProps = {
    onPress: () => {}
};

export default BackButton;
