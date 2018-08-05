import React from 'react';
import PropTypes from 'prop-types';
import SVGButton from '../SVGButton'
import styles from './styles';

const WhiteBackButton = (props) => {
    return (
        <SVGButton style={styles.WhiteBackButton} image={require('../../../assets/png/arrow-back-white.png')} onPress={props.onPress}/>
    );
}

WhiteBackButton.propTypes = {
    onPress: PropTypes.func
};

WhiteBackButton.defaultProps = {
    onPress: () => {}
};

export default WhiteBackButton;
