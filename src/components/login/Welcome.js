import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import GoBack from '../common/GoBack';

class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GoBack icon="times" />

        <Text style={styles.text}>Welcome</Text>

        <View style={styles.lowOpacity}>
          <Image
            source={require('../../assets/get-started-white-outline.svg')}
            style={styles.getStartedImage} />
        </View>
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
    justifyContent: 'space-between',
    backgroundColor: '#DA7B61',
  },
  text: {
    color: '#fff'
  },
  lowOpacity: {
    opacity: 0.3
  },
  getStartedImage: {
    width: 400,
    height: 80
  }
});
