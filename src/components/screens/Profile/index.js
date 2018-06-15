import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import BackButton from '../../atoms/BackButton';
import { getUserInfo } from '../../../utils/requester';
import { Wallet } from '../../../services/blockchain/wallet';
import styles from './styles';
import { domainPrefix } from '../../../config';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        info: {},
        walletAddress: '',
        locBalance:0,
        currentCurrency:'EUR',
        currencyLocPrice:0
    }
  }

    componentDidMount() {
        AsyncStorage.getItem('currentCurrency', (err, result) => {
            if (result) {
                console.log("currentCurrencycurrentCurrency " + result);
                this.setState({ currentCurrency: result});
            }
            if (err) console.error(`Error currencyLocPrice: ${err}`);
        });

        AsyncStorage.getItem('currencyLocPrice', (err, result) => {
            console.log("currencyLocPricecurrencyLocPrice " + result);
            if (result) {
                this.setState({ currencyLocPrice: result});
            }
            if (err) console.error(`Error currencyLocPrice: ${err}`);
        });

        getUserInfo()
        .then(res => res.response.json())
        .then(parsedResp => {
            this.setState({
                info: parsedResp,
                walletAddress : parsedResp.locAddress == null? '': parsedResp.locAddress,
            });

            console.log(parsedResp.locAddress);
            if (parsedResp.locAddress != null && parsedResp.locAddress != '') {
                console.log("start ");
                // Wallet.getBalance(parsedResp.locAddress).then(x => {
                //     const ethBalance = x / (Math.pow(10, 18));
                //     //var json = JSON.stringify(myObj);
                //     console.log("ethBalance");
                //     // console.log(bigNumberToString(x, 10));
                //     console.log(ethBalance);
                // });
                Wallet.getTokenBalance(parsedResp.locAddress).then(y => {
                    const locBalance = y / (Math.pow(10, 18));
                    this.setState({locBalance: locBalance});
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidCatch(errorString, errorInfo) {
        console.log("componentDidCatch");
    }

  render() {
      const { navigate } = this.props.navigation;
      const {currentCurrency, currencyLocPrice, locBalance, walletAddress} = this.state;

      console.log("currency: " + currentCurrency);
      console.log("locPrice: " + currencyLocPrice);
      let price = locBalance * currencyLocPrice;
      var displayPrice = '';
      if (currentCurrency == "EUR") {
          displayPrice = '€';
      }
      else if (currentCurrency == "USD") {
          displayPrice = '$';
      }
      else if (currentCurrency == "GDP") {
          displayPrice = '£';
      }
      displayPrice += price.toFixed(2);

      return (
          <View style={styles.container}>
              <View style={styles.titleConatiner}>
                  <BackButton style={styles.closeButton} onPress={() => navigate('EXPLORE')}/>
              </View>

            <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                <View style={styles.cardBox}>
                    <Image
                        source={require('../../../assets/splash.png')}
                        style={styles.logo} />
                    <View style={{width: '100%'}}>
                        <Text style={styles.walletAddres}>{walletAddress}</Text>
                    </View>
                    <Text style={styles.balanceLabel}>Current Balance</Text>
                    <View style={{width: '100%'}}>
                        <Text style={styles.balanceText}>{locBalance.toFixed(2)} LOC / {displayPrice}</Text>
                    </View>
                    <Image
                        source={require('../../../assets/splash.png')}
                        style={styles.logoBackground} />
                    <View style={styles.addMore}>
                        <FontAwesome style={styles.addMorePlus}>{Icons.plus}</FontAwesome>
                    </View>
                </View>
                <TouchableOpacity onPress={() => { Clipboard.setString(this.state.walletAddress) }}>
                    <View style={styles.copyBox}>
                        <Text style={styles.copyText}>Copy your wallet address to clipboard</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity onPress={() => navigate('SimpleUserProfile')} style={styles.navItem}>
                        <Text style={styles.navItemText}>View Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('EditUserProfile')} style={styles.navItem}>
                        <Text style={styles.navItemText}>Edit Profile</Text>
                        <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-user.png')} style={styles.navIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('ViewProfile')} style={styles.navItem}>
                        <Text style={styles.navItemText}>Notifications</Text>
                        <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-bell.png')} style={styles.navIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('ViewProfile')} style={styles.navItem}>
                        <Text style={styles.navItemText}>Payment Methods</Text>
                        <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-payment.png')} style={styles.navIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('ViewProfile')} style={styles.navItem}>
                        <Text style={styles.navItemText}>Currency</Text>
                        <Text style={styles.navCurrency}>USD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('ViewProfile')} style={styles.navItem}>
                        <Text style={styles.navItemText}>Switch to Hosting</Text>
                        <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-switch.png')} style={styles.navIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
                        this.props.navigation.navigate('Login');
                    }} style={styles.navItem}>
                        <Text style={styles.navItemText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
  }
}

Profile.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default Profile;
