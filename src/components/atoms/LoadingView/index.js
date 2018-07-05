import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';

import styles from './styles';

const LoadingView = (props) => {
    return (
        <View style={[styles.container, props.style]}>
             <Image style={styles.gifView} source={require('../../../assets/loader.gif')} />
        </View>
    );
};

LoadingView.propTypes = {
};

LoadingView.defaultProps = {
};

export default LoadingView;
