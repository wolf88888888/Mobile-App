import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewPropTypes
} from 'react-native';

import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';

import styles from './styles';

const RNPropTypes = PropTypes || React.PropTypes;

const FacilityView = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            {
                props.more != ''?
                    <TouchableOpacity onPress={props.onPress}>
                        <Text style={styles.facilityMore}>+{props.more}</Text>
                    </TouchableOpacity>
                :
                    <Image source={props.image} style={styles.facilityImage}/>
            }

        </View>
    );
}

FacilityView.propTypes = {
    more: PropTypes.string,
};

FacilityView.defaultProps = {
    more: '',
};

export default FacilityView;
