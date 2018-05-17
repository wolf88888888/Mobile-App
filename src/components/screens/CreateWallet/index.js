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
import { validatePassword, validateConfirmPassword } from '../../../utils/validation';
import styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Wallet } from '../../../services/blockchain/wallet';

class CreateWallet extends Component {
    static propTypes = {
        // react-navigation
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired
        }).isRequired
    }

    state = {
        password: '',
        confirmPassword: ''
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    submitPassword() {
        try {
            setTimeout(() => {
                Wallet.createFromPassword(this.state.password).then((wallet) => {
                    AsyncStorage.setItem('walletAddress', wallet.address);
                    AsyncStorage.setItem('walletMnemonic', wallet.mnemonic);
                    AsyncStorage.setItem('walletJson', JSON.stringify(wallet.jsonFile));
                    console.log(wallet.address);
                    console.log(wallet.mnemonic);
                    console.log(wallet.jsonFile);
                    this.props.navigation.navigate('SaveWallet');
                });
            }, 1000);

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { password, confirmPassword } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={true}
            >
                <View style={styles.container}>
                    <GoBack
                        onPress={() => navigate('Welcome')}
                        icon="arrowLeft"
                    />

                    <View style={styles.main}>
                        <View style={styles.titleView}>
                            <Text style={styles.titleText}>Create LOC Private Wallet</Text>
                        </View>

                        <View>
                            <Text style={styles.infoText}>
                                Your LOC wallet is blockchain based and will not have control over it. It will not be on our server. When you are adding funds to it, your funds will be in your complete control and possession. It is very important not to share the password with anyone. For security reasons we will not store this password and there will be no way for you to recover it in case you forget it.
                            </Text>
                        </View>

                        <View style={styles.titleView}><Text style={styles.titleText}>Please create your LOC wallet</Text></View>

                        <View style={styles.inputView}>
                            <SmartInput
                                secureTextEntry
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={password}
                                onChangeText={this.onChangeHandler('password')}
                                placeholder="Password"
                                placeholderTextColor="#fff"
                                rightIcon={validatePassword(password) ? 'check' : null}
                            />
                        </View>

                        <View style={styles.titleView}><Text style={styles.titleText}>Please confirm your LOC wallet</Text></View>

                        <View style={styles.inputView}>
                            <SmartInput
                                secureTextEntry
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={confirmPassword}
                                onChangeText={this.onChangeHandler('confirmPassword')}
                                placeholder="Password"
                                placeholderTextColor="#fff"
                                rightIcon={validateConfirmPassword(password, confirmPassword) ? 'check' : null}
                            />
                        </View>

                        <View style={styles.nextButtonView}>
                            <TouchableOpacity
                                disabled={!validatePassword(password) || !validateConfirmPassword(password, confirmPassword)}
                                onPress={() => navigate('SaveWallet', password)}
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

export default CreateWallet;
