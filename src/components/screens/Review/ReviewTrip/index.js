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
import ListItem from '../../../molecules/ListItem';

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

              <ListItem
                  textFirst="No smoking"
                  textLast =""/>

              <ListItem
                  textFirst="Suitabele for pets"
                  textLast =""/>

              <ListItem
                  textFirst="Not Safe or suitable for children(0-12 years)"
                  textLast =""/>

              <ListItem
                  textFirst="Check-In Time"
                  textLast ="2PM - 10PM"/>

              <ListItem
                  textFirst="Check-Out Time"
                  textLast ="12 PM noon"/>
              <View style={styles.footer}>
                  <View></View>
                    <TouchableOpacity onPress={this.onNext}>
                        <View style={styles.searchButtonView}>
                            <Text style={styles.searchButtonText}>Agree</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default ReviewTrip;
