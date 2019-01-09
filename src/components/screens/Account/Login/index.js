import {
    AsyncStorage,
    Keyboard,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';

import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-smart-splash-screen';
import { autobind } from 'core-decorators';
import styles from './styles';
import { validateEmail, validatePassword1 } from '../../../../utils/validation';
import SmartInput from '../../../atoms/SmartInput';
import ProgressDialog from '../../../atoms/SimpleDialogs/ProgressDialog';
import { domainPrefix } from '../../../../config';
import requester from '../../../../initDependencies';
import LoginLocationDialog from '../../../atoms/LoginLocationDialog'
import LoginEmailVerifyDialog from '../../../atoms/LoginEmailVerifyDialog'

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
        showProgress: false,
        locationDialogVisible: false,
        verificationDialogVisible: false,
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
        // this.setState({ locationDialogVisible: true });
        // return;
        this.handleLogin();
    }

    handleLogin(countryID = null, emailVerificationToken = null) {
        const { email, password } = this.state;
        const user = { email, password };
        if (countryID != null) {
            user.country = countryID;
        }
        if (emailVerificationToken != null) {
            user.emailVerificationToken = emailVerificationToken;
        }

        this.setState({ showProgress: true });

        requester.login(user, null).then(res => {
            console.log("requester.login", res);
            this.setState({ showProgress: false });
            if (res.success) {
                res.body.then(data => {
                    AsyncStorage.setItem(`${domainPrefix}.auth.locktrip`, data.Authorization);
                    // TODO: Get first name + last name from response included with Authorization token (Backend)
                    AsyncStorage.setItem(`${domainPrefix}.auth.username`, user.email);
                    // this.props.navigation.navigate('MainScreen');
                    let resetAction = StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                            NavigationActions.navigate({routeName: 'MainScreen'})
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);

                });
            } else {
                res.errors.then(data => {
                    const { errors } = data;
                    console.log("error", errors);
                    if (errors.hasOwnProperty('CountryNull')) {
                        this.setState({ locationDialogVisible: true });
                    }
                    else if (errors.hasOwnProperty('EmailNotVerified')) {
                        this.setState({ verificationDialogVisible: true });
                    }
                    else {
                        Object.keys(errors).forEach((key) => {
                            if (typeof key !== 'function') {
                                // Toast.showWithGravity(errors[key].message, Toast.SHORT, Toast.BOTTOM);
                                console.log('Error logging in  :', errors[key].message);
                                alert(errors[key].message);
                            }
                        });
                    }
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

        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <View style={styles.container}>
                    <View style={styles.chatToolbar}>

                        <TouchableOpacity onPress={this.onBackPress}>
                            <Image style={styles.btn_backImage} source={require('../../../../assets/icons/icon-back-white.png')} />
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
                            style={styles.buttonWrapper}
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
                            source={require('../../../../assets/get-started-white-outline.png')}
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

                       
                    <LoginLocationDialog
                        countries = { this.props.countries }
                        title = { 'Select Currency' }
                        visible = { this.state.locationDialogVisible }
                        okLabel = { 'OK' }
                        onOk = { countryID => {
                            console.log("select country", countryID);
                            this.setState({ locationDialogVisible: false });
                            this.handleLogin(countryID);
                        }}
                    />

                    <LoginEmailVerifyDialog
                        title = { 'Email Verification' }
                        visible = { this.state.verificationDialogVisible }
                        okLabel = { 'Verify' }
                        cancelLabel = { 'Already Verified' }
                        onCancel = { () => {
                            this.setState({ verificationDialogVisible: false });
                        }}
                        onOk = { (emailToken) => {
                            console.log("email verify", emailToken);
                            this.setState({ verificationDialogVisible: false });
                            this.handleLogin(null, emailToken);
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    }
}

let mapStateToProps = (state) => {
    return {
        countries: state.country.countries
    };
}

export default connect(mapStateToProps)(Login);