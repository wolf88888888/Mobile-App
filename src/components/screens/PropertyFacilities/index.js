import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Keyboard
    } from 'react-native';
import PropTypes from 'prop-types';

import CloseButton from '../../atoms/CloseButton';

import styles from './styles';

class PropertyFacilities extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        }
    }

    constructor(props) {
        super(props);
    }

    onClose() {
      this.props.navigation.goBack();
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
              <CloseButton onPress={() => this.onClose()}/>
              <View style={styles.bodyRows}>
                <Text>testtset</Text>
              </View>
            </View>
        );
    }
}

export default PropertyFacilities;
