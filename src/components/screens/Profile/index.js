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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        info: {},
        walletAddress: '',
        balance:0
    }
  }

  componentDidMount() {
      getUserInfo()
      .then(res => res.response.json())
      .then(parsedResp => {
          this.setState({
              info: parsedResp,
              walletAddress : parsedResp.locAddress == null? '': parsedResp.locAddress,
          });

          console.log(parsedResp.locAddress);
          if (parsedResp.locAddress != null && parsedResp.locAddress != '') {

            Wallet.getBalance(0x6774563a87464b4d2fe6cef2078d7a9b394e1a21).then(x => {
                const ethBalance = x / (Math.pow(10, 18));
                console.log("ethBalance");
                console.log(ethBalance);
                Wallet.getTokenBalance(0x6774563a87464b4d2fe6cef2078d7a9b394e1a21).then(y => {
                    const locBalance = y / (Math.pow(10, 18));
                    console.log("locBalance");
                    console.log(locBalance);
                    // const { firstName, lastName, phoneNumber, email, locAddress } = res;
                    // this.props.dispatch(setIsLogged(true));
                    // this.props.dispatch(setUserInfo(firstName, lastName, phoneNumber, email, locAddress, ethBalance, locBalance));
                });
            });
          }
      })
      .catch(err => {
          console.log(err);
      });


  }

  render() {
      const { navigate } = this.props.navigation;
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
                        <Text style={styles.walletAddres}>{this.state.walletAddress}</Text>
                    </View>
                    <Text style={styles.balanceLabel}>Current Balance</Text>
                    <View style={{width: '100%'}}>
                        <Text style={styles.balanceText}>5412.00 LOC / $24129</Text>
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
