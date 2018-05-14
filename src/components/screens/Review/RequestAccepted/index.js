import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Keyboard,ListView
    } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import CloseButton from '../../../atoms/CloseButton';
import ReviewTitle from '../../../molecules/ReviewTitle';
import ReviewImageItem from '../../../molecules/ReviewImageItem';
import ListItem from '../../../molecules/ListItem';

import styles from './styles';



class RequestAccepted extends Component {
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

          <View style={styles.centerItem}>
              <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.titleText}>Request Accepted</Text>
              <Text style={styles.mainText}>This is not confirmed booking-at least, not yet. You will get a response within 24 hours</Text>
          </View>

          <View style={styles.space10}/>

          <ReviewTitle
              pageNumber="Entire Appartment.Folrance.ITALY"
              text="Garden Loft Appartment"
          />

          <View style={styles.block}>
          <TouchableOpacity>
                <View style={styles.firstBlock}>

                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.secondBlock}>
            

                </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.text}>
            You won''t be charged until you are confirming
          </Text>


          <View style={styles.footer}>

              <TouchableOpacity>
                  <View style={styles.searchButtonView}>
                      <Text style={styles.searchButtonText}>View your tips</Text>
                  </View>
              </TouchableOpacity>

         </View>


        </View>
    );
    }
}

export default RequestAccepted;
