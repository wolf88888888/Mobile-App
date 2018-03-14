import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';

import { validatePassword, validateConfirmPassword } from '../../utils/validation';

import GoBack from '../common/GoBack';
import SmartInput from '../common/SmartInput';

class CreatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: ''
    };
  }

  render() {
    const { password, confirmPassword } = this.state;
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <GoBack
          onPress={() => navigate('CreateAccount')}
          icon="arrowLeft" />

        <View style={styles.main}>
          <View style={styles.titleView}><Text style={styles.titleText}>Create Password</Text></View>

          <Text style={styles.finePrintText}>Your password must be 8 or more characters long. Do not use any common passwords, repetition or sequences. Try making it longer or adding symbols, like !, # or %.</Text>

          <View style={styles.inputView}>
            <SmartInput
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize='none'
              value={password}
              onChangeText={(password) => this.setState({ password })}
              placeholder='Password'
              placeholderTextColor='#fff'
              rightIcon={validatePassword(password) ? 'check' : null} />
          </View>

          <View style={styles.subTitleView}><Text style={styles.titleText}>Please Confirm Your Password</Text></View>

          <View style={styles.inputView}>
            <SmartInput
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize='none'
              value={confirmPassword}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
              placeholder='Password'
              placeholderTextColor='#fff'
              rightIcon={validateConfirmPassword(password, confirmPassword) ? 'check' : null} />
          </View>

          <View style={styles.nextButtonView}>
            <TouchableOpacity
              disabled={!validatePassword(password) || !validateConfirmPassword(password, confirmPassword)}
              onPress={() => navigate('Terms', { ...params, password })}>
              <View style={styles.nextButton}>
                <Text style={styles.buttonText}>
                  <FontAwesome>{Icons.arrowRight}</FontAwesome>
                </Text>
              </View>
            </TouchableOpacity>
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

CreatePassword.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default CreatePassword;

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
  finePrintText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'FuturaStd-Light',
    margin: 10,
    marginBottom: 15
  },
  inputView: {
    width: '100%',
    margin: 11.5,
    paddingLeft: 18,
    paddingRight: 18
  },
  subTitleView: {
    display: 'flex',
    width: '100%',
    marginTop: 16,
    marginLeft: 36
  },
  nextButtonView: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: 18,
    marginTop: 36
  },
  nextButton: {
    height: 50,
    width: 50,
    backgroundColor: '#273842',
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingLeft: 2,
    paddingBottom: 2
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },
  lowOpacity: {
    opacity: 0.3
  },
  getStartedImage: {
    width: 400,
    height: 80
  }
});
