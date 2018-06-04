import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import styles from './styles';
import Calendar from '../../templates/Calendar';


class DateAndGuestPicker extends Component {
    constructor(props) {
        super(props);
        this.onGuests = this.onGuests.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSettings = this.onSettings.bind(this);
    }

    componentDidMount() { 
    }

    onSettings(){
        this.props.gotoSettings();
    }

    onGuests() {
        this.props.gotoGuests();
    }

    onSearch() {
        this.props.gotoSearch();
    }

    render() {
        const {
            checkInDate, checkOutDate, adults, children, infants, onDatesSelect, showSearchButton
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={showSearchButton ? styles.pickerRow : {display:'none'}}>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.calendar.open()}
                            style={checkInDate && checkOutDate ? styles.datesPickerViewComplete : styles.datesPickerViewIncomplete}
                        >
                            <View style={styles.datePickerView}>
                                <Text style={styles.label}>Check In</Text>
                                <Text style={styles.value}>{ checkInDate || 'Select Date' }</Text>
                            </View>

                            <View style={styles.separator} />

                            <View style={styles.datePickerView}>
                                <Text style={styles.label}>Check Out</Text>
                                <Text style={styles.value}>{ checkOutDate || '------' }</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={this.onGuests}
                    >
                        <View style={adults + children + infants ? styles.guestPickerViewComplete : styles.guestPickerViewIncomplete}>
                            <Text style={styles.label}>Guests</Text>
                            <Text style={styles.value}>{ adults + children + infants || '-' }</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.onSettings}>
                        <View style={styles.optionsPickerViewIncomplete}>
                            <Text style={styles.iconText}>
                                <FontAwesome>{Icons.cog}</FontAwesome>
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={this.onSearch}>
                    <View style={showSearchButton ?  styles.searchButtonView : {height: 0}}>
                        <Text style={showSearchButton ? styles.searchButtonText : {height: 0}}>Search</Text>
                    </View>
                </TouchableOpacity>
                <Calendar
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    format="ddd, DD MMM"
                    ref={(calendar) => { this.calendar = calendar; }}
                    onConfirm={onDatesSelect}
                />
            </View>
        );
    }
}

DateAndGuestPicker.propTypes = {
    checkInDate: PropTypes.string.isRequired,
    checkOutDate: PropTypes.string.isRequired,
    onDatesSelect: PropTypes.func.isRequired,
    adults: PropTypes.number.isRequired,
    children: PropTypes.number.isRequired,
    infants: PropTypes.number.isRequired,
    gotoSearch: PropTypes.func.isRequired,
    gotoGuests: PropTypes.func.isRequired,
    gotoSettings : PropTypes.func.isRequired,
    showSearchButton : PropTypes.bool
};

export default DateAndGuestPicker;
