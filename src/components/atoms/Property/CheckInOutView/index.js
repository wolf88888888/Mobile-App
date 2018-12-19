import React, { Component } from 'react';
import {
        Text,
        View
      } from 'react-native';
import styles from './styles';

class CheckInOutView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let { checkInStart, checkInEnd, checkOutStart, checkOutEnd} = this.props;
        if (checkInStart == null) {
            checkInStart = 0;
        }
        const checkIn = checkInEnd === 24 ? `${checkInStart}:00 PM` : `${checkInStart}:00 - ${checkInEnd}:00 PM`;
        const checkOut = checkOutStart === 0 ? `${checkOutEnd}:00 PM` : `${checkOutStart}:00 - ${checkOutEnd}:00 PM`;
        return (
            <View style={styles.container}>
                <View style={styles.titleContainter}>
                    <Text style={styles.title}>Check-In Time</Text>
                    <Text style={styles.title}>
                        {checkIn}
                    </Text>
                </View>
                <View style={[styles.titleContainter, {marginTop:30}]}>
                    <Text style={styles.title}>Check-Out Time</Text>
                    <Text style={styles.title}>
                        {checkOut}
                    </Text>
                </View>
            </View>
        );
    }
}

export default CheckInOutView;
