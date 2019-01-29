import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGButton from '../SVGButton'
import styles from './styles';

const BackButton = (props) => {
    return (
        <SVGButton style={styles.BackButton} image={require('../../../assets/png/arrow-back.png')} onPress={props.onPress}/>
    );
}

BackButton.propTypes = {
    onPress: PropTypes.func
};

BackButton.defaultProps = {
    onPress: () => {}
};

export default BackButton;
