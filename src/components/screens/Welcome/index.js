import PropTypes from 'prop-types';
import React from 'react';
import {
    Text,
    View,
    BackHandler
} from 'react-native';
import Image from 'react-native-remote-svg';

import GoBack from '../../atoms/GoBack';
import Button from '../../atoms/Button';

import SplashPNG from '../../../assets/svg/locktrip_logo.svg';
import styles from './styles';
import GetStartedImage from '../../atoms/GetStartedImage';

const propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

const Welcome = ({
    navigation: { navigate }
}) => (
    <View style={styles.container}>
        <GoBack icon="times" onPress={BackHandler.exitApp} />
        <Image source={SplashPNG} style={styles.splashImage} />
        <Text style={styles.titleText}>Welcome</Text>
        <View style={styles.buttonCollectionWrap}>
            <Button
                onPress={() => navigate('Login')}
                text="Log In"
                wrapStyle={styles.logInButton}
            />
            <Button
                wrapStyle={styles.facebookButton}
                text="Continue with Facebook"
                onPress={() => navigate('App')}
            />
            <Button
                wrapStyle={styles.createAccountButton}
                onPress={() => navigate('CreateAccount')}
                text="Create an Account"
            />
        </View>
        <Text style={styles.finePrintText}>
            By tapping Log In, Continue or Create Account, I agree to LockChain's Terms of Service, Payments Terms of Service and Privacy Policy.
        </Text>
        <GetStartedImage />
    </View>
);

Welcome.propTypes = propTypes;

export default Welcome;
