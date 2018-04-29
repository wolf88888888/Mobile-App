import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';

// TODO: move styles to separate file
const styles = StyleSheet.create({
    container: {
    // if the user is using an iPhone X, we need
    // to add an extra bit of padding for the notch
        ...ifIphoneX({
            height: 40
        }, {
            height: 20
        })
    }
});

const TopSpacer = props => <View style={[styles.container, { backgroundColor: props.backColor }]} />;

TopSpacer.defaultProps = {
    backColor: '#DA7B61'
};

TopSpacer.propTypes = {
    backColor: PropTypes.string
};

export default TopSpacer;

