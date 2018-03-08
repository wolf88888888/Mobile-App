import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const GoBack = (props) => {
  return (
    <View style={styles.container}>

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
    height: 90
  },
  iconView: {

  }
});
