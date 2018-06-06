import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const ProfileHistoryItem = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.detail}>{props.detail}</Text>
        </View>
    );
};

ProfileHistoryItem.propTypes = {
    title: PropTypes.string,
    detail: PropTypes.string,
};

ProfileHistoryItem.defaultProps = {
    title: '',
    detail: '',
};

export default ProfileHistoryItem;
