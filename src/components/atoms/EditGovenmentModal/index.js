import React, { Component } from 'react';
import { TextInput, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class EditGovenmentModal extends Component {
    static propTypes = {
        onSave: PropTypes.func,
        onCancel: PropTypes.func,
        governmentId: PropTypes.string,
    }

    static defaultProps = {
        onSave: () => {},
        onCancel: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            governmentId: null,
        };
    }

    componentWillMount() {
        this.setState({
            governmentId: this.props.governmentId,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Edit Government ID</Text>
                    <View style={styles.editContent}>
                        <Text style={styles.label}>Government ID: </Text>
                        <TextInput
                            autoFocus={true}
                            style={styles.editInput}
                            value={this.state.governmentId}
                            onChangeText={(governmentId) => this.setState({governmentId})}
                        />
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.onSave(this.state.governmentId);
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

export default EditGovenmentModal;