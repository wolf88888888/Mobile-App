import PropTypes from 'prop-types';
import React from 'react';
import {
    Text,
    View
} from 'react-native';
import Image from 'react-native-remote-svg';

import GoBack from '../../atoms/GoBack';
import Button from '../../atoms/Button';

import SplashPNG from '../../../assets/splash.png';
import styles from './styles';

const propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

const Welcome = ({
    navigation: { navigate }
}) => (
    <View style={styles.container}>
        <GoBack />
        <Image source={SplashPNG} style={styles.splashImage} />
        <Text style={styles.titleText}>Welcome to LockTrip</Text>
        <View style={styles.buttonCollectionWrap}>
            <Button
                onPress={() => navigate('Login')}
                text="Log In"
                wrapStyle={styles.logInButton}
            />
            <Button
                wrapStyle={styles.facebookButton}
                text="Continue with Facebook"
            />
            <Button
                wrapStyle={styles.createAccountButton}
                onPress={() => navigate('CreateAccount')}
                text="Create an Account"
            />
        </View>
        <Text style={styles.finePrintText}>
            By tapping Log In, Continue or Create Account, I agree to LockChain's Terms of Service,
            Payments Terms of Service and Privacy Policy.
        </Text>
        <View style={styles.lowOpacity}>
            <Image
                source={require('../../../assets/get-started-white-outline.svg')}
                style={styles.getStartedImage}
            />
        </View>
    </View>
);

Welcome.propTypes = propTypes;

export default Welcome;

