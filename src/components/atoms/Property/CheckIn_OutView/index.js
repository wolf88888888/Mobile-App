import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View
      } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class CheckIn_OutView extends Component {

    static propTypes = {
        checkin: PropTypes.string.isRequired,
        checkout: PropTypes.string.isRequired,
    };

    static defaultProps = {
        checkin: '',
        checkout: '',
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainter}>
                    <Text style={styles.title}>Check-In Time</Text>
                    <Text style={styles.title}>{this.props.checkin}</Text>
                </View>
                <View style={[styles.titleContainter, {marginTop:30}]}>
                    <Text style={styles.title}>Check-Out Time</Text>
                    <Text style={styles.title}>{this.props.checkout}</Text>
                </View>
            </View>
        );
    }
}

export default CheckIn_OutView;
