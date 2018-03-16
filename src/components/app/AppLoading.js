import React, { Component } from 'react';
import { AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';

import { domainPrefix } from "../../config";

class AppLoading extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 150,
      delay: 100,
    });
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const isLoggedIn =  keys.includes(`${domainPrefix}.auth.lockchain`) &&
                        keys.includes(`${domainPrefix}.auth.username`);
    console.log('~~~isLoggedIn',isLoggedIn);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(isLoggedIn ? 'App' : 'Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="rgba(0,0,0,0)"
          translucent={true}
          barStyle="light-content" />
      </View>
    );
  }
}

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DA7B61'
  }
});
