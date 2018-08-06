import {
    AsyncStorage,
    Keyboard,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import React, { Component } from 'react';
import { validateEmail, validatePassword, validatePassword1 } from '../../../utils/validation';
import { setEmail } from '../../../utils/userInstance';

import Image from 'react-native-remote-svg';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import PropTypes from 'prop-types';
import SmartInput from '../../atoms/SmartInput';
import SplashScreen from 'react-native-smart-splash-screen';
import { autobind } from 'core-decorators';
import { domainPrefix } from '../../../config';
import requester from '../../../initDependencies';
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
    }

    // TODO: Need a way to generate a Google ReCAPTCHA token

    onClickLogIn() {
    // Toast.showWithGravity('Cannot login, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
    // return;
        const { email, password } = this.state;
        const user = { email, password };

        this.setState({ showProgress: true });

        requester.login(user, null).then(res => {
            this.setState({ showProgress: false });
            if (res.success) {
                res.body.then(data => {
                    AsyncStorage.setItem(`${domainPrefix}.auth.locktrip`, data.Authorization);
                    // TODO: Get first name + last name from response included with Authorization token (Backend)
                    AsyncStorage.setItem(`${domainPrefix}.auth.username`, user.email);
                    this.props.navigation.navigate('MainScreen');
                });
            } else {
                res.errors.then(data => {
                    const { errors } = data;
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
