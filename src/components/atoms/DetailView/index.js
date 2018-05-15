import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ViewPropTypes
} from 'react-native';

import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';

import styles from './styles';

const RNPropTypes = PropTypes || React.PropTypes;

const DetailView = (props) => {
    return (
        <View style={styles.container}>
            <Image source={props.image} style={styles.detailImage}/>

            <View style={styles.detailView}>
                <View style={{alignItems: 'flex-end'}}>
                    <Text style={styles.detailText}>{props.detail}</Text>
                </View>
                {
                    props.supText != '' ?
                    <View style={{alignItems: 'flex-start'}}>
                        <Text style={styles.detailTopText}>{props.supText}</Text>
                    </View>
                    :
                    null
                }
            </View>
        </View>
    );
}

DetailView.propTypes = {
    detail: RNPropTypes.string.isRequired,
    supText: RNPropTypes.string,
};

DetailView.defaultProps = {
    detail: '',
    supText: '',
};

export default DetailView;
