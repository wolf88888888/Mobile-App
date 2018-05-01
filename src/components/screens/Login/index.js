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
import { validateEmail, validatePassword } from '../../../utils/validation';
import { login } from '../../../utils/requester';

import styles from './styles';


class Login extends Component {
    static propTypes = {
        // react-navigation
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired
        }).isRequired
    }

    state = {
        email: '',
        password: ''
    }

    // TODO: Need a way to generate a Google ReCAPTCHA token

    onClickLogIn() {
        const { email, password } = this.state;
        const user = { email, password };

        login(user, null).then((res) => {
            if (res.success) {
                res.response.json().then((data) => {
                    AsyncStorage.setItem(`${domainPrefix}.auth.lockchain`, data.Authorization);
                    // TODO: Get first name + last name from response included with Authorization token (Backend)
                    AsyncStorage.setItem(`${domainPrefix}.auth.username`, user.email);
                    this.props.navigation.navigate('App');
                });
            } else {
                res.response.then((response) => {
                    const { errors } = response;
                    Object.keys(errors).forEach((key) => {
                        if (typeof key !== 'function') {
                            console.log('Error logging in:', errors[key].message);
                            // TODO: give user feedback about having and error logging in
                        }
                    });
                });
            }
        });
    }

    @autobind
    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    render() {
        const { email, password } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <View style={styles.container}>
                    <GoBack
                        onPress={() => navigate('Welcome')}
                        icon="arrowLeft"
                    />

                    <View style={styles.main}>
                        <View style={styles.titleView}>
                            <Text style={styles.titleText}>Login</Text>
                        </View>

                        <View style={styles.inputView}>
                            <SmartInput
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={email}
                                onChangeText={this.onChangeHandler('email')}
                                placeholder="Email"
                                placeholderTextColor="#fff"
                                rightIcon={validateEmail(email) ? 'check' : null}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <SmartInput
                                secureTextEntry
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={password}
                                onChangeText={this.onChangeHandler('password')}
                                placeholder="Password"
                                placeholderTextColor="#fff"

                            />
                        </View>

                        <TouchableOpacity
                            disabled={!validateEmail(email) || !validatePassword(password)}
                            onPress={() => this.onClickLogIn()}
                        >
                            <View style={styles.LogInButton}>
                                <Text style={styles.buttonText}>
                                Log In
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.lowOpacity}>
                        <Image
                            source={require('../../../assets/get-started-white-outline.svg')}
                            style={styles.getStartedImage}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default Login;
