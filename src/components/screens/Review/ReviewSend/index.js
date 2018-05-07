import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Keyboard,ListView,TextInput
    } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import CloseButton from '../../../atoms/CloseButton';
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

    onClose() {
      this.props.navigation.goBack();
    }

    render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={styles.container}>
          <CloseButton onPress={() => this.onClose()}/>

          <ReviewTitle
              text="Send your message to your host"
              pageNumber="STEP 3 OF 4 "
              optional="{optional}"
          />

          <CircleItem
              pageNumber="Britney"
              text="Cia,Greece"
          />

          <View style={styles.footer}>

              <View></View>
              <TouchableOpacity>
                  <View style={styles.searchButtonView}>
                      <Text style={styles.searchButtonText}>Next</Text>
                  </View>
              </TouchableOpacity>

         </View>

         <TextInput style={styles.textInput} maxLength = {40}>
             Tell your host a little about yourself, and why you are coming

         </TextInput>


        </View>
    );
}
}

export default ReviewSend;
