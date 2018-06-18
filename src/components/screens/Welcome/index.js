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

import SplashPNG from '../../../assets/png/locktrip_logo.png';
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
        <Image source={SplashPNG} resizeMode='contain' style={styles.splashImage} />
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

// import PropTypes from 'prop-types';
// import React, {Component} from 'react';
// import {
//     Text,
//     View,
//     BackHandler
// } from 'react-native';
// export default class Welcome extends Component{
//     render() {
//         return (
//           <View>
//             <Text>
//               If you like React on the web, you'll like React Native.
//             </Text>
//             <Text>
//               You just use native components like 'View' and 'Text',
//               instead of web components like 'div' and 'span'.
//             </Text>
//           </View>
//         );
//       }
// };
