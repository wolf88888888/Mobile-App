import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import TopSpacer from "../common/TopSpacer";

import GoBack from '../common/GoBack';

class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GoBack icon="fontawesome|times" />
        <Text style={styles.text}>Login</Text>
      </View>
    );
  }
}

Login.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#DA7B61',
  },
  text: {
    color: '#fff'
  }
});
