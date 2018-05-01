import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';

// TODO: move styles to separate file
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        position: 'relative'
    },
    iconView: {
        position: 'absolute',
        top: 40,
        left: 18,
        width: 24,
        height: 24,
        borderRadius: 12,
        borderColor: '#fff',
        borderWidth: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconText: {
        color: '#fff',
        fontSize: 8
    }
});

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
