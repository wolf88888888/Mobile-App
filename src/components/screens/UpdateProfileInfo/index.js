import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';

import BackButton from '../../atoms/BackButton';
import Footer from '../../atoms/Footer';
import Image from 'react-native-remote-svg';
import ProfileHistoryItem from '../../atoms/ProfileHistoryItem';
import PropTypes from 'prop-types';
import UserProfileHomes from '../../organisms/UserProfileHomes'
import UserProfileReviews from '../../organisms/UserProfileReviews'
import UserProfileSummary from '../../organisms/UserProfileSummary'
import UserPropertyItemTypeAction from '../../atoms/UserPropertyItemTypeAction'
import UserPropertyItemTypeInfo from '../../atoms/UserPropertyItemTypeInfo'
import { connect } from 'react-redux';
import styles from './styles';

class UpdateProfileInfo extends Component {

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        }
    }

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        // const { locAddress } = this.props.userInfo;
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.titleConatiner}>
                        <BackButton style={styles.closeButton} onPress={() => goBack()}/>
                        <Text style={styles.title}>{this.props.navigation.state.params.title}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default UpdateProfileInfo;
