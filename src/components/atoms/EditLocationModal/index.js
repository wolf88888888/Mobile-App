import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';
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
        this.state = {
            countries: [],
            countryStates: [],
            country: null,
            countryState: null,
            // cities: [],
            // selectedCountryId: null,
            // selectedCountryName: '',
            // selectedCityId: null,
            // selectedCityName: '',
            // selectedStateId: '',
            hasCountryState: false,
        };
    }

    componentWillMount() {
        countryArr = [];
        this.props.countries.map((item, i) => {
            countryArr.push({ 'label': item.name, 'value': item })
        });

        hasCountryState = this.hasCountryState(this.props.country);

        this.setState({
            countries: countryArr,
            country: this.props.country,
            countryState: this.props.countryState,
            // selectedCityId: this.props.city==null? null: this.props.city.id,
            // selectedCountryId: this.props.country==null? null : this.props.country.id,
            // selectedCountryName: this.props.country==null? null : this.props.country.name,
            // selectedStateId: this.props.countryState==null? null : this.props.countryState.id,
            hasCountryState: hasCountryState
        }, () => {
            if (this.state.hasCountryState) {
                requester.getStates(this.state.country.id).then(res => {
                    res.body.then(data => {
                        this.setCountryStates(data);
                    });
                });
            }
        });
        // if (this.props.country != null){
        //     this.getCities(this.props.country.id );
        // }
    }

    hasCountryState = (country) => {
        if (country === undefined || country === null) {
            return false;
        }
        
        return ['Canada', 'India', 'United States of America'].includes(country.name);
    }

    setCountryStates = (states) => {
        countryStates = [];
        states.map((item, i) => {
            countryStates.push({
                'label': item.name,
                'value': item
            });
            
        });
        this.setState({
            countryStates,
        });
    }

    onCountrySelected = (value) => {
        // this.setState({
        //     selectedCountryId: value,
        //     selectedCityId: null,
        // });
        // this.getCities(value);
        const hasCountryState = this.hasCountryState(value);
        this.setState({
            // countryId: value.id,
            // countryName: value.name,
            country: value !== null && value != 0 ? value : null,
            countryStates: [],
            hasCountryState: hasCountryState,
            countryState: null,
        });

        if (hasCountryState) {
            requester.getStates(value.id).then(res => {
                res.body.then(data => {
                    console.log("countryStates", data);
                    this.setCountryStates(data);
                });
            });
        }
    }

    // onCountrySelected = (value) => {
    //     const hasCountryState = this.hasCountryState(value);
    //     this.setState({
    //         // countryId: value.id,
    //         // countryName: value.name,
    //         country: value != 0 ? value : undefined,
    //         countryStates: [],
    //         hasCountryState: hasCountryState,
    //         countryState: '',
    //     });

    //     if (hasCountryState) {
    //         requester.getStates(value.id).then(res => {
    //             res.body.then(data => {
    //                 console.log("countryStates", data);
    //                 this.setCountryStates(data);
    //             });
    //         });
    //     }
    // }


    // getCities(countryId) {
    //     cityArr = [];
    //     // requester.getCities(countryId, false).then(res => {
    //     //     res.body.then(data => {
    //     //         if (data.content.length > 0) {
    //     //             data.content.map((item, i) => {
    //     //                 cityArr.push({ 'label': item.name, 'value': item.id })
    //     //             })
    //     //             this.setState({
    //     //                 cities: cityArr,
    //     //                 selectedCityId: this.state.selectedCityId == null ? cityArr[0].value : this.state.selectedCityId,
    //     //             })
    //     //         }
    //     //     });
    //     // }).catch(err => {
    //     //     console.log('error: ', err);
    //     // });
    // }

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
                    {/* {this.state.selectedCityId !== null && this.state.cities.length > 0 &&
                        <RNPickerSelect
                            items={this.state.cities}
                            placeholder={{
                                label: 'Choose your city',
                                value: null,
                            }}
                            onValueChange={(value) => {
                                index = _.findIndex(this.state.cities, function (o) {
                                    return o.value == value;
                                })
                                this.setState({
                                    selectedCityName: this.state.cities[index].label,
                                    selectedCityId: value,
                                });
                            }}
                            style={{ ...pickerSelectStyles }}
                            value={this.state.selectedCityId}
                        />
                    } */}
                    {/* </View> */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                // cId = this.state.selectedCityId
                                // index = _.findIndex(this.state.cities, function (o) {
                                //     return o.value == cId;
                                // })
                                // city = {
                                //     id: this.state.selectedCityId,
                                //     name: this.state.cities[index].label == null ? this.state.cities[0].label : this.state.cities[index].label,
                                // }
                                // city = null;
                                // country = {
                                //     id: this.state.country.id,
                                //     name: this.state.country.name
                                // }
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