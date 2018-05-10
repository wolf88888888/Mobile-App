import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import styles from './styles';

const GoBack = (props) => {
    let renderIcon = null;

    if (props.icon) {
        renderIcon = (
            <View style={styles.iconView}>
                <Text style={styles.iconText}>
                    <FontAwesome>{Icons[props.icon]}</FontAwesome>
                </Text>
            </View>
        );
    }

    if (props.icon && props.onPress) {
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

GoBack.propTypes = {
    icon: PropTypes.string,
    onPress: PropTypes.func
};

GoBack.defaultProps = {
    icon: '',
    onPress: () => {}
};

export default GoBack;
