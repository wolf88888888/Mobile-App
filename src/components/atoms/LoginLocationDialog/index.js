import React, { Component } from 'react';
import { StyleSheet} from 'react-native';

import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';

import MaterialDialog from '../MaterialDialog/MaterialDialog';
import Toast from 'react-native-simple-toast';

class LoginLocationDialog extends Component {
    static propTypes = {
        countries: PropTypes.array,
        title: PropTypes.string,
        titleColor: PropTypes.string,
        colorAccent: PropTypes.string,
        onOk: PropTypes.func.isRequired,
        okLabel: PropTypes.string,
    }

    static defaultProps = {
        onOk: () => {},
        title: undefined,
        titleColor: undefined,
        colorAccent: '#000',
        okLabel: undefined,
    }

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            selectedCountryId: null,
            selectedCountryName: ''
        };
    }

    componentWillMount() {
        countryArr = [];
        this.props.countries.map((item, i) => {
            countryArr.push({ 'label': item.name, 'value': item.id })
        });
        this.setState({
            countries: countryArr,
            selectedCountryId: this.props.country==null? null : this.props.country.id,
            selectedCountryName: this.props.country==null? null : this.props.country.name,
        });
    }

    render() {
        return (
            <MaterialDialog
                title= {this.props.title}
                titleColor={this.props.titleColor}
                colorAccent={this.props.colorAccent}
                okLabel={this.props.okLabel}
                isVisibleBottomBar = {true}
                visible={this.props.visible}
                onOk={() => {
                    if (this.state.selectedCountryId == null) {
                        Toast.showWithGravity('Please Select Country.', Toast.SHORT, Toast.BOTTOM);
                        return;
                    }

                    this.props.onOk(this.state.selectedCountryId)
                    }
                }>
                <RNPickerSelect
                    items={this.state.countries}
                    placeholder={{
                        label: 'Country of Residence',
                        value: 0
                    }}
                    onValueChange={(value) => {
                        this.setState({
                            selectedCountryId: value
                        });
                    }}
                    style={{...pickerSelectStyles}}
                >
                </RNPickerSelect>
            </MaterialDialog>
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

export default LoginLocationDialog;