import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import styles from './styles';
class PaymentMethods extends Component {
  constructor(props) {
    super(props);
  }   

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>

          <View style={styles.backButton}>
            <TouchableOpacity onPress={() => navigate('PROFILE')}>
              <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-black.png')}/>
            </TouchableOpacity>
            <Text style={styles.titleText}>Payment Methods</Text>
          </View>

          <Text style={styles.navItemText}>Set up a payment method</Text>
          <Text style={styles.navText}>Use your payment methods to make purchases on LockChain</Text>
          
          <View style={styles.searchButtonView}>
            <View style={{backgroundColor: '#DA7B61', height: 50, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigate('AddPaymentMethod')}>
                <View>
                  <Text style={styles.searchButtonText}>Add payment method</Text>
                </View>
          </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}

PaymentMethods.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default PaymentMethods;
