import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import GoBack from '../../atoms/GoBack';
import UserProfileSummary from '../../organisms/UserProfileSummary'
import styles from './styles';

class UserProfile extends Component {

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        }
    }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    // const { locAddress } = this.props.userInfo;
    return (
      <View style={styles.container}>
          <ScrollView showsHorizontalScrollIndicator={false} style={{width: '100%'}}>
              <GoBack
                  onPress={() => goBack()}
                  icon="arrowLeft"
                  color="white"/>
              <UserProfileSummary
                  logo = {require('../../../assets/temple/profile.png')}
                  title = {'Garden Loft Apartment'}
                  rateExp = {"Excellent"}
                  rateVal = {4.1}
                  reviewNum = {73}
                  guests = {4} size = {85} bathroom = {1} bedroom = {1}
                  description = {'In the historic quarter of Santo Spirito, on the left bank of the ricer Arno,studio apartment is perfect for those traveling alone or as a couple.To walk berween Santo Spirito,Pante Vecchio and Babali Gardens is a magical experience.'}
                  space = {'On the third floor of a typical Florentine building, the apartment of an entrance with wardrobes and loft with double bed, the third floor of a typical Florentine building, the apartment of an entrance with wardrobes and loft with double bed, the third floor of a typical Florentine building, the apartment of an entrance with wardrobes and loft with double bed, the third floor of a typical Florentine building, the apartment of an entrance with wardrobes and loft with double bed'} />
          </ScrollView>
      </View>
    );
  }
}

export default UserProfile;
