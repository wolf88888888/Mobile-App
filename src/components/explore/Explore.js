import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { getTopHomes } from '../../utils/requester';

import SearchBar from './SearchBar';
import SmallPropertyTile from './SmallPropertyTile';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      topHomes: null
    };
  }

  componentDidMount() {
    getTopHomes().then(topHomes => this.setState({ topHomes }));
  }

  renderHomes() {
    return (
      <View style={styles.sectionView}>
        <View style={styles.subtitleView}>
          <Text style={styles.subtitleText}>Popular Homes</Text>
        </View>

        <View style={styles.tilesView}>
          { this.state.topHomes.content.map(listing => <SmallPropertyTile listingsType='homes' listing={listing} key={listing.id} />) }
        </View>
      </View>
    );
  }

  //TODO: a renderHotels method does not exist yet because backend does not yet have an endpoint to request popular hotels

  render() {
    const { search, topHomes } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.searchAreaView}>
          <SearchBar
            autoCorrect={false}
            value={search}
            onChangeText={(search) => this.setState({ search })}
            placeholder='Discover your next experience'
            placeholderTextColor='#bdbdbd'
            leftIcon='search' />
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
        { topHomes ? this.renderHomes() : null }
        </ScrollView>

        <TouchableOpacity onPress={() => {
          AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
          this.props.navigation.navigate('Login');
        }}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Explore.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f1f3'
  },
  searchAreaView: {
    width: '100%',
    height: 105,
    backgroundColor: '#273842',
    paddingTop: 40,
    paddingLeft: 17,
    paddingRight: 17
  },
  sectionView: {
    width: '100%',
    paddingLeft: 17,
    paddingRight: 17,
  },
  subtitleView: {
    width: '100%',
    paddingTop: 18,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderColor: '#d7d8d8'
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: 'FuturaStd-Light'
  },
  tilesView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  text: {
    color: '#000'
  }
});
