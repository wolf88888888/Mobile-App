import React, { Component } from 'react';
import { StatusBar, AsyncStorage, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';

import { RootNavigator, LoginNavigator } from '../../routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginComplete: false
    };

    this.onLoginComplete = this.onLoginComplete.bind(this);
  }

  componentDidMount () {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 500,
      delay: 100,
    });

    AsyncStorage.getAllKeys().then(keys => console.log('~~~keys:', keys));
  }

  onLoginComplete() {
    this.setState({ isLoginComplete: true });
  }

  onLogOut() {
    this.setState({ isLoginComplete: false });
  }

  renderNavigation() {
    if (this.state.isLoginComplete) return <RootNavigator screenProps={{ onLogOut: this.onLogOut }} />;
    else return <LoginNavigator screenProps={{ onLoginComplete: this.onLoginComplete }} />
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
