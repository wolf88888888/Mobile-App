import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DA7B61',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff'
  }
});
