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
import Footer from '../../../atoms/Footer';

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
        <View style={styles.container}>
          <BackButton onPress={this.onClose}/>

          <View style={styles.topAlert}>
              <Image style={styles.logo} source={require('../../../../assets/accepted.svg')}/>
              <Text style={styles.title}>
                  Request Accepted
              </Text>
              <Text style={styles.description}>
                  This is not confirmed booking-at least, not yet. You will get a response within 24 hours
              </Text>
          </View>

          <ReviewTitle
              style={{marginTop:70, width:'100%', marginLeft:20, marginRight: 20}}
              titleStyle={{fontFamily: 'FuturaStd-Light', fontSize: 18}}
              pageNumber="Entire Appartment.Folrance.ITALY"
              text="Garden Loft Appartment"/>

          <View style={{flexDirection:'row', marginLeft:20, marginRight:20, marginTop:20}}>
              <View style={styles.checkContainer}>
                  <View style={styles.checkInfoView}>
                      <Text style={styles.subTitle}>Check In</Text>
                      <Text style={styles.subInfo}>Thu 25 Jan</Text>
                  </View>
                  <View style={{width:1, marginTop:5, marginBottom:5, backgroundColor:'#ccc'}}/>
                  <View style={styles.checkInfoView}>
                      <Text style={styles.subTitle}>Check Out</Text>
                      <Text style={styles.subInfo}>Sat 27 Jan</Text>
                  </View>
              </View>
              <View style={styles.guestContainer}>
                  <Text style={styles.subTitle}>Guest</Text>
                  <Text style={styles.subInfo}>2</Text>
              </View>
          </View>

          <Text style={styles.msg}>
              You won''t be charged until you are confirming
          </Text>

          <Footer style={styles.footer} button={'View your trips'} fullButton={true} onClick={this.onNext}/>
        </View>
    );
    }
}

export default RequestAccepted;
