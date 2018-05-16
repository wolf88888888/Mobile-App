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
import ReviewTitle from '../../../molecules/ReviewTitle';
import ReviewImageItem from '../../../molecules/ReviewImageItem';
import ReviewListItem from '../../../molecules/Property/ReviewListItem';

import styles from './styles';



class ReviewPay extends Component {
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
    }

    render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={styles.container}  >
          <BackButton onPress={() => this.onClose()}/>

          <ReviewTitle
              text="Review and Pay"
              pageNumber="STEP 4 OF 4 "
              optional=""
          />

          <ReviewImageItem
              pageNumber="ENTIRE APARTMENT IN FLORENCE, ITALY"
              text="Garden Loft Apartment"
              optional="25 Jan - 27 Jan.2 guests"
          />

          <ReviewListItem
            textFirst="$85 * 2 nights"
            textLast ="$180.00"
          />

          <ReviewListItem
            textFirst="Cleaning Fee"
            textLast ="$25.00"
          />

          <ReviewListItem
            textFirst="Total (USD)"
            textLast ="$205.00"
          />

          <Text style={styles.text}>
            I agree to the <Text style={styles.redUnderline}>House Rules</Text> and to the <Text style={styles.redUnderline}>Cancellation Ploicy.</Text>I also agree to pay the total amount shown,which includes Cleaning Fees.
          </Text>

          <View style={styles.footer}>
              <TouchableOpacity>
                  <View style={styles.searchButtonView}>
                      <Text style={styles.searchButtonText}>Confirm & Pay</Text>
                  </View>
              </TouchableOpacity>
         </View>

        </View>
    );
    }
}

export default ReviewPay;
