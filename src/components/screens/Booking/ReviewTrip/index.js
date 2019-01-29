import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Keyboard,ListView
    } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import BackButton from '../../../atoms/BackButton';
import styles from './styles';
import ReviewTitle from '../../../molecules/ReviewTitle';
import ReviewListItem from '../../../atoms/Property/ReviewListItem';
import Footer from '../../../atoms/Footer';

class ReviewTrip extends Component {

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

  constructor(){
      super();
      this.onClose = this.onClose.bind(this);
      this.onNext = this.onNext.bind(this);
  }

  onClose() {
      this.props.navigation.goBack();
  }

  onNext() {
      this.props.navigation.navigate('ReviewSendScreen');
  }

  render() {
      const { navigate } = this.props.navigation;

      return (
          <View style={styles.container}>
              <BackButton onPress={this.onClose}/>

              <ReviewTitle
                  text="Review House Rules"
                  pageNumber="STEP 2 OF 4 "
                  optional=""/>

              <ReviewListItem
                  textFirst="No smoking"
                  textLast =""/>

              <ReviewListItem
                  textFirst="Suitabele for pets"
                  textLast =""/>

              <ReviewListItem
                  textFirst="Not Safe or suitable for children(0-12 years)"
                  textLast =""/>

              <ReviewListItem
                  textFirst="Check-In Time"
                  textLast ="2PM - 10PM"/>

              <ReviewListItem
                  textFirst="Check-Out Time"
                  textLast ="12 PM noon"/>

              <Footer style={styles.footer} button={'Agree'} onClick={this.onNext}/>
            </View>
        );
    }
}

export default ReviewTrip;
