import React, { Component } from 'react';
import { TextInput, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class EditNameModal extends Component {
    static propTypes = {
        onSave: PropTypes.func,
        onCancel: PropTypes.func,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }

    static defaultProps = {
        onSave: () => {},
        onCancel: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
        };
    }

    componentWillMount() {
        this.setState({
            firstName: this.props.firstName,
            lastName: this.props.lastName,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Edit Name</Text>
                    <View style={styles.editContent}>
                        <Text>First Name: </Text>
                        <TextInput
                            autoFocus={true}
                            style={styles.editInput}
                            value={this.state.firstName}
                            onChangeText={(firstName) => this.setState({firstName})}
                        />
                    </View>
                    <View style={styles.editContent}>
                        <Text>Last Name: </Text>
                        <TextInput
                            style={styles.editInput}
                            value={this.state.lastName}
                            onChangeText={(lastName) => this.setState({lastName})}
                        />
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.onSave(this.state.firstName, this.state.lastName);
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

export default EditNameModal;