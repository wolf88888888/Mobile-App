import React, { Component } from 'react';
import { TextInput, Text, TouchableOpacity, View} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import PropTypes from 'prop-types';
import styles from './styles';

class EditPhoneModal extends Component {
    static propTypes = {
        onSave: PropTypes.func,
        onCancel: PropTypes.func,
        value: PropTypes.string,
    }

    static defaultProps = {
        onSave: () => {},
        onCancel: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            value: ""
        };
        this.updateInfo = this.updateInfo.bind(this);
        this.renderInfo = this.renderInfo.bind(this);
    }

    componentDidMount() {
        this.setState({
            valid: true,
            value: this.props.phone
        });
    }
    
    updateInfo() {
        this.setState({
          valid: this.phone.isValidNumber(),
          value: this.phone.getValue()
        });
        console.log(this.state);
        if (this.phone.isValidNumber()){
            this.props.onSave(this.phone.getValue());
        }
      }
    
    renderInfo() {
        if (this.state.value) {
            return (
            <View>
                <Text  style={styles.info}>
                Invalid PhoneNumber!
                </Text>
            </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Edit Phone</Text>
                    {!this.state.valid &&  this.renderInfo()}
                    <View style={styles.editContent}>
                        <PhoneInput
                            ref={(ref) => { this.phone = ref; }}
                            value={this.state.value}
                        />
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.updateInfo();
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

export default EditPhoneModal;