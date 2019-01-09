import {
    AsyncStorage,
    Text,
    View,
    StatusBar,
    Linking
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../atoms/Button';
import GetStartedImage from '../../atoms/GetStartedImage';
import Image from 'react-native-remote-svg';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import SplashPNG from '../../../assets/png/locktrip_logo.png';
import { domainPrefix, basePath } from '../../../config';
import requester from '../../../initDependencies';
import styles from './styles';
import LoginLocationDialog from '../../atoms/LoginLocationDialog'

import SplashScreen from 'react-native-smart-splash-screen';
const FBSDK = require('react-native-fbsdk');
const { LoginManager, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;

class Welcome extends Component {
    static self;

    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            locationDialogVisible: false,
        }
        Welcome.self = this;
    }

    componentDidMount() {
        console.log("AppLoading - componentDidMount")
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 0,
            delay: 100
        });
    }

    tryLogin(countryID = null) {
        console.log("fb info", this.fbInfo);
        this.setState({ showProgress: true });
        if (this.fbInfo.email != null) {
            const user = { 
                email : this.fbInfo.email, 
                password : this.fbInfo.id+"!a123" };
            if (countryID != null) {
                user.country = countryID;
            }
            
            requester.login(user, null).then(res => {
                this.setState({ showProgress: false });
                // if (countryID != null) {
                if (res.success) {
                    console.log("Success");
                    res.body.then(data => {
                        console.log(data);
                        AsyncStorage.setItem(`${domainPrefix}.auth.locktrip`, data.Authorization);
                        // TODO: Get first name + last name from response included with Authorization token (Backend)
                        AsyncStorage.setItem(`${domainPrefix}.auth.username`, this.fbInfo.email);
                        this.props.navigation.navigate('MainScreen');
                    });
                } else {
                    res.errors.then(data => {
                        const { errors } = data;
                        
                        if (errors.hasOwnProperty('CountryNull')) {
                            this.setState({ locationDialogVisible: true });
                        }
                        else {
                            Object.keys(errors).forEach((key) => {
                                if (typeof key !== 'function') {
                                    if (errors[key].message == "Incorrect password") {
                                        alert("You already registered using email, so please try to login using email.");
                                    }
                                    else {
                                        Welcome.self.tryRegister();
                                    }
                                    // alert(errors[key].message);
                                    console.log('Error logging in  :', errors[key].message);
                                }
                            });
                        }
                    });
                }
                // this.setState({ locationDialogVisible: true });
            })
            .catch(err => {
                this.setState({ showProgress: false });
                alert('Cannot login, Please check network connection.');
                console.log(err);
            });
        }
        else {
            const user = { 
                authId: "fid"+this.fbInfo.id, 
                password: this.fbInfo.id+"!a123", 
                authProvider: "facebook" };
            if (countryID != null) {
                user.country = countryID;
            }
            console.log("uerer-------------", user);
            requester.login(user, null).then(res => {
                console.log("login by auth_id", res);
                this.setState({ showProgress: false });
                if (res.success) {
                    console.log("Success");
                    res.body.then(data => {
                        console.log(data);
                        AsyncStorage.setItem(`${domainPrefix}.auth.locktrip`, data.Authorization);
                        // // TODO: Get first name + last name from response included with Authorization token (Backend)
                        // AsyncStorage.setItem(`${domainPrefix}.auth.username`, fbInfo.email);
                        this.props.navigation.navigate('MainScreen');
                    });
                } else {
                    res.errors.then(data => {
                        const { errors } = data;
                        
                        if (errors.hasOwnProperty('CountryNull')) {
                            this.setState({ locationDialogVisible: true });
                        }
                        else {
                            Object.keys(errors).forEach((key) => {
                                if (typeof key !== 'function') {
                                    if (errors[key].message == "Incorrect password") {
                                        alert("You already registered using email, so please try to login using email.");
                                    }
                                    else {
                                        Welcome.self.tryRegister();
                                    }
                                    // alert(errors[key].message);
                                    console.log('Error logging in  :', errors[key].message);
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
    }

    tryRegister() {
        if (this.fbInfo.email) {
            requester.getEmailFreeResponse(this.fbInfo.email).then(res => {
                res.body.then(data => {
                    if (data.exist) {
                        Toast.showWithGravity('Already exist email, please try with another email.', Toast.SHORT, Toast.BOTTOM);
                    } else {
                        this.props.navigation.navigate('CreateAccount', 
                            {
                                firstName:this.fbInfo.first_name, 
                                lastName:this.fbInfo.last_name, 
                                email:this.fbInfo.email,
                                userWantsPromo: true, 
                                password:this.fbInfo.id+"!a123",
                                authId:"fid" + this.fbInfo.id,
                                authProvider: "facebook",
                            }
                        );
                    }
                });
            });
        }
        else {
            this.props.navigation.navigate('CreateAccount', 
                {
                    firstName:this.fbInfo.first_name, 
                    lastName:this.fbInfo.last_name, 
                    email:'',
                    userWantsPromo: true, 
                    password:this.fbInfo.id+"!a123",
                    authId:"fid" + this.fbInfo.id,
                    authProvider: "facebook",
                }
            ); 
        }
    }

    doLoginViaFb(data) {
        let accessToken = data.accessToken
        responseInfoCallback = (error, result) => {
            if (error) {
                alert('Error fetching data: ' + error.toString());
            }
            else {
                this.fbInfo = result;
                Welcome.self.tryLogin();
            }
        }

        const infoRequest = new GraphRequest(
            '/me',
            {
                accessToken: accessToken,
                parameters: {
                    fields: {
                        string: 'email,name,first_name,last_name,picture'
                    }
                }
            },
            responseInfoCallback
        );
        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();
    }

    gotoFB = () =>  {
        LoginManager.logInWithReadPermissions(['public_profile','email']).then(
            function(result) {
                if (result.isCancelled) {
                    //alert('Login cancelled');
                }
                else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            Welcome.self.doLoginViaFb(data)
                        }
                    )
                }
            },
            function(error) {
                alert('Login fail with error: ' + error);
            }
        );
    }

    gotoLogin = () => {
        this.props.navigation.navigate('Login');
    }

    gotoSignup = () => {
        this.props.navigation.navigate('CreateAccount');
    }

    gotoRecover = () => {
        // TODO: Move this to a native version - two calls: (1) send e-mail, (2) send token from e-mail
        Linking.openURL(`${basePath}recover`);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent
                    barStyle="light-content"
                />

                <Image source={SplashPNG} resizeMode='contain' style={styles.splashImage} />

                <Text style={styles.titleText}>Welcome</Text>

                <View style={styles.buttonCollectionWrap}>
                    <Button
                        onPress={ this.gotoLogin }
                        text="Log In"
                        wrapStyle={styles.logInButton}
                    />
                    <Button
                        wrapStyle={styles.facebookButton}
                        text="Continue with Facebook"
                        onPress={ this.gotoFB }
                    />
                    <Button
                        wrapStyle={styles.createAccountButton}
                        onPress={ this.gotoSignup }
                        text="Create an Account"
                    />
                    <Button
                        wrapStyle={styles.recoverButton}
                        onPress={ this.gotoRecover }
                        text="Recover"
                    />
                </View>

                <Text style={styles.finePrintText}>
                    By tapping Log In, Continue or Create Account, I agree to LockChain's Terms of Service, Payments Terms of Service and Privacy Policy.
                </Text>

                <GetStartedImage />

                <LoginLocationDialog
                    countries = { this.props.countries }
                    title = { 'Select Currency' }
                    visible = { this.state.locationDialogVisible }
                    okLabel = { 'OK' }
                    onOk = { countryID => {
                        console.log("select country", countryID);
                        this.setState({ locationDialogVisible: false });
                        this.tryLogin(countryID);
                    }}
                />
                
                <ProgressDialog
                   visible={this.state.showProgress}
                   title=""
                   message="Login..."
                   animationType="slide"
                   activityIndicatorSize="large"
                   activityIndicatorColor="black"/>
            </View>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        countries: state.country.countries
    };
}

export default connect(mapStateToProps)(Welcome);
