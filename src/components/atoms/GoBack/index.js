import React from 'react';
import { View, TouchableOpacity, Text, Keyboard } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';

import styles from './styles';

const GoBack = (props) => {
    let renderIcon = null;
    if (props.icon) {
        renderIcon = (
            <View style={[styles.iconView, { borderColor: props.color }]}>
                <Text style={[styles.iconText, { color: props.color }]}>
                    <FontAwesome>{Icons[props.icon]}</FontAwesome>
                </Text>
            </View>
        );
    }

    if (props.icon && props.onPress) {
        renderIcon = (
            <TouchableOpacity onPress={() => { Keyboard.dismiss(); props.onPress(); }}>{renderIcon}</TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            {renderIcon}
        </View>
    );
};

GoBack.propTypes = {
    icon: PropTypes.string,
    onPress: PropTypes.func,
    color: PropTypes.string
};

GoBack.defaultProps = {
    icon: '',
    onPress: () => { },
    color: '#fff'
};

export default GoBack;
