import React from 'react';
import PropTypes from 'prop-types';
import SVGButton from '../SVGButton'
import styles from './styles';

const CloseButton = (props) => {
    return (
        <SVGButton style={styles.CloseButton} image={require('../../../assets/close.png')} onPress={props.onPress}/>
    );
}

CloseButton.propTypes = {
    onPress: PropTypes.func
};

CloseButton.defaultProps = {
    onPress: () => {}
};

export default CloseButton;
