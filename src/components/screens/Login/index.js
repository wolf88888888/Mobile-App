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

import SmartInput from '../../atoms/SmartInput';
import { domainPrefix } from '../../../config';
import { validateEmail, validatePassword, validatePassword1 } from '../../../utils/validation';
import { login } from '../../../utils/requester';
import styles from './styles';
import SplashScreen from 'react-native-smart-splash-screen';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import Toast from 'react-native-simple-toast';

class Login extends Component {
    static propTypes = {
        // react-navigation
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired
        }).isRequired
    }

    state = {
        email: '',
        password: '',
        showProgress: false
    }

    componentDidMount() {
        console.disableYellowBox = true;
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500
        });

        // Toast.showWithGravity(alertMessage, Toast.SHORT, Toast.BOTTOM);
        // if (__DEV__) {
        //     Toast.showWithGravity("Debug ----- ", Toast.SHORT, Toast.BOTTOM);
        // } else {
        //     Toast.showWithGravity("Release ----- ", Toast.SHORT, Toast.BOTTOM);
        // }
    }

    // TODO: Need a way to generate a Google ReCAPTCHA token

    onClickLogIn() {
    // Toast.showWithGravity('Cannot login, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
    // return;
        const { email, password } = this.state;
        const user = { email, password };

        this.setState({ showProgress: true });

        login(user, null).then((res) => {
            this.setState({ showProgress: false });
            if (res.success) {
                res.response.json().then((data) => {
                    AsyncStorage.setItem(`${domainPrefix}.auth.lockchain`, data.Authorization);
                    // TODO: Get first name + last name from response included with Authorization token (Backend)
                    AsyncStorage.setItem(`${domainPrefix}.auth.username`, user.email);
                    this.props.navigation.navigate('MainScreen');
                });
            } else {
                res.response.then((response) => {
                    const { errors } = response;
                    Object.keys(errors).forEach((key) => {
                        if (typeof key !== 'function') {
                            // Toast.showWithGravity(errors[key].message, Toast.SHORT, Toast.BOTTOM);
                            console.log('Error logging in  :', errors[key].message);
                            alert(errors[key].message);
                        }
                    });
                });
            }
        })
        .catch(err => {
            this.setState({ showProgress: false });
            alert('Cannot login, Please check network connection.');
            console.log(err);
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
                    <View style={styles.chatToolbar}>

                        <TouchableOpacity onPress={this.onBackPress}>
                            <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-white.png')} />
                        </TouchableOpacity>

                    </View>

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
                            disabled={!validateEmail(email) || !validatePassword1(password)}
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
                            source={require('../../../assets/get-started-white-outline.png')}
                            style={styles.getStartedImage}
                        />
                    </View>

                    <ProgressDialog
                       visible={this.state.showProgress}
                       title=""
                       message="Login..."
                       animationType="slide"
                       activityIndicatorSize="large"
                       activityIndicatorColor="black"/>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    }
}

export default Login;
