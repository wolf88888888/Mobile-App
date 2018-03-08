import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import GoBack from '../common/GoBack';

class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GoBack icon="times" />
        <Text style={styles.text}>Welcome</Text>
      </View>
    );
  }
}

Welcome.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default Welcome;

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
