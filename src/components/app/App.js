import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen'

import TopSpacer from '../common/TopSpacer';

export default class App extends React.Component {
  componentDidMount () {
    //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TopSpacer />

        <View style={styles.appContainer}>
          <Text style={styles.text}>LockChain</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#DA7B61',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff'
  }
});
