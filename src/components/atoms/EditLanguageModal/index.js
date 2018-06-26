import React, { Component } from 'react';
import { Picker, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class EditLanguageModal extends Component {
    static propTypes = {
        onSave: PropTypes.func,
        onCancel: PropTypes.func,
        languageValue: PropTypes.string,
    }

    static defaultProps = {
        onSave: () => {},
        onCancel: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            languageValue: 'en',
        };
        this.spinnerValueChange = this.spinnerValueChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            languageValue: this.props.languageValue==''? 'English': this.props.languageValue,
        });
    }

    spinnerValueChange(value){
        this.setState({languageValue: value});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Select Language</Text>
                    <View style={styles.editContent}>
                        <Picker style={styles.picker}
                            selectedValue={this.state.languageValue}
                            onValueChange={(itemValue, itemIndex) => this.spinnerValueChange(itemValue)}>
                            <Picker.Item label="English" value="English" />
                            <Picker.Item label="Russian" value="Russian" />
                            <Picker.Item label="Chinese" value="Chinese" />
                        </Picker>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.onSave(this.state.languageValue);
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

export default EditLanguageModal;