import React, { Component } from 'react';
import { TextInput, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';
import styles from './styles';

class EditLocationModal extends Component {
    static propTypes = {
        onSave: PropTypes.func,
        onCancel: PropTypes.func,
        countries: PropTypes.array,
        countryId: PropTypes.number,
    }

    static defaultProps = {
        onSave: () => {},
        onCancel: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            selectedCountryId: 0,
        };
    }

    componentWillMount() {
        countryArr = [];
        this.props.countries.map((item, i) => {
            countryArr.push({ 'label': item.name, 'value': item.id })
        });
        this.setState({
            countries: countryArr,
            selectedCountryId: this.props.countryId
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Edit Location</Text>
                    <RNPickerSelect
                        items={this.state.countries}
                        placeholder={{
                            label: 'Choose a location',
                            value: this.state.selectedCountryId,
                        }}
                        onValueChange={(value) => {
                            this.setState({
                                selectedCountryId: value,
                            });
                        }}
                        value={this.state.selectedCountryId}
                        style={{ ...pickerSelectStyles }}
                    />
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.onSave(this.state.selectedCountryId==null? 0: this.state.selectedCountryId);
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