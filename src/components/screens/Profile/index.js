import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import GoBack from '../../atoms/GoBack';
import styles from './styles';

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
    // const { locAddress } = this.props.userInfo;
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

// function mapStateToProps(state) {
//     const { paymentInfo, userInfo } = state;
//     return {
//         paymentInfo,
//         userInfo
//     };
// }
