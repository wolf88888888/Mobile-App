import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';
import styles from './styles';

class EditCurrencyModal extends Component {
    static propTypes = {
        onSave: PropTypes.func,
        onCancel: PropTypes.func,
        currencies: PropTypes.array,
        currencyId: PropTypes.number,
    }

    static defaultProps = {
        onSave: () => {},
        onCancel: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            selectedCurrencyId: null,
            selectedCurrencyCode: '',
        };
    }

    componentWillMount() {
        currencyArr = [];
        for (var i = 0; i< this.props.currencies.length; i++){
            let item = this.props.currencies[i];
            if ( i > 2 ) {
                break;
            }
            currencyArr.push({ 'label': item.code, 'value': item.id });
        }
        this.setState({
            currencies: currencyArr,
            selectedCurrencyId: this.props.currency.id,
            selectedCurrencyCode: this.props.currency.code,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Select Currency</Text>
                    
                        {this.state.currencies.length > 0 &&
                        <RNPickerSelect
                            items={this.state.currencies}
                            placeholder={{
                                label: 'Select your currency',
                                value: null,
                            }}
                            onValueChange={(value) => {
                                this.setState({
                                    selectedCurrencyId: value,
                                });
                            }}
                            style={{ ...pickerSelectStyles }}
                            value={this.state.selectedCurrencyId}
                        />
                        }
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                currency = {
                                    id: this.state.selectedCurrencyId==null? '1': this.state.selectedCurrencyId,
                                    code: this.state.selectedCurrencyCode==null? 'USD': this.state.selectedCurrencyCode 
                                }
                                this.props.onSave(currency);
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

export default EditCurrencyModal;