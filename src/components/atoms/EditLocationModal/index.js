import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';
import Toast from 'react-native-easy-toast';
import styles from './styles';
import requester from '../../../initDependencies';

class EditLocationModal extends Component {
    static propTypes = {
        onSave: PropTypes.func,
        onCancel: PropTypes.func,
        countries: PropTypes.array,
        countryId: PropTypes.number,
        countryState: PropTypes.object,
        cities: PropTypes.array,
        cityId: PropTypes.number,
    }

    static defaultProps = {
        onSave: () => { },
        onCancel: () => { },
    }

    constructor(props) {
        super(props);
        console.log("EditLocationModal props", props);

        countryArr = [];
        this.props.countries.map((item, i) => {
            countryArr.push({ 'label': item.name, 'value': item })
        });

        hasCountryState = this.hasCountryState(this.props.country);

        this.state = {
            countries: countryArr,
            countryStates: [],
            country: this.props.country,
            countryState: undefined,
            hasCountryState: false,
        };
        if (hasCountryState) {
            requester.getStates(this.state.country.id).then(res => {
                res.body.then(data => {
                    this.setCountryStates(data, true);
                });
            });
        }
    }

    hasCountryState = (country) => {
        if (country === undefined || country === null) {
            return false;
        }
        
        return ['Canada', 'India', 'United States of America'].includes(country.name);
    }

    setCountryStates = (states, isInit) => {
        console.log("setCountryStates", states);
        countryStates = [];
        let selectedState = undefined;
        states.map((item, i) => {
            if (isInit && item.id === this.props.countryState.id) {
                selectedState = item
            }
            countryStates.push({
                'label': item.name,
                'value': item
            });
            
        });
        this.setState({
            hasCountryState: true,
            countryStates: countryStates,
            countryState: selectedState,
        }, () => {
            console.log("setCountryStates ----", this.state);
        });
    }

    onCountrySelected = (value) => {
        console.log("onCountrySelected value:", value);
        const hasCountryState = this.hasCountryState(value);
        this.setState({
            country: value !== null && value != 0 ? value : undefined,
            countryStates: [],
            hasCountryState: false,
            countryState: undefined,
            showProgress: hasCountryState
        });

        if (hasCountryState) {
            requester.getStates(value.id).then(res => {
                res.body.then(data => {
                    this.setCountryStates(data, false);
                });
            }).catch(err => {
                this.refs.toast.show('Cannot get Country state, Please check network connection.', 1500);
                console.log("onCountrySelected", err);
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Edit Location</Text>
                    {/* <View style={{flex: 1}}> */}
                    <RNPickerSelect
                        items={this.state.countries}
                        placeholder={{
                            label: 'Choose your location',
                            value: null,
                        }}
                        onValueChange={(value) => this.onCountrySelected(value)}
                        style={{ ...pickerSelectStyles }}
                        value={this.state.country}
                    />
                    {
                        this.state.hasCountryState && (
                            <RNPickerSelect
                                items={this.state.countryStates}
                                placeholder={{
                                    label: 'Choose your State',
                                    value: 0
                                }}
                                onValueChange={(value) => {
                                    if (value === 0)
                                        return;
                                    this.setState({
                                        countryState: value
                                    });
                                }}
                                style={{...pickerSelectStyles}}
                                value={this.state.countryState}
                            >
                            </RNPickerSelect>
                        )
                    }
                    {/* </View> */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                if (this.state.hasCountryState && this.state.countryState === undefined) {
                                    this.refs.toast.show('Please select country state.', 1500);
                                    return;
                                }
                                console.log("123123123 : ", this.state.country, this.state.countryState)
                                this.props.onSave(this.state.country, this.state.countryState);
                            }}>
                            <View style={styles.SaveButton}>
                                <Text style={styles.buttonTitle}> Save </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.onCancel();
                            }}>
                            <View style={styles.CancelButton}>
                                <Text style={styles.buttonTitle}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <Toast
                    ref="toast"
                    position='bottom'
                    opacity={0.8}
                    positionValue={150}
                />
            </View>
        )
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});

export default EditLocationModal;