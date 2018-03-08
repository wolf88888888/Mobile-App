import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const GoBack = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Text>x</Text>
      </View>
    </View>
  );
};

GoBack.defaultProps = {
  icon: 'arrow-circle-o-left'
};

GoBack.propTypes = {
  icon: PropTypes.string
};

export default GoBack;

const styles = StyleSheet.create({
  container: {
    borderColor: '#000',
    borderWidth: 1,
    width: '100%',
    height: 90,
    position: 'relative'
  },
  iconView: {
    position: 'absolute',
    top: 40,
    left: 18,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#fff',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
