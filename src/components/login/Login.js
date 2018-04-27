import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import { domainPrefix } from '../../config';
import { validateEmail, validatePassword } from '../../utils/validation';
import { login } from '../../utils/requester';

import GoBack from '../common/GoBack';
import SmartInput from '../common/SmartInput';


// TODO: Styles to be kept in separate file
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#DA7B61'
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleView: {
        display: 'flex',
        width: '100%',
        marginTop: 16,
        marginLeft: 36,
        marginBottom: 16
    },
    titleText: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'FuturaStd-Light'
    },
    inputView: {
        width: '100%',
        margin: 11,
        paddingLeft: 18,
        paddingRight: 18
    },
    LogInButton: {
        height: 50,
        width: 280,
        backgroundColor: '#273842',
        borderRadius: 25,
        marginTop: 90,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'FuturaStd-Light'
    },
    lowOpacity: {
        opacity: 0.3
    },
    getStartedImage: {
        width: 400,
        height: 80
    }
});

class Login extends Component {
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
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            email: '',
            password: ''
        };
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

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    render() {
        const { email, password } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <GoBack
                    onPress={() => navigate('Welcome')}
                    icon="arrowLeft"
                />

                <View style={styles.main}>
                    <View style={styles.titleView}><Text style={styles.titleText}>Login</Text></View>

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
                        source={require('../../assets/get-started-white-outline.svg')}
                        style={styles.getStartedImage}
                    />
                </View>
            </View>
        );
    }
}

export default Login;
