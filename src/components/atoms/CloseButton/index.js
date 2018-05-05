import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';

import styles from './styles';

class CloseButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.ButtonView} onPress={() => this.props.onPress()}>
                  <Image source={require('../../../assets/close.svg')} style={styles.ButtonImage}/>
                </TouchableOpacity>
            </View>
        );
    }
}

CloseButton.propTypes = {
    onPress: PropTypes.func
};

CloseButton.defaultProps = {
    onPress: () => {}
};

export default CloseButton;
