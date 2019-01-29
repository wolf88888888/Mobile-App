import React, { Component } from 'react';
import { TextInput, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class EditWorkModal extends Component {
    static propTypes = {
        onSave: PropTypes.func,
        onCancel: PropTypes.func,
        work: PropTypes.string,
    }

    static defaultProps = {
        onSave: () => {},
        onCancel: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            work: '',
        };
    }

    componentWillMount() {
        this.setState({
            work: this.props.work,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Edit Work</Text>
                    <View style={styles.editContent}>
                        <Text style={styles.label}>Work: </Text>
                        <TextInput
                            autoFocus={true}
                            style={styles.editInput}
                            value={this.state.work}
                            onChangeText={(work) => this.setState({work})}
                        />
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.onSave(this.state.work);
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

export default EditWorkModal;