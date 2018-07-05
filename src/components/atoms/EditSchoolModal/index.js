import React, { Component } from 'react';
import { TextInput, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class EditSchoolModal extends Component {
    static propTypes = {
        onSave: PropTypes.func,
        onCancel: PropTypes.func,
        schoolName: PropTypes.string,
    }

    static defaultProps = {
        onSave: () => {},
        onCancel: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            schoolName: '',
        };
    }

    componentWillMount() {
        this.setState({
            schoolName: this.props.school,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Edit School</Text>
                    <View style={styles.editContent}>
                        <Text style={styles.label}>School Name: </Text>
                        <TextInput
                            autoFocus={true}
                            style={styles.editInput}
                            value={this.state.schoolName}
                            onChangeText={(schoolName) => this.setState({schoolName})}
                        />
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.onSave(this.state.schoolName);
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

export default EditSchoolModal;