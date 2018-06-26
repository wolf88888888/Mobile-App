import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
        console.log('cccc=====CCCCC')
        this.state = {
            currencies: [],
            selectedCurrencyId: null,
            selectedCurrencyCode: '',
        };
    }

    componentWillMount() {
        currencyArr = [];
        this.props.currencies.map((item, i) => {
            currencyArr.push({ 'label': item.code, 'value': item.id })
        });
        console.log('cccc=====', currencyArr)
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
                            value={this.state.selectedCurrencyId}
                        />
                        }
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log(this.state)
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

export default EditCurrencyModal;