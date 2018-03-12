import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';

import { validateName, validateEmail } from '../utils/validation';

import GoBack from '../common/GoBack';
import SmartInput from '../common/SmartInput';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      userDoesAgree: true
    }
  }

  render() {
    const { firstName, lastName, email, userDoesAgree } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <GoBack
          onPress={() => navigate('Welcome')}
          icon="arrowLeft" />

        <View style={styles.main}>
          <View style={styles.titleView}><Text style={styles.titleText}>Create Account</Text></View>

          <View style={styles.inputView}>
            <SmartInput
              autoCorrect={false}
              value={firstName}
              onChangeText={(firstName) => this.setState({ firstName })}
              placeholder='First Name'
              placeholderTextColor='#fff'
              rightIcon={validateName(firstName) ? 'check' : null} />
          </View>

          <View style={styles.inputView}>
            <SmartInput
              autoCorrect={false}
              value={lastName}
              onChangeText={(lastName) => this.setState({ lastName })}
              placeholder='Last Name'
              placeholderTextColor='#fff'
              rightIcon={validateName(lastName) ? 'check' : null} />
          </View>

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

          <View style={styles.finePrintView}>
            <Text style={styles.finePrintText}>I'd like to receive promotional communications, including discounts, surveys and inspiration via email, SMS and phone.</Text>
            <Switch
              onTintColor='#e4a193'
              tintColor='#e4a193'
              value={userDoesAgree}
              onValueChange={(userDoesAgree) => this.setState({ userDoesAgree })}/>
          </View>

          <View style={styles.nextButtonView}>
            <TouchableOpacity
              disabled={!validateName(firstName) || !validateName(lastName) || !validateEmail(email) || !userDoesAgree}
              onPress={() => navigate('CreatePassword')}>
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

CreateAccount.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default CreateAccount;

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
    margin: 11.5,
    paddingLeft: 18,
    paddingRight: 18
  },
  finePrintView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 18
  },
  finePrintText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'FuturaStd-Light',
    maxWidth: 280
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
