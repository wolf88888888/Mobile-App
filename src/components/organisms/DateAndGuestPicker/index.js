import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


class DateAndGuestPicker extends Component {
    constructor(props) {
        super(props);
        console.log("DateAndGuestPicker", props);
    }

    onSettings = () => {
        this.props.gotoSettings();
    }

    onGuests = () => {
        this.props.gotoGuests();
    }

    onSearch = () => {
        this.props.gotoSearch();
    }

    onCancel = () => {
        this.props.gotoCancel();
    }

    onCalendar = () => {
        this.props.navigation.navigate('CalendarScreen', {
            startDate: this.props.checkInDateFormated,
            endDate: this.props.checkOutDateFormated,
            format_input: "DD/MM/YYYY",
            format_display: "ddd, DD MMM",
            onConfirm: this.props.onDatesSelect
        });
    }

    render() {
        const {
            checkInDate, checkOutDate, adults, children, infants, showSearchButton, showCancelButton, disabled, isFilterable
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.pickerRow}>
                    <View style={{flex:1}}>
                        <TouchableOpacity
                            onPress={this.onCalendar}
                            style={checkInDate && checkOutDate ? styles.datesPickerViewComplete : styles.datesPickerViewIncomplete}
                            disabled={disabled}>
                            <View style={styles.datePickerView}>
                                <Text style={disabled ? styles.label_disabled : styles.label}>Check In</Text>
                                <Text style={styles.value}>{ checkInDate || 'Select Date' }</Text>
                            </View>

                            <View style={styles.separator} />

                            <View style={styles.datePickerView}>
                                <Text style={disabled ? styles.label_disabled : styles.label}>Check Out</Text>
                                <Text style={styles.value}>{ checkOutDate || '------' }</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={this.onGuests}
                        disabled={disabled}>
                        <View style={adults + children + infants ? styles.guestPickerViewComplete : styles.guestPickerViewIncomplete}>
                            <Text style={disabled ? styles.label_disabled : styles.label}>Guests</Text>
                            <Text style={styles.value}>{ adults + children + infants || '-' }</Text>
                        </View>
                    </TouchableOpacity>
                    {
                        isFilterable && 
                            (
                                <TouchableOpacity
                                    disabled={disabled}
                                    onPress={this.onSettings}>
                                    <View style={styles.optionsPickerViewIncomplete}>
                                        <Icon name={"settings"} size={28} color={disabled?'#d9d9d9':"#565656"}/>
                                    </View>
                                </TouchableOpacity>
                            )
                    }
                </View>

                <TouchableOpacity onPress={this.onSearch}>
                    <View style={showSearchButton ?  styles.searchButtonView : {height: 0}}>
                        <Text style={showSearchButton ? styles.searchButtonText : {height: 0}}>Search</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onCancel}>
                    <View style={showCancelButton ?  styles.searchButtonView : {height: 0}}>
                        <Text style={showCancelButton ? styles.searchButtonText : {height: 0}}>Cancel</Text>
                    </View>
                </TouchableOpacity>
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
    gotoCancel: PropTypes.func.isRequired,
    gotoGuests: PropTypes.func.isRequired,
    gotoSettings : PropTypes.func.isRequired,
    showSearchButton : PropTypes.bool.isRequired,
    showCancelButton : PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    isFilterable: PropTypes.bool.isRequired
};

DateAndGuestPicker.defaultProps = {
    checkInDate: '',
    checkOutDate: '',
    onDatesSelect: ()=>{},
    adults: 2,
    children: 0,
    infants: 0, 
    gotoSearch: ()=>{},
    gotoCancel: ()=>{},
    gotoGuests: ()=>{},
    gotoSettings: ()=>{},
    showSearchButton: false,
    showCancelButton : false,
    disabled: false,
    isFilterable: true
};


export default withNavigation(DateAndGuestPicker);
