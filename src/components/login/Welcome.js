import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';

import GoBack from '../common/GoBack';

class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GoBack icon="times" />

        <View style={styles.main}>
          <Image
            source={require('../../assets/splash.png')}
            style={styles.splashImage} />
          <Text style={styles.titleText}>Welcome to LockChain</Text>

          <View style={styles.loginButton}>
            <Text style={styles.buttonText}>Log In</Text>
          </View>

          <View style={styles.facebookButton}>
            <Text style={styles.buttonIcon}><FontAwesome>{Icons.facebookF}</FontAwesome></Text>
            <Text style={styles.buttonText}>
              Continue with Facebook
            </Text>
          </View>

          <Text style={styles.createAccountText}>Create an Account</Text>

          <Text style={styles.finePrintText}>By tapping Log In, Continue or Create Account, I agree to LockChain's Terms of Service, Payments Terms of Service and Privacy Policy.</Text>
        </View>

        <View style={styles.lowOpacity}>
          <Image
            source={require('../../assets/get-started-white-outline.svg')}
            style={styles.getStartedImage} />
        </View>
      </View>
    );
  }
}

Welcome.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#DA7B61',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  splashImage: {
    width: 100,
    height: 78,
    marginTop: 4
  },
  titleText: {
    color: '#fff',
    fontSize: 25,
    marginTop: -1,
    fontFamily: 'FuturaStd-Light'
  },
  loginButton: {
    height: 50,
    width: 280,
    borderColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 25,
    marginTop: 62,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'FuturaStd-Light',
    position: 'absolute',
    left: 36,
    top: 15
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'FuturaStd-Light'
  },
  facebookButton: {
    height: 50,
    width: 280,
    backgroundColor: '#273842',
    borderRadius: 25,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAccountText: {
    marginTop: 30,
    color: '#fff',
    fontSize: 17,
    fontFamily: 'FuturaStd-Light'
  },
  finePrintText: {
    marginTop: 60,
    marginLeft: 10,
    marginRight: 10,
    color: '#fff',
    fontSize: 13,
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
