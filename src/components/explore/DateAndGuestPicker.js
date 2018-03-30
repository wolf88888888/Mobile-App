import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';

class DateAndGuestPicker extends Component {
  render() {
    const { checkInDate, checkOutDate, guests } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.pickerRow}>
          <View style={checkInDate && checkOutDate ? styles.datesPickerViewComplete : styles.datesPickerViewIncomplete}>
            <View style={styles.datePickerView}>
              <Text style={styles.label}>Check In</Text>
              <Text style={styles.value}>{ checkInDate ? checkInDate : 'Select Date' }</Text>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.datePickerView}>
              <Text style={styles.label}>Check Out</Text>
              <Text style={styles.value}>{ checkOutDate ? checkOutDate : '-' }</Text>
            </View>
          </View>

          <View style={guests ? styles.guestPickerViewComplete : styles.guestPickerViewIncomplete}>
            <Text style={styles.label}>Guests</Text>
            <Text style={styles.value}>{ guests ? guests : '-' }</Text>
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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16
  },
  pickerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  datesPickerViewIncomplete: {
    display: 'flex',
    flexDirection: 'row',
    width: 210,
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#dbdbdb',
    borderWidth: 0.5,
    justifyContent: 'space-around',
    padding: 8
  },
  datesPickerViewComplete: {
    display: 'flex',
    flexDirection: 'row',
    width: 210,
    height: 50,
    backgroundColor: '#f0f1f3',
    borderColor: '#dbdbdb',
    borderWidth: 0.5,
    justifyContent: 'space-around',
    padding: 8
  },
  datePickerView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    width: 0,
    borderWidth: 0.5,
    borderColor: '#d6d6d6'
  },
  guestPickerViewIncomplete: {
    display: 'flex',
    flexDirection: 'column',
    width: 65,
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#dbdbdb',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  guestPickerViewComplete: {
    display: 'flex',
    flexDirection: 'column',
    width: 65,
    height: 50,
    backgroundColor: '#f0f1f3',
    borderColor: '#dbdbdb',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontFamily: 'FuturaStd-Light',
    fontSize: 17,
    color: '#000',
    top: 2
  },
  value: {
    fontFamily: 'FuturaStd-Light',
    fontSize: 10,
    color: '#DA7B61'
  },
  optionsPickerViewIncomplete: {
    display: 'flex',
    flexDirection: 'column',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#dbdbdb',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsPickerViewComplete: {
    display: 'flex',
    flexDirection: 'column',
    width: 50,
    height: 50,
    backgroundColor: '#f0f1f3',
    borderColor: '#dbdbdb',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    color: '#000',
    fontSize: 28
  },
  searchButtonView: {
    width: '100%',
    backgroundColor: '#DA7B61',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  searchButtonText: {
    color: '#fff',
    fontFamily: 'FuturaStd-Light',
    fontSize: 17,
    padding: 14
  }
});