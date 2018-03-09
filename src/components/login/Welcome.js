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
            <Text style={styles.buttonText}>
              <FontAwesome>{Icons.facebookF}</FontAwesome>
              Continue with Facebook
            </Text>
          </View>
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
    height: 80,
    marginTop: 4
  },
  titleText: {
    color: '#fff',
    fontSize: 26,
    marginTop: -8,
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
  buttonText: {
    color: '#fff',
    fontSize: 17
  },
  facebookButton: {
    height: 50,
    width: 280,
    backgroundColor: '#222',
    borderRadius: 25,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lowOpacity: {
    opacity: 0.3
  },
  getStartedImage: {
    width: 400,
    height: 80
  }
});
