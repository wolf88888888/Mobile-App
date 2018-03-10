import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import { validateEmail, validatePassword } from '../utils/validation';

import GoBack from '../common/GoBack';
import SmartInput from '../common/SmartInput';
import {Icons} from "react-native-fontawesome";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    const { email, password } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <GoBack
          onPress={() => navigate('Welcome')}
          icon="arrowLeft" />

        <View style={styles.main}>
          <View style={styles.titleView}><Text style={styles.titleText}>Login</Text></View>

          <View style={styles.inputView}>
            <SmartInput
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              value={email}
              onChangeText={(email) => this.setState({ email })}
              placeholder='Email'
              placeholderTextColor='#fff'
              rightIcon={validateEmail(email) ? 'check' : null} />
          </View>

          <View style={styles.inputView}>
            <SmartInput
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize='none'
              value={password}
              onChangeText={(password) => this.setState({ password })}
              placeholder='Password'
              placeholderTextColor='#fff' />
          </View>

          <TouchableOpacity
            disabled={!validateEmail(email) || !validatePassword(password)}
            onPress={() => navigate('Home')}>
            <View style={styles.LogInButton}>
              <Text style={styles.buttonText}>
                Log In
              </Text>
            </View>
          </TouchableOpacity>
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

Login.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#DA7B61',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  titleView: {
    display: 'flex',
    width: '100%',
    marginTop: 16,
    marginLeft: 36,
    marginBottom: 16
  },
  titleText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'FuturaStd-Light'
  },
  inputView: {
    width: '100%',
    margin: 11,
    paddingLeft: 18,
    paddingRight: 18
  },
  LogInButton: {
    height: 50,
    width: 280,
    backgroundColor: '#273842',
    borderRadius: 25,
    marginTop: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
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
