import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import GoBack from '../../atoms/GoBack';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        walletAddress: '0x32Be343B94f860124dC4fEe278FDCBD38C102D855412'
    }
  }

  componentDidMount() {
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <GoBack
            onPress={() => navigate('EXPLORE')}
            icon="arrowLeft"
            color="black"
        />

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
                <TouchableOpacity onPress={() => navigate('ViewProfile')} style={styles.navItem}>
                    <Text style={styles.navItemText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('ViewProfile')} style={styles.navItem}>
                    <Text style={styles.navItemText}>Edit Profile</Text>
                    <Image resizeMode="stretch" source={require('../../../assets/svg/Profile/icon-user.svg')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('ViewProfile')} style={styles.navItem}>
                    <Text style={styles.navItemText}>Notifications</Text>
                    <Image resizeMode="stretch" source={require('../../../assets/svg/Profile/icon-bell.svg')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('ViewProfile')} style={styles.navItem}>
                    <Text style={styles.navItemText}>Payment Methods</Text>
                    <Image resizeMode="stretch" source={require('../../../assets/svg/Profile/icon-payment.svg')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('ViewProfile')} style={styles.navItem}>
                    <Text style={styles.navItemText}>Currency</Text>
                    <Text style={styles.navCurrency}>USD</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('ViewProfile')} style={styles.navItem}>
                    <Text style={styles.navItemText}>Switch to Hosting</Text>
                    <Image resizeMode="stretch" source={require('../../../assets/svg/Profile/icon-switch.svg')} style={styles.navIcon} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f1f3'
  },
  text: {
    color: '#000'
  },
  cardBox: {
    backgroundColor: '#da7b60',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 15
  },
  walletAddres: {
    color: '#fff',
    fontFamily: 'FuturaStd-Light',
    fontSize: 11.5,
    margin: 20,
    marginTop: 10,
    marginBottom: 30
  },
  logo: {
      width: 80,
      height: 55,
      borderRadius: 10,
      marginLeft: 10
  },
  logoBackground: {
      position: 'absolute',
      bottom: -5,
      left: -35,
      opacity: 0.1,
      width: '60%',
      height: '60%'
  },
  balanceLabel: {
      fontSize: 10,
      color: '#fff',
      marginLeft: 20,
      fontFamily: 'FuturaStd-Light'
  },
  balanceText: {
      fontSize: 20,
      color: '#fff',
      marginLeft: 20,
      fontFamily: 'FuturaStd-Light'
  },
  addMore: {
      position: 'absolute',
      bottom: 15,
      right: 20,
      width: 43,
      height: 43,
      borderRadius: 50,
      backgroundColor: '#213742',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  },
  addMorePlus: {
      color: '#fff',
      fontSize: 16
  },
  copyBox: {
      backgroundColor: '#fff',
      marginLeft: 40,
      marginRight: 40,
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
  },
  copyText: {
      fontFamily: 'FuturaStd-Light',
      fontSize: 13,
      color: '#000'
  },
  navItem: {
      borderBottomWidth: 0.5,
      borderColor: '#e2e4e3',
      padding: 10,
      paddingBottom: 20,
      paddingTop: 20,
      marginLeft: 10,
      marginRight: 10,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row'
  },
  navIcon: {
    width: 20,
    height: 23
  },
  navItemText: {
    fontFamily: 'FuturaStd-Light',
    fontSize: 17,
  },
  navCurrency: {
      color: '#da7b60',
      fontFamily: 'FuturaStd-Light',
      fontSize: 18
  }
});
