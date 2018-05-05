import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';

import styles from './styles';

const CloseButton = (props) => {
    let renderIcon = (
          <View style={styles.container}>
            <Image source={require('../../../assets/close.svg')} style={styles.ButtonImage}/>
          </View>
      );

    if (props.onPress) {
        renderIcon = (
            <TouchableOpacity onPress={() => props.onPress()}>{ renderIcon }</TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            { renderIcon }
        </View>
    );
};

CloseButton.propTypes = {
    icon: PropTypes.string,
    onPress: PropTypes.func
};

CloseButton.defaultProps = {
    icon: '',
    onPress: () => {}
};

export default CloseButton;
