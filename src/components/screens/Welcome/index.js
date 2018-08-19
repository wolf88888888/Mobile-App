import {
    AsyncStorage,
    Text,
    View,
    StatusBar
} from 'react-native';
import React, { Component } from 'react';

import Button from '../../atoms/Button';
import GetStartedImage from '../../atoms/GetStartedImage';
import Image from 'react-native-remote-svg';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import SplashPNG from '../../../assets/png/locktrip_logo.png';
import { domainPrefix } from '../../../config';
import requester from '../../../initDependencies';
import styles from './styles';

import SplashScreen from 'react-native-smart-splash-screen';
const FBSDK = require('react-native-fbsdk');
const { LoginManager, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;


class Welcome extends Component {
    static self;

    constructor(props) {
        super(props);
        this.state = {
            showProgress: false
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

    tryLogin(fbInfo) {
        this.setState({ showProgress: true });
        requester.login({email:fbInfo.email, password:fbInfo.id+"!a123"}, null).then(res => {
            this.setState({ showProgress: false });
            if (res.success) {
                console.log("Success");
                res.body.then(data => {
                    console.log(data);
                    AsyncStorage.setItem(`${domainPrefix}.auth.locktrip`, data.Authorization);
                    // TODO: Get first name + last name from response included with Authorization token (Backend)
                    AsyncStorage.setItem(`${domainPrefix}.auth.username`, fbInfo.email);
                    this.props.navigation.navigate('MainScreen');
                });
            } else {
                res.errors.then(data => {
                    const { errors } = data;
                    Object.keys(errors).forEach((key) => {
                        if (typeof key !== 'function') {
                            if (errors[key].message == "Incorrect password") {
                                alert("You already registered using email, so please try to login using email.");
                            }
                            else {
                                Welcome.self.tryRegister(fbInfo);
                            }
                            // alert(errors[key].message);
                            console.log('Error logging in  :', errors[key].message);
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

    tryRegister(fbInfo) {
        this.props.navigation.navigate('Terms', 
                {
                    firstName:fbInfo.first_name, 
                    lastName:fbInfo.last_name, 
                    email:fbInfo.email,
                    userWantsPromo: true, 
                    password:fbInfo.id+"!a123"
                }
            );
    }

    doLoginViaFb(data) {
        let accessToken = data.accessToken
        responseInfoCallback = (error, result) => {
            if (error) {
                alert('Error fetching data: ' + error.toString());
            }
            else {
                Welcome.self.tryLogin(result);
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
                </View>

                <Text style={styles.finePrintText}>
                    By tapping Log In, Continue or Create Account, I agree to LockChain's Terms of Service, Payments Terms of Service and Privacy Policy.
                </Text>

                <GetStartedImage />

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

export default Welcome;
