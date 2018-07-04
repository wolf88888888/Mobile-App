import React, { Component } from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class EditGenderModal extends Component {
    static propTypes = {
        onSave: PropTypes.func,
        onCancel: PropTypes.func,
        isFemale: PropTypes.bool,
    }

    static defaultProps = {
        onSave: () => {},
        onCancel: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            isFemale: true,
        };
    }

    componentWillMount() {
        this.setState({
            isFemale: this.props.isFemale,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Select Gender</Text>
                    <View style={styles.editContent}>
                        <View style={styles.genderView}>
                            <TouchableOpacity onPress={() => this.setState({isFemale: false})} style={[styles.gender, !this.state.isFemale? styles.selected: '']}>
                                {
                                    !this.state.isFemale &&
                                    <Image source={require('../../../assets/png/Filters/check.png')} style={styles.tick}/>
                                }
                                <Image source={require('../../../assets/png/male.png')} style={styles.headerIcons}/>
                            </TouchableOpacity>
                            <Text style={styles.genderType}>Male</Text>
                        </View>
                        <View style={styles.genderView}>
                            <TouchableOpacity onPress={() => this.setState({isFemale: true})} style={[styles.gender, this.state.isFemale? styles.selected: '']}>
                                {
                                    this.state.isFemale &&
                                    <Image source={require('../../../assets/png/Filters/check.png')} style={styles.tick}/>
                                }
                                <Image source={require('../../../assets/png/female.png')} style={styles.headerIcons}/>
                            </TouchableOpacity>
                            <Text style={styles.genderType}>Female</Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.onSave(this.state.isFemale);
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

export default EditGenderModal;