import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  render() {
    const { search } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.searchArea}>
          <SearchBar
            autoCorrect={false}
            value={search}
            onChangeText={(search) => this.setState({ search })}
            placeholder='Discover your next experience'
            placeholderTextColor='#bdbdbd'
            leftIcon='search' />
        </View>

        <TouchableOpacity onPress={() => this.props.screenProps.onLogOut()}>
          <Text style={styles.text}>HomeScreen</Text>
        </TouchableOpacity>
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
    backgroundColor: '#f0f1f3',
  },
  searchArea: {
    width: '100%',
    height: 105,
    backgroundColor: '#273842',
    paddingTop: 40,
    paddingLeft: 17,
    paddingRight: 17
  },
  text: {
    color: '#000'
  }
});
