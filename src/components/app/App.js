import React, { Component } from 'react';
import { StatusBar, AsyncStorage, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';

import { domainPrefix } from "../../config";
import { RootNavigator, LoginNavigator } from '../../routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginComplete: undefined
    };

    this.onLoginComplete = this.onLoginComplete.bind(this);
  }

  componentDidMount () {
    AsyncStorage.getAllKeys().then(keys => {
      if (keys.includes(`${domainPrefix}.auth.lockchain`) && keys.includes(`${domainPrefix}.auth.username`))
        this.setState({ isLoginComplete: true });
      else this.setState({ isLoginComplete: false });
    });

    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 500,
      delay: 800,
    });
  }

  onLoginComplete() {
    this.setState({ isLoginComplete: true });
    AsyncStorage.getAllKeys().then(keys => console.log('~~~keys:', keys));
  }

  onLogOut() {
    AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
    this.setState({ isLoginComplete: false });
  }

  renderNavigation() {
    if (typeof this.state.isLoginComplete === 'undefined') return null;
    else if (this.state.isLoginComplete) return <RootNavigator screenProps={{ onLogOut: this.onLogOut.bind(this) }} />;
    else return <LoginNavigator screenProps={{ onLoginComplete: this.onLoginComplete.bind(this) }} />
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="rgba(0,0,0,0)"
          translucent={true}
          barStyle="light-content" />

        {this.renderNavigation()}
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
