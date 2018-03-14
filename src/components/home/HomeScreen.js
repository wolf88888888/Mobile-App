import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HomeScreen</Text>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DA7B61',
  },
  text: {
    color: '#fff'
  }
});
