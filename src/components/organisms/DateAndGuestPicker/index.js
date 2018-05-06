import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import styles from './styles';
import Calendar from '../../templates/Calendar';


class DateAndGuestPicker extends Component {
    componentDidMount() {
    }
    render() {
        const { checkInDate, checkOutDate, guests } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.pickerRow}>
                    <View style={checkInDate && checkOutDate ? styles.datesPickerViewComplete : styles.datesPickerViewIncomplete}>
                        <TouchableOpacity onPress={() => this.calendar.open()}>
                            <View style={styles.datePickerView}>
                                <Text style={styles.label}>Check In</Text>
                                <Text style={styles.value}>{ checkInDate || 'Select Date' }</Text>
                            </View>

                            <View style={styles.separator} />

                            <View style={styles.datePickerView}>
                                <Text style={styles.label}>Check Out</Text>
                                <Text style={styles.value}>{ checkOutDate || '-' }</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={guests ? styles.guestPickerViewComplete : styles.guestPickerViewIncomplete}>
                        <Text style={styles.label}>Guests</Text>
                        <Text style={styles.value}>{ guests || '-' }</Text>
                    </View>

                    <View style={styles.optionsPickerViewIncomplete}>
                        <Text style={styles.iconText}>
                            <FontAwesome>{Icons.cog}</FontAwesome>
                        </Text>
                    </View>
                </View>

                <TouchableOpacity>
                    <View style={styles.searchButtonView}>
                        <Text style={styles.searchButtonText}>Search</Text>
                    </View>
                </TouchableOpacity>
                <Calendar
                    ref={(calendar) => { this.calendar = calendar; }}
                />
            </View>
        );
    }
}

DateAndGuestPicker.propTypes = {
    checkInDate: PropTypes.string.isRequired,
    checkOutDate: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired
};

export default DateAndGuestPicker;
