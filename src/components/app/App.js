import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { AppNavigator } from '../../routes';

class App extends Component {
render() {
    return (
      <View style={{ flex:1 }}>
        <StatusBar
          backgroundColor="rgba(0,0,0,0)"
          translucent={true}
          barStyle="light-content" />

        <AppNavigator />
      </View>
    );
  }
}

export default App;