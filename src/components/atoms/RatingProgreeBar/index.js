import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import LineProgressBar from '../LineProgressBar'
import styles from './styles';

const RatingProgreeBar = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            <View style={[styles.descriptionView, {width: props.style.width}]}>
                <Text style={styles.description}>{props.title}</Text>
                <Text style={styles.description}>{props.rate}</Text>
            </View>
            <LineProgressBar style={{width: props.width, marginTop:10}} width={props.width} progress={props.rate / 5.0}/>
        </View>
    );
}

RatingProgreeBar.propTypes = {
};

RatingProgreeBar.defaultProps = {
};

export default RatingProgreeBar;
