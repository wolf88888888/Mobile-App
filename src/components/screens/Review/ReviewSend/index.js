import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Keyboard,ListView,TextInput,FlatList,br
    } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import BackButton from '../../../atoms/BackButton';
import styles from './styles';
import ReviewTitle from '../../../molecules/ReviewTitle';
import CircleItem from '../../../molecules/CircleItem';

class ReviewSend extends Component {

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
      this.props.navigation.navigate('ReviewPayScreen');
  }

  render() {
  const { navigate } = this.props.navigation;

    return (
        <View style={styles.container}>
            <BackButton onPress={this.onClose}/>

            <ReviewTitle
                text="Send your message to your host"
                pageNumber="STEP 3 OF 4 "
                optional="(optional)"
            />

            <CircleItem
                pageNumber="Britney"
                text="Cia,Greece"/>

            <View style={styles.footer}>
                <View></View>
                <TouchableOpacity onPress={this.onNext}>
                    <View style={styles.searchButtonView}>
                        <Text style={styles.searchButtonText}>Next</Text>
                    </View>
                </TouchableOpacity>
           </View>

           <View style={styles.textInput} maxLength = {40}>
               <Text style={styles.textReport}>Tell your host a little about yourself, and why you are coming.</Text>
           </View>
        </View>
    );
}
}

export default ReviewSend;
