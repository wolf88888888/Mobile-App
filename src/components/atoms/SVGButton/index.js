import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';

import styles from './styles';

const SVGButton = (props) => {
    return (
        <View style={[styles.container, props.style]}>
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
