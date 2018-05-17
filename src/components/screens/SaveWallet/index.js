import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import Image from 'react-native-remote-svg';
import { autobind } from 'core-decorators';

import GoBack from '../../atoms/GoBack';
import SmartInput from '../../atoms/SmartInput';
import { domainPrefix } from '../../../config';
import styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';


class SaveWallet extends Component {
    static propTypes = {
        // react-navigation
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired
        }).isRequired
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <TouchableWithoutFeedback
            >
                <View style={styles.container}>
                    <GoBack
                        onPress={() => navigate('Welcome')}
                        icon="arrowLeft"
                    />

                    <View style={styles.main}>
                        <View style={styles.titleView}>
                            <Text style={styles.titleText}>Wallet Recovery</Text>
                        </View>

                        <View>
                            <Text style={styles.infoText}>
                                Your mnemonic recovery keywords are a way for you to backup the access to your wallet. You should print them on a piece of paper and store them in a safe place.
                            </Text>
                        </View>

                        <View style={styles.inputView}>
                        <SmartInput
                                value="1. wool"
                                placeholderTextColor="#fff"
                            />
                        </View>

                        <View style={styles.inputView}>
                            <SmartInput
                                value="2. circle"
                                placeholderTextColor="#fff"
                            />
                        </View>

                        <View style={styles.nextButtonView}>
                            <TouchableOpacity
                                onPress={() => navigate('SaveWallet')}
                            >
                                <View style={styles.nextButton}>
                                    <Text style={styles.buttonText}>
                                        <FontAwesome>{Icons.arrowRight}</FontAwesome>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default SaveWallet;
